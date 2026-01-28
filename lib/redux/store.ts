import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    } from 'redux-persist';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { gameSessionSlice } from '../redux/slices/gameSessionSlice'
import { ghanaJollofGameApi } from '../redux/api/ghanaJollofApi'
import { trotroApi } from '../redux/api/trotroApi'
import {goldWebApi} from '../redux/api/goldWebApi'


const createNoopStorage = () => ({
    getItem() {
        return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
        return Promise.resolve(value);
    },
    removeItem() {
        return Promise.resolve();
    },
    });

    const storage = typeof window !== 'undefined' 
        ? createWebStorage('local')
        : createNoopStorage();

    const persistConfig = {
        key: 'ghana_jollof_root',
        version: 1,
        storage,
        whitelist: ['auth', 'sessions'],
    };

    // Test reducer
    const testReducer = (state = { isReduxWorking: false }, action: any) => {
      switch (action.type) {
        case 'TEST_ACTION':
          return { ...state, isReduxWorking: true };
        default:
          return state;
      }
    };

    const rootReducer = combineReducers({
      test: testReducer,
      gameSession: gameSessionSlice.reducer,
      [ghanaJollofGameApi.reducerPath]: ghanaJollofGameApi.reducer,
      [trotroApi.reducerPath]: trotroApi.reducer,
      [goldWebApi.reducerPath] : goldWebApi.reducer
    });

const persistedReducer = persistReducer(persistConfig, rootReducer);

    
 export const makeStore = () => {
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(
            ghanaJollofGameApi.middleware,
            trotroApi.middleware,
            goldWebApi.middleware
        ),
    });
  
    setupListeners(store.dispatch);
  
    return store;
  };
  
  export const store = makeStore();
  export const persistor = persistStore(store);
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;