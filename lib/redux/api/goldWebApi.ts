import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://buzzycashghana.viaspark.site';

// ==================== TYPES ====================

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  Accesstoken: string;
  Refreshtoken: string;
  Time: string;
}

export interface StartGoldRequest {
  game_name: string;       // "GOLD"
  phone_number: string;    // User's phone number
  network: string;         // "MTN", "VODAFONE", "AIRTELTIGO"
}

export interface StartGoldResponse {
  data: {
    game_name: string;      // "GOLDWEB"
    number: string;         // "233506216821"
    network: string;        // "MTN"
    site: {                // Changed from locations to site
      [key: string]: string; // e.g., "1": "Sunyani Golden Gate"
    };
    site_message: string;   // "Select a dig site to uncover wealth."
    session: string;        // Session ID
  };
}
export interface SubmitMultiplierRequest {
  multiplier: string;          // e.g., "Quick mining"
  gold_site_picked: string;    // Selected gold site name
  number: string;              // Phone number
  network: string;             // Network provider
  session_id: string;          // Session ID
}
export interface SubmitMultiplierResponse {
  number: string;
  game_name: string;
  network: string;
  session: string;
}

export interface SubmitGoldPaymentRequest {
  amount: number;          // Payment amount
  number: string;          // User's phone number
  network: string;         // Network provider
  game_name: string;       // "GOLD"
  session_id: string;      // Session ID
}

export interface SubmitGoldPaymentResponse {
  number: string;
  amount: number;
  Winning_message: string;
  game_name: string;
  network: string;
  session: string;
}

// Secure storage utility for Gold game
const goldSecureStorage = {
  setSession(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      try {
        const prefixedKey = key.startsWith('gold_') ? key : `gold_${key}`;
        sessionStorage.setItem(prefixedKey, value);
      } catch (error) {
        console.error('Failed to store in sessionStorage:', error);
      }
    }
  },

  getSession(key: string): string | null {
    if (typeof window !== 'undefined') {
      try {
        const prefixedKey = key.startsWith('gold_') ? key : `gold_${key}`;
        return sessionStorage.getItem(prefixedKey);
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
        const prefixedKey = key.startsWith('gold_') ? key : `gold_${key}`;
        sessionStorage.removeItem(prefixedKey);
      } catch (error) {
        console.error('Failed to remove from sessionStorage:', error);
      }
    }
  },

   setSecure(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      try {
        const encrypted = btoa(value);
        const prefixedKey = `gold_${key}`;
        localStorage.setItem(prefixedKey, encrypted);
      } catch (error) {
        console.error('Failed to store securely:', error);
      }
    }
  },

   // Get and decrypt sensitive data
  getSecure(key: string): string | null {
    if (typeof window !== 'undefined') {
      try {
        const encrypted = localStorage.getItem(`gold_${key}`);
        if (encrypted) {
          return atob(encrypted); // Decrypt
        }
      } catch (error) {
        console.error('Failed to get secure data:', error);
      }
    }
    return null;
  },

};

// Authentication handler (similar to trotroApi.ts)
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
      goldSecureStorage.setSecure('access_token', data.Accesstoken);
      goldSecureStorage.setSecure('refresh_token', data.Refreshtoken);
      
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

export const goldWebApi = createApi({
  reducerPath: 'goldWebApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({

     login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/connect/login/',
        method: 'POST',
        body: credentials
      }),
  
    }),

    
    // Start Gold Game
    startPlaying: builder.mutation<StartGoldResponse, StartGoldRequest>({
  query: (data) => ({
    url: '/connect/gold/web/start/',
    method: 'POST',
    body: data,
  }),
  transformResponse: (response: StartGoldResponse) => {
    // SECURE STORAGE - Save session data securely
    if (typeof window !== 'undefined' && response.data) {
      // Store individual fields in sessionStorage
      goldSecureStorage.setSession('gold_session_id', response.data.session);
      goldSecureStorage.setSession('gold_number', response.data.number);
      goldSecureStorage.setSession('gold_network', response.data.network);
      goldSecureStorage.setSession('gold_game_name', response.data.game_name);
      goldSecureStorage.setSession('gold_site_message', response.data.site_message);
      
      // Store sites as a stringified array of {id, name} for easier use in UI
      const sites = Object.entries(response.data.site || {}).map(([id, name]) => ({
        id,
        name
      }));
      goldSecureStorage.setSession('gold_sites', JSON.stringify(sites));
      
      // Also store encrypted version in localStorage as backup
      goldSecureStorage.setSecure('gold_session_backup', response.data.session);
      
      // Store all data together for easy retrieval
      const gameSession = {
        session_id: response.data.session,
        number: response.data.number,
        network: response.data.network,
        game_name: response.data.game_name,
        site_message: response.data.site_message,
        sites: response.data.site,
        timestamp: Date.now(),
      };
      
      goldSecureStorage.setSecure('gold_full_session', JSON.stringify(gameSession));
    }
    
    return response;
  },
}),

    // Submit Multiplier
   submitMultiplier: builder.mutation<SubmitMultiplierResponse, SubmitMultiplierRequest>({
  query: (data) => ({
    url: '/connect/gold/web/multiplier/',
    method: 'POST',
    body: {
      mission: true,
      multiplier: data.multiplier,
      gold_site_picked: data.gold_site_picked,
      number: data.number,
      network: data.network,
      game_name: 'GOLDWEB', // Ensure consistent game name
      session_id: data.session_id
    },
  }),
  transformResponse: (response: SubmitMultiplierResponse) => {
    if (typeof window !== 'undefined' && response) {
      // Update session data with the latest values
      goldSecureStorage.setSession('gold_number', response.number);
      goldSecureStorage.setSession('gold_network', response.network);
      goldSecureStorage.setSession('gold_game_name', response.game_name);
      goldSecureStorage.setSession('gold_session_id', response.session);
      
      // Update the full session in secure storage
      const fullSession = {
        ...JSON.parse(goldSecureStorage.getSecure('gold_full_session') || '{}'),
        number: response.number,
        network: response.network,
        game_name: response.game_name,
        session_id: response.session,
        last_updated: Date.now()
      };
      
      goldSecureStorage.setSecure('gold_full_session', JSON.stringify(fullSession));
    }
    return response;
  },
  async onQueryStarted(_, { queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      console.log('Multiplier submitted successfully:', data);
    } catch (error) {
      console.error('Error in submitMultiplier:', error);
    }
  }
}),

    // Submit Payment
    submitGoldPayment: builder.mutation<SubmitGoldPaymentResponse, SubmitGoldPaymentRequest>({
  query: (data) => ({
    url: '/connect/gold/web/payment/',
    method: 'POST',
    body:data
  }),
  transformResponse: (response: SubmitGoldPaymentResponse) => {
    if (typeof window !== 'undefined' && response) {
      // Store the winning message
      if (response.Winning_message) {
        goldSecureStorage.setSession('gold_winning_message', response.Winning_message);
      }
      
      // Update session data
      goldSecureStorage.setSession('gold_number', response.number);
      goldSecureStorage.setSession('gold_network', response.network);
      goldSecureStorage.setSession('gold_game_name', response.game_name);
      goldSecureStorage.setSession('gold_session_id', response.session);
      goldSecureStorage.setSecure('gold_amount', response.amount.toString());
      
      // Update the full session in secure storage
      const fullSession = {
        ...JSON.parse(goldSecureStorage.getSecure('gold_full_session') || '{}'),
        number: response.number,
        network: response.network,
        game_name: response.game_name,
        session_id: response.session,
        last_updated: Date.now(),
        amount: response.amount,
        winning_message: response.Winning_message
      };
      
      goldSecureStorage.setSecure('gold_full_session', JSON.stringify(fullSession));
    }
    return response;
  },
  async onQueryStarted(_, { queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      console.log('Payment submitted successfully:', data);
    } catch (error) {
      console.error('Error in submitGoldPayment:', error);
    }
  }
}),
  }),
});

export const { 
  useStartPlayingMutation, 
  useSubmitMultiplierMutation, 
  useSubmitGoldPaymentMutation 
} = goldWebApi;

// Export the secure storage for use in components
export { goldSecureStorage };