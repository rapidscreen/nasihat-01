import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/lib/redux/features/auth/authSlice';

/**
 * Redux store configuration following SOLID principles:
 * - Single Responsibility: Store only manages state configuration
 * - Open/Closed: Easy to extend with new slices
 * - Dependency Inversion: Depends on abstractions (slices), not concrete implementations
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];