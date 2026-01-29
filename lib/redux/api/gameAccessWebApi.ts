import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://buzzycashghana.viaspark.site';

// Types
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  Accesstoken: string;
  Refreshtoken: string;
  Time: string;
}

export interface GameOverWebRequest {
  number: string;
}

export interface GameOverWebResponse {
  [key: string]: any;
}

export interface ConfirmPaymentRequest {
  confirmed: boolean;
  amount: number;
  number: string;
  network: string;
  game_name: string;
  session_id: string;
}

export interface ConfirmPaymentResponse {
  [key: string]: any;
}

export interface CancelGameRequest {
  number: string;
  session_id: string;
}

export interface CancelGameResponse {
  [key: string]: any;
}

// Secure storage utility
const gameAccessSecureStorage = {
  // Session storage for temporary data
  setSession(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(`game_access_${key}`, value);
      } catch (error) {
        console.error('Failed to store in sessionStorage:', error);
      }
    }
  },

  getSession(key: string): string | null {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem(`game_access_${key}`);
      } catch (error) {
        console.error('Failed to get from sessionStorage:', error);
        return null;
      }
    }
    return null;
  },

  removeSession(key: string): void {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(`game_access_${key}`);
      } catch (error) {
        console.error('Failed to remove from sessionStorage:', error);
      }
    }
  },

  // Secure storage with encryption
  setSecure(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      try {
        const encrypted = btoa(encodeURIComponent(value));
        localStorage.setItem(`game_access_enc_${key}`, encrypted);
      } catch (error) {
        console.error('Failed to store securely:', error);
      }
    }
  },

  getSecure(key: string): string | null {
    if (typeof window !== 'undefined') {
      try {
        const encrypted = localStorage.getItem(`game_access_enc_${key}`);
        if (encrypted) {
          return decodeURIComponent(atob(encrypted));
        }
      } catch (error) {
        console.error('Failed to get secure data:', error);
      }
    }
    return null;
  },

  clearAll(): void {
    if (typeof window !== 'undefined') {
      try {
        // Clear session storage
        Object.keys(sessionStorage).forEach(key => {
          if (key.startsWith('game_access_')) {
            sessionStorage.removeItem(key);
          }
        });

        // Clear encrypted storage
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('game_access_enc_')) {
            localStorage.removeItem(key);
          }
        });
      } catch (error) {
        console.error('Failed to clear storage:', error);
      }
    }
  }
};

const auth = {
  isAuthenticated: false,
  accessToken: '',
  refreshToken: '',
  async login() {
    try {
   

      const username = process.env.NEXT_PUBLIC_API_USERNAME ;
      const password = process.env.NEXT_PUBLIC_API_PASSWORD ;

      console.log('Login attempt with username:', 
      username ? 
      `${username[0]}${'*'.repeat(username.length > 1 ? username.length - 1 : 0)}` : 
      'not set'
    );
    
    if (!username || !password) {
      throw new Error('API credentials are not properly configured');
    }
    
      
      const response = await fetch(`${API_BASE_URL}/connect/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
    body: JSON.stringify({ username, password })
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data: LoginResponse = await response.json();
      this.accessToken = data.Accesstoken;
      this.refreshToken = data.Refreshtoken;
      this.isAuthenticated = true;
      
      // Store tokens in secure storage
      gameAccessSecureStorage.setSecure('access_token', data.Accesstoken);
      gameAccessSecureStorage.setSecure('refresh_token', data.Refreshtoken);
      
      return data;
    } catch (error) {
      console.error('Authentication error:', error);
      this.isAuthenticated = false;
      this.accessToken = '';
      this.refreshToken = '';
      throw error;
    }
  },
  async ensureAuthenticated() {
    // Always force a new login to get a fresh token
    try {
      await this.login();
      return true;
    } catch (error) {
      console.error('Failed to authenticate:', error);
      return false;
    }
  },
  getAuthHeader() {
    return this.accessToken ? `Bearer ${this.accessToken}` : '';
  }
};

const baseQuery = async (args: any, api: any, extraOptions: any) => {
  try {
    // Always ensure we have a fresh token before making the request
    await auth.ensureAuthenticated();
    
    const result = await fetch(`${API_BASE_URL}${args.url}`, {
      method: args.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': auth.getAuthHeader()
      },
      body: args.body ? JSON.stringify(args.body) : undefined,
    });

    // Handle non-200 responses
    if (!result.ok) {
      const errorText = await result.text();
      console.error('API Error:', {
        status: result.status,
        statusText: result.statusText,
        url: args.url,
        error: errorText
      });
      
      // If we get a 401 or 500, try to login again and retry once
      if (result.status === 401 || result.status === 500) {
        try {
          // Force a new login
          await auth.login();
          
          // Retry the request with the new token
          const retryResult = await fetch(`${API_BASE_URL}${args.url}`, {
            method: args.method || 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'Authorization': auth.getAuthHeader()
            },
            body: args.body ? JSON.stringify(args.body) : undefined,
          });
          
          if (!retryResult.ok) {
            throw new Error(`Request failed with status ${retryResult.status}`);
          }
          
          const retryData = await retryResult.json();
          return { data: retryData };
          
        } catch (retryError) {
          console.error('Retry failed:', retryError);
          throw new Error('Failed to refresh session');
        }
      }
      
      throw new Error(`Request failed with status ${result.status}`);
    }


    const data = await result.json();
    return { data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      error: {
        status: 'CUSTOM_ERROR',
        error: errorMessage
      }
    };
  }
};

// API slice
const gameAccessWebApi = createApi({
  reducerPath: 'gameAccessWebApi',
  baseQuery,
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/connect/login/',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: LoginResponse) => {
        // Store tokens securely
        if (response.Accesstoken) {
          gameAccessSecureStorage.setSecure('access_token', response.Accesstoken);
          gameAccessSecureStorage.setSecure('refresh_token', response.Refreshtoken);
        }
        return response;
      },
    }),

    // Game Over Web
    gameOverWeb: builder.mutation<any, GameOverWebRequest>({
      query: (data) => ({
        url: '/connect/game_over_web/',
        method: 'POST',
        body: data,
      }),
    }),

    // Confirm Payment
    confirmPayment: builder.mutation<any, ConfirmPaymentRequest>({
      query: (data) => ({
        url: '/connect/confirm_payment/',
        method: 'POST',
        body: data,
      }),
    }),

    // Cancel Game
    cancelGame: builder.mutation<any, CancelGameRequest>({
      query: (params) => ({
        url: '/connect/cancel/game/',
        method: 'POST',
        params: {
          number: params.number,
          session_id: params.session_id,
        },
      }),
    }),

    // Logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/connect/logout/',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch }) {
        // Clear all stored data on logout
        gameAccessSecureStorage.clearAll();
        // Reset API state
        dispatch(gameAccessWebApi.util.resetApiState());
      },
    }),
  }),
});

// Export hooks
export const {
  useLoginMutation,
  useGameOverWebMutation,
  useConfirmPaymentMutation,
  useCancelGameMutation,
  useLogoutMutation,
} = gameAccessWebApi;

// Export the storage utility for direct access if needed
export { gameAccessSecureStorage };

export default gameAccessWebApi;