'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/redux/store';

/**
 * Redux Provider component following SOLID principles:
 * - Single Responsibility: Only provides Redux store to the app
 * - Dependency Inversion: Depends on store abstraction
 */
interface StoreProviderProps {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore | undefined>(undefined);
  
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}