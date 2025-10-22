import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Typed hooks for Redux following SOLID principles:
 * - Single Responsibility: Each hook has one specific purpose
 * - Interface Segregation: Separate hooks for different concerns
 * - Dependency Inversion: Hooks depend on type abstractions
 */

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;