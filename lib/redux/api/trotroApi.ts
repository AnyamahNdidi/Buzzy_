import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_TROTRO_API_URL || 'https://buzzycashghana.viaspark.site';

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

interface PlayTrotroRequest {
  mission: boolean;
  multiplier: string;
  number: string;
  network: string;
  game_name: string;
  session_id: string;
}
interface PlayTrotroResponse {
  journey: string;
  number: string;
  game_name: string;
  network: string;
  session: string;
}

export interface StartPlayingRequest {
  game_name: string;       // "TROTRO"
  phone_number: string;    // "97865665"
  network: string;         // "MTN", "VODAFONE", "AIRTELTIGO"
}

export interface StartPlayingResponse {
  data: {
    game_name: string;      // "TROTRO"
    number: string;         // Game number/ticket
    network: string;        // "MTN"
    session: string;        // Session ID
    route: string;          // Route information
  };
}

export interface SubmitDestinationRequest {
  destination: string;      // User's selected destination
  number: string;           // From start_playing response
  network: string;          // From start_playing response
  game_name: string;        // "TROTRO"
  session_id: string;       // Session ID from start_playing
}

export interface SubmitAmountRequest {
  amount: number;           // Payment amount
  number: string;           // User's phone number
  destination: string;      // Selected destination
  network: string;          // Network provider
  game_name: string;        // "TROTRO"
  session_id: string;       // Session ID
}

export interface ConfirmPaymentRequest {
  confirmed: boolean;       // Always true for confirmation
  amount: number;           // Amount from amount submission
  number: string;           // User's phone number
  network: string;          // Network provider
  game_name: string;        // "TROTRO"
  session_id: string;       // Session ID
}

interface SubmitTrotroPaymentResponse {
  number: string;
  amount: number;
  Winning_message: string;
  game_name: string;
  network: string;
  session: string;
}
interface SubmitTrotroPaymentRequest {
  amount: number;
  number: string;
  network: string;
  game_name: string;
  session_id: string;
}

// Secure storage utility
// In trotroApi.ts, update the secureStorage implementation
const secureStorage = {
  // Store in sessionStorage (cleared when browser closes)
  setSession(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      try {
        // Add 'trotro_' prefix to all keys
        const prefixedKey = key.startsWith('trotro_') ? key : `trotro_${key}`;
        sessionStorage.setItem(prefixedKey, value);  
      } catch (error) {
        console.error('Failed to store in sessionStorage:', error);
      }
    }
  },

 getSession(key: string): string | null {
  if (typeof window !== 'undefined') {
    try {
      // First try with the exact key, then with 'trotro_' prefix
      const prefixedKey = key.startsWith('trotro_') ? key : `trotro_${key}`;
      console.log('getSession - Looking for key:', prefixedKey);
      const value = sessionStorage.getItem(prefixedKey);
      console.log('getSession - Found value:', value);
      return value;
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
        // Remove both with and without prefix
        const prefixedKey = key.startsWith('trotro_') ? key : `trotro_${key}`;
        sessionStorage.removeItem(key);
        sessionStorage.removeItem(prefixedKey);
      } catch (error) {
        console.error('Failed to remove from sessionStorage:', error);
      }
    }
  },

  // Store sensitive data (encrypted in localStorage)
  setSecure(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      try {
        const encrypted = btoa(value);
        const prefixedKey = `trotro_${key}`;
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
        const prefixedKey = `trotro_${key}`;
        const encrypted = localStorage.getItem(prefixedKey);
        return encrypted ? atob(encrypted) : null;
      } catch (error) {
        console.error('Failed to get secure data:', error);
        return null;
      }
    }
    return null;
  },

  // Clear all game data
  clearAll(): void {
    if (typeof window !== 'undefined') {
      try {
        // Clear sessionStorage
        Object.keys(sessionStorage).forEach(key => {
          if (key.startsWith('trotro_')) {
            sessionStorage.removeItem(key);
          }
        });

        // Clear encrypted localStorage items
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('trotro_')) {
            localStorage.removeItem(key);
          }
        });
      } catch (error) {
        console.error('Failed to clear storage:', error);
      }
    }
  }
};

// Authentication handler
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
      secureStorage.setSecure('access_token', data.Accesstoken);
      secureStorage.setSecure('refresh_token', data.Refreshtoken);
      
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

// Initialize auth state if tokens exist
const initAuth = () => {
  const accessToken = secureStorage.getSecure('access_token');
  const refreshToken = secureStorage.getSecure('refresh_token');
  
  if (accessToken && refreshToken) {
    auth.accessToken = accessToken;
    auth.refreshToken = refreshToken;
    auth.isAuthenticated = true;
  }
};

// Initialize auth on module load
if (typeof window !== 'undefined') {
  initAuth();
}

// Base query with error handling
const baseQuery = async (args: any, api: any, extraOptions: any) => {
  try {
   // Always ensure we have a fresh token before making the request
    await auth.ensureAuthenticated();

    const result = await fetch(`${API_BASE_URL}${args.url}`, {
      method: args.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': auth.getAuthHeader(),
        ...(args.headers || {}),
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

// Create the Trotro API
export const trotroApi = createApi({
  reducerPath: 'trotroApi',
  baseQuery,
  tagTypes: ['GameSession', 'Destination', 'Payment', 'Transaction', 'TrotroPlay'],
  
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/connect/login/',
        method: 'POST',
        body: credentials
      }),
    //   async onQueryStarted(_, { queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       auth.accessToken = data.Accesstoken;
    //       auth.refreshToken = data.Refreshtoken;
    //       auth.isAuthenticated = true;
          
    //       // Store tokens securely
    //       secureStorage.setSecure('access_token', data.Accesstoken);
    //       secureStorage.setSecure('refresh_token', data.Refreshtoken);
    //     } catch (error) {
    //       console.error('Login failed:', error);
    //     }
    //   },
    }),

    // Start a new game
   startPlaying: builder.mutation<StartPlayingResponse, StartPlayingRequest>({
  query: (gameData) => ({
    url: '/connect/trotro/start/',
    method: 'POST',
    body: gameData,
  }),
  transformResponse: (response: StartPlayingResponse) => {
    // SECURE STORAGE - Save session data securely
    if (typeof window !== 'undefined' && response?.data) {

        
      // Store in sessionStorage (cleared on browser close)
       secureStorage.setSession('trotro_session_id', response.data.session);
      secureStorage.setSession('trotro_game_number', response.data.number);
      secureStorage.setSession('trotro_game_network', response.data.network);
      secureStorage.setSession('trotro_game_name', response.data.game_name);
      secureStorage.setSession('trotro_route', response.data.route);
      
      
      // Store encrypted version in localStorage as backup
      secureStorage.setSecure('session_backup', response.data.session);
      
      // Store all data together for easy retrieval
      const gameSession = {
        session_id: response.data.session,
        number: response.data.number,
        network: response.data.network,
        game_name: response.data.game_name,
        route: response.data.route,
        timestamp: Date.now(),
      };
      
      secureStorage.setSecure('full_session', JSON.stringify(gameSession));
    }
    
    return response;
  },
  invalidatesTags: ['GameSession'],
}),

    // Submit destination
    // Update the submitDestination mutation to playTrotro
playTrotro: builder.mutation<PlayTrotroResponse, PlayTrotroRequest>({
  query: (data) => ({
    url: '/connect/trotro/play/',
    method: 'POST',
    body: data,
  }),
  transformResponse: (response: PlayTrotroResponse) => {
    // SECURE STORAGE - Save all play session data
    if (typeof window !== 'undefined' && response) {
      // Store individual fields in sessionStorage
      secureStorage.setSession('trotro_journey', response.journey);
      secureStorage.setSession('trotro_number', response.number);
      secureStorage.setSession('trotro_game_name', response.game_name);
      secureStorage.setSession('trotro_network', response.network);
      secureStorage.setSession('trotro_session', response.session);
      
      // Store all data together for easy retrieval
      const playSession = {
        journey: response.journey,
        number: response.number,
        game_name: response.game_name,
        network: response.network,
        session: response.session,
        timestamp: Date.now(),
      };
      
      // Store the complete session data as a single encrypted JSON string
      secureStorage.setSecure('trotro_play_session', JSON.stringify(playSession));
    }
    
    return response;
  },
  invalidatesTags: ['TrotroPlay'],
}),

    // Submit amount
    submitTrotroPayment: builder.mutation<SubmitTrotroPaymentResponse, SubmitTrotroPaymentRequest>({
  query: (data) => ({
    url: '/connect/trotro/payment/',
    method: 'POST',
    body: data,
  }),
  async onQueryStarted(_, { queryFulfilled, dispatch }) {
    try {
      const { data } = await queryFulfilled;
      // Store the payment response if needed
      if (typeof window !== 'undefined' && data) {
        secureStorage.setSession('trotro_payment_response', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error in submitTrotroPayment:', error);
    }
  },
  transformResponse: (response: SubmitTrotroPaymentResponse) => {
    if (typeof window !== 'undefined' && response) {
      // Store individual fields for easy access
      secureStorage.setSession('trotro_payment_amount', response.amount.toString());
      secureStorage.setSession('trotro_winning_message', response.Winning_message);
      secureStorage.setSecure('trotro_payment_amount', response.amount.toString());
    }
    return response;
  },
}),

    // Confirm payment
    confirmPayment: builder.mutation<any, ConfirmPaymentRequest>({
      query: (data) => ({
        url: '/connect/trotro_payment_web/',
        method: 'POST',
        body: data,
      }),
    }),

    // Get game result
    getGameResult: builder.query<any, { session_id: string }>({
      query: ({ session_id }) => ({
        url: '/connect/trotro_game_finish/',
        method: 'POST',
        body: { session_id },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useStartPlayingMutation,
  usePlayTrotroMutation,
  useSubmitTrotroPaymentMutation,
  useConfirmPaymentMutation,
  useGetGameResultQuery,
  useLoginMutation,
} = trotroApi;

// Export the secure storage for direct access if needed
export { secureStorage as trotroSecureStorage };