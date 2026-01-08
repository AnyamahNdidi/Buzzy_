import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameSessionState {
  // We store minimal data in Redux, sensitive data stays in secure storage
  hasActiveSession: boolean;
  gameName: string | null;
  network: string | null;
  lastActivity: number | null;
  
  // UI state only
  isLoading: boolean;
  error: string | null;
}

const initialState: GameSessionState = {
  hasActiveSession: false,
  gameName: null,
  network: null,
  lastActivity: null,
  isLoading: false,
  error: null,
};

export const gameSessionSlice = createSlice({
  name: 'gameSession',
  initialState,
  reducers: {
    // Update session status (called after successful API calls)
    setSessionActive: (state, action: PayloadAction<{ gameName: string; network: string }>) => {
      state.hasActiveSession = true;
      state.gameName = action.payload.gameName;
      state.network = action.payload.network;
      state.lastActivity = Date.now();
      state.error = null;
    },
    
    // Clear session from Redux (sensitive data remains in secure storage)
    clearSession: (state) => {
      state.hasActiveSession = false;
      state.gameName = null;
      state.network = null;
      state.lastActivity = null;
      state.error = null;
    },
    
    // Update activity timestamp
    updateActivity: (state) => {
      state.lastActivity = Date.now();
    },
    
    // Loading and error states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setSessionActive,
  clearSession,
  updateActivity,
  setLoading,
  setError,
  clearError,
} = gameSessionSlice.actions;

export default gameSessionSlice.reducer;

// Selectors
export const selectHasActiveSession = (state: { gameSession: GameSessionState }) => 
  state.gameSession.hasActiveSession;

export const selectGameSessionLoading = (state: { gameSession: GameSessionState }) => 
  state.gameSession.isLoading;