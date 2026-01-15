import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_GHANA_JOLLOF_API_URL;



interface LoginRequest {
  username: string;
  password: string;
}
interface LoginResponse {
  Accesstoken: string;
  Refreshtoken: string;
  Time: string;
}
// ==================== START PLAYING TYPES ====================

export interface StartPlayingRequest {
  game_name: string;       // "WEBJOLLOF"
  phone_number: string;    // "97865665"
  network: string;         // "MTN", "VODAFONE", "AIRTELTIGO"
}

export interface StartPlayingResponse {
  data: {
    game_name: string;          // "GHANA_JELLOF"
    number: string;             // "HISFKVRFR" (game number/ticket)
    network: string;            // "MTN"
    secrete_ingredient: string; // "Rosemary"
    session: string;            // "55365372558" (SESSION ID - MOST IMPORTANT!)
  };
}

// ==================== START MISSION TYPES ====================

export interface StartMissionRequest {
  mission: boolean;        // true
  number: string;          // From start_playing response: "HISFKVRFR"
  network: string;         // From start_playing response: "MTN"
  game_name: string;       // From start_playing response: "GHANA_JELLOF"
  session_id: string;      // From start_playing response: "55365372558" (SESSION)
}

export interface StartMissionResponse {
  // Add the actual response structure when you have it
  success: boolean;
  mission_id?: string;
  session_id: string;
  status: string;
  message?: string;
}

// ==================== JOLLOF AMOUNT WEB TYPES ====================

export interface JollofAmountWebRequest {
  amount: number;                  // Payment amount
  number: string;                  // User's phone number
  user_ingredient_selection: string; // The selected ingredient
  network: string;                 // Network provider (e.g., "MTN")
  game_name: string;               // Game name (e.g., "GHANA_JOLLOF")
  session_id: string;              // Session ID from start_playing
  currency?: string;               // Optional currency (e.g., "GHS")
}

export interface JollofAmountWebResponse {
  number: string;
  amount: number;
  Winning_message: string;
  game_name: string;
  network: string;
  session: string;
  // Optional fields if they exist in some responses
  success?: boolean;
  total_amount?: number;
  fees?: {
    service_fee?: number;
    tax?: number;
  };
  transaction_id?: string;
}

// ==================== JOLLOF PAYMENT WEB TYPES ====================

export interface JollofPaymentRequest {
  confirmed: boolean;      // Always true for confirmation
  amount: number;          // Amount from jollof_amount_web
  number: string;          // User's phone number
  network: string;         // Network provider (e.g., "MTN")
  game_name: string;       // Game name (e.g., "WEBJOLLOF")
  endpoint_url: string;    // Callback URL for payment confirmation
  session_id: string;      // Session ID from start_playing
}

export interface JollofPaymentResponse {
  // Add the actual response structure when you have it
  success: boolean;
  payment_id: string;
  status: string;
  session_id: string;
  amount: number;
  timestamp: string;
}



// Helper function to get required headers
function getHeaders(newSession: boolean = false): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

  // Only include session ID if it's not a new session
  if (!newSession) {
    const sessionId = secureStorage.getSession('session_id');
    if (sessionId) {
      headers['X-Session-ID'] = sessionId;
    }
  }

  return headers;
};

// Secure storage utility (better than localStorage)
const secureStorage = {
  // Store in sessionStorage (cleared when browser closes)
  setSession(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      try {
        // Use sessionStorage for temporary storage
        sessionStorage.setItem(`ghana_jollof_${key}`, value);
      } catch (error) {
        console.error('Failed to store in sessionStorage:', error);
      }
    }
  },

  // Get from sessionStorage
  getSession(key: string): string | null {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem(`ghana_jollof_${key}`);
      } catch (error) {
        console.error('Failed to get from sessionStorage:', error);
        return null;
      }
    }
    return null;
  },

  // Remove from sessionStorage
  removeSession(key: string): void {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(`ghana_jollof_${key}`);
      } catch (error) {
        console.error('Failed to remove from sessionStorage:', error);
      }
    }
  },

  // Store sensitive data (encrypted in localStorage as fallback)
  setSecure(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      try {
        // Simple encryption (base64) - for production, use proper encryption
        const encrypted = btoa(value);
        localStorage.setItem(`ghana_jollof_enc_${key}`, encrypted);
      } catch (error) {
        console.error('Failed to store securely:', error);
      }
    }
  },

  // Get and decrypt sensitive data
  getSecure(key: string): string | null {
    if (typeof window !== 'undefined') {
      try {
        const encrypted = localStorage.getItem(`ghana_jollof_enc_${key}`);
        if (encrypted) {
          return atob(encrypted); // Decrypt
        }
      } catch (error) {
        console.error('Failed to get secure data:', error);
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
          if (key.startsWith('ghana_jollof_')) {
            sessionStorage.removeItem(key);
          }
        });

        // Clear encrypted localStorage items
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('ghana_jollof_enc_')) {
            localStorage.removeItem(key);
          }
        });
      } catch (error) {
        console.error('Failed to clear storage:', error);
      }
    }
  },
};

// Base query configuration
// const baseQuery = fetchBaseQuery({
//   baseUrl: API_BASE_URL,
//   prepareHeaders: (headers, { getState, endpoint }) => {
//     // Always include these basic headers
//     headers.set('Content-Type', 'application/json');
//     headers.set('X-Requested-With', 'XMLHttpRequest');
    
//     // For startPlaying endpoint, we don't want to include X-Session-ID
//     if (endpoint === 'startPlaying') {
//       return headers;
//     }
    
//     // For all other endpoints, include X-Session-ID
//     const sessionId = secureStorage.getSession('session_id');
//     if (sessionId) {
//       // Convert to string and trim any whitespace
//       const cleanSessionId = String(sessionId).trim();
//       if (cleanSessionId) {
//         headers.set('X-Session-ID', cleanSessionId);
//       }
//     }
    
//     return headers;
//   },
// });





const auth = {
  isAuthenticated: false,
  accessToken: '',
  refreshToken: '',
  async login() {
    try {
      const username = 'edwin';
    const password = 'cYyM$8272qMX)Ek';

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

// Create the Ghana Jollof Game API slice
export const ghanaJollofGameApi = createApi({
  reducerPath: 'ghanaJollofGameApi',
  baseQuery: baseQuery,
  tagTypes: ['GameSession', 'Mission', 'Payment', 'Transaction'],

  
  endpoints: (builder) => ({

     login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/connect/login/',
        method: 'POST',
        body: credentials
      })
    }),
    // ==================== START PLAYING ====================
    /**
     * Start Playing - Initialize a new game session
     * POST /connect/start_playing/
     * Request: {
     *   "game_name": "ghana_jellof",
     *   "phone_number": "97865665",
     *   "network": "MTN"
     * }
     */
    startPlaying: builder.mutation<StartPlayingResponse, StartPlayingRequest>({
      query: (gameData) => ({
        url: '/connect/start_playing/',
        method: 'POST',
        body: gameData,
      }),
      transformResponse: (response: StartPlayingResponse) => {
        // SECURE STORAGE - Save session data securely
        if (typeof window !== 'undefined' && response.data) {
          // Store in sessionStorage (cleared on browser close)
          secureStorage.setSession('session_id', response.data.session);
          secureStorage.setSession('game_number', response.data.number);
          secureStorage.setSession('game_network', response.data.network);
          secureStorage.setSession('game_name', response.data.game_name);
          secureStorage.setSession('secret_ingredient', response.data.secrete_ingredient);
          
          // Also store encrypted version in localStorage as backup
          secureStorage.setSecure('session_backup', response.data.session);
          
          // Store all data together for easy retrieval
          const gameSession = {
            session_id: response.data.session,
            number: response.data.number,
            network: response.data.network,
            game_name: response.data.game_name,
            secret_ingredient: response.data.secrete_ingredient,
            timestamp: Date.now(),
          };
          
          secureStorage.setSecure('full_session', JSON.stringify(gameSession));
        }
        
        return response;
      },
      invalidatesTags: ['GameSession'],
    }),

    // ==================== START MISSION ====================
    /**
     * Start Mission - Begin a mission within a game session
     * POST /connect/start_mission/
     * Request: {
     *   "mission": true,
     *   "number": "HISFKVRFR",        // from start_playing response
     *   "network": "MTN",             // from start_playing response
     *   "game_name": "GHANA_JELLOF",  // from start_playing response
     *   "session_id": "55365372558"   // from start_playing response
     * }
     */
    startMission: builder.mutation<StartMissionResponse, StartMissionRequest>({
  query: (missionData) => ({
    url: '/connect/start_mission/',
    method: 'POST',
    body: missionData,
  }),
  transformResponse: (response: any) => {
    if (typeof window !== 'undefined') {
      // Store mission data
      if (response.mission_id) {
        secureStorage.setSession('mission_id', response.mission_id);
      }
      
      // Store ingredient options for the next step
      if (response.ingredient) {
        // Convert the ingredient object to an array of options
        const ingredientOptions = Object.entries(response.ingredient)
          .filter(([key]) => !isNaN(Number(key))) // Only get numeric keys (1, 2, 3)
          .map(([key, value]) => ({
            value: Number(key),
            text: value as string
          }));
        
        // Store in secure storage
        secureStorage.setSession('ingredient_options', JSON.stringify(ingredientOptions));
      }
      
      // Store other response data that might be needed for jollofAmountWeb
      secureStorage.setSession('current_number', response.number);
      secureStorage.setSession('current_game_name', response.game_name);
      secureStorage.setSession('current_network', response.network);
      secureStorage.setSession('current_session_id', response.session);
    }
    return response;
  },
  invalidatesTags: ['Mission', 'GameSession'],
}),

    // ==================== JOLLOF AMOUNT WEB ====================
    /**
     * Jollof Amount Web - Calculate amount with fees
     * POST /connect/jollof_amount_web/
     * Request will need session_id, number, game_name from start_playing
     */
    jollofAmountWeb: builder.mutation<JollofAmountWebResponse, JollofAmountWebRequest>({
      query: (amountData) => ({
        url: '/connect/jollof_amount_web/',
        method: 'POST',
        body: amountData,
      }),
      transformResponse: (response: JollofAmountWebResponse) => {
        if (typeof window !== 'undefined') {
          // Store all response data in secure storage
          secureStorage.setSession('current_number', response.number);
          secureStorage.setSession('current_game_name', response.game_name);
          secureStorage.setSession('current_network', response.network);
          secureStorage.setSession('current_session', response.session);
          
          // Store the winning message for display
          if (response.Winning_message) {
            secureStorage.setSession('winning_message', response.Winning_message);
          }
          
          // Store amount and transaction ID
          if (response.amount) {
            secureStorage.setSession('current_amount', response.amount.toString());
          }
          if (response.transaction_id) {
            secureStorage.setSession('pending_transaction_id', response.transaction_id);
          }
        }
        return response;
      },
      invalidatesTags: ['Transaction'],
    }),

    // ==================== JOLLOF PAYMENT WEB ====================
    /**
     * Jollof Payment Web - Process payment
     * POST /connect/jollof_payment/
     * Request will need session_id, number, game_name, and transaction_id from jollof_amount_web
     */
    jollofPayment: builder.mutation<JollofPaymentResponse, JollofPaymentRequest>({
      query: (paymentData) => ({
        url: '/connect/jollof_payment/',
        method: 'POST',
        body: paymentData,
        
      }),
      transformResponse: (response: JollofPaymentResponse) => {
        // Clear pending transaction
        if (typeof window !== 'undefined') {
          secureStorage.removeSession('pending_transaction_id');
          
          // Store payment history (encrypted)
          const paymentHistory = JSON.parse(
            secureStorage.getSecure('payment_history') || '[]'
          );
          
          paymentHistory.unshift({
            payment_id: response.payment_id,
            amount: response.amount,
            status: response.status,
            timestamp: response.timestamp,
          });
          
          // Keep only last 20 payments
          if (paymentHistory.length > 20) {
            paymentHistory.pop();
          }
          
          secureStorage.setSecure('payment_history', JSON.stringify(paymentHistory));
        }
        return response;
      },
      invalidatesTags: ['Payment', 'Transaction'],
    }),

    // ==================== UTILITY QUERIES ====================
    
    /**
     * Get Current Game Session - Retrieve stored session data
     */
    getCurrentGameSession: builder.query<{
      session_id: string | null;
      number: string | null;
      network: string | null;
      game_name: string | null;
      secret_ingredient: string | null;
    }, void>({
      queryFn: () => {
        // This doesn't call an API endpoint, just retrieves from storage
        const sessionData = {
          session_id: secureStorage.getSession('session_id'),
          number: secureStorage.getSession('game_number'),
          network: secureStorage.getSession('game_network'),
          game_name: secureStorage.getSession('game_name'),
          secret_ingredient: secureStorage.getSession('secret_ingredient'),
        };
        
        return { data: sessionData };
      },
      providesTags: ['GameSession'],
    }),

    /**
     * Clear Game Session - Logout/clear all session data
     */
    clearGameSession: builder.mutation<void, void>({
      queryFn: () => {
        secureStorage.clearAll();
        return { data: undefined };
      },
      invalidatesTags: ['GameSession', 'Mission', 'Payment', 'Transaction'],
    }),

    /**
     * API Health Check
     */
    healthCheck: builder.query<{ 
      status: string; 
      timestamp: string; 
      version: string;
      uptime: number;
    }, void>({
      query: () => '/connect/health',
      // No tags for health check
    }),
  }),
});

// Export hooks for usage in components
export const {
  // Mutations (POST requests)
  useLoginMutation ,
  useStartPlayingMutation,
  useStartMissionMutation,
  useJollofAmountWebMutation,
  useJollofPaymentMutation,
  useClearGameSessionMutation,
  
  // Queries (GET requests)
  useGetCurrentGameSessionQuery,
  useHealthCheckQuery,
  useLazyHealthCheckQuery,
} = ghanaJollofGameApi;

export { auth };

export async function initializeAuth() {
  try {
    const isAuthenticated = await auth.ensureAuthenticated();
    console.log('Authentication initialized', { isAuthenticated });
    return isAuthenticated;
  } catch (error) {
    console.error('Failed to initialize authentication:', error);
    return false;
  }
}

initializeAuth().catch(console.error);

// Utility function to build mission request from session data
export const buildMissionRequest = (
  sessionData: StartPlayingResponse['data'],
  mission: boolean = true
): StartMissionRequest => {
  return {
    mission,
    number: sessionData.number,
    network: sessionData.network,
    game_name: sessionData.game_name,
    session_id: sessionData.session,
  };
};

// Utility function to check if we have an active session
export const hasActiveSession = (): boolean => {
  return secureStorage.getSession('session_id') !== null;
};

// Export the secure storage for manual use if needed
export { secureStorage };