import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_GHANA_JOLLOF_API_URL || 'https://buzzycashghana.viaspark.site';

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
  session_id: string;      // From start_playing response
  number: string;          // From start_playing response
  game_name: string;       // From start_playing response
  amount: number;          // Payment amount
  currency?: string;       // "GHS"
}

export interface JollofAmountWebResponse {
  // Add the actual response structure when you have it
  success: boolean;
  amount: number;
  total_amount: number;
  fees: {
    service_fee: number;
    tax: number;
  };
  transaction_id: string;
  session_id: string;
}

// ==================== JOLLOF PAYMENT WEB TYPES ====================

export interface JollofPaymentRequest {
  session_id: string;      // From start_playing response
  number: string;          // From start_playing response
  game_name: string;       // From start_playing response
  amount: number;          // Amount from jollof_amount_web
  transaction_id: string;  // From jollof_amount_web response
  payment_method: string;  // "mobile_money", "card"
  // Add other payment-specific fields
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
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const headerObj = getHeaders(endpoint !== 'startPlaying');
    Object.entries(headerObj).forEach(([key, value]) => {
      headers.set(key, value);
    });
    
    // For mission endpoints, we might need session_id from storage
    if (endpoint === 'startMission' || endpoint === 'jollofAmountWeb' || endpoint === 'jollofPayment') {
      const sessionId = secureStorage.getSession('session_id');
      if (sessionId) {
        headers.set('X-Session-ID', sessionId);
      }
    }
    
    return headers;
  },
});

// Create the Ghana Jollof Game API slice
export const ghanaJollofGameApi = createApi({
  reducerPath: 'ghanaJollofGameApi',
  baseQuery: baseQuery,
  tagTypes: ['GameSession', 'Mission', 'Payment', 'Transaction'],
  endpoints: (builder) => ({
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
      transformResponse: (response: StartMissionResponse) => {
        // Store mission data if needed
        if (typeof window !== 'undefined' && response.mission_id) {
          secureStorage.setSession('mission_id', response.mission_id);
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
        // Store transaction ID for reference in next step
        if (typeof window !== 'undefined' && response.transaction_id) {
          secureStorage.setSession('pending_transaction_id', response.transaction_id);
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