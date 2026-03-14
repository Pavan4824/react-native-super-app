import {createListenerMiddleware} from '@reduxjs/toolkit';
import type {RootState, AppDispatch} from './types';

export const listenerMiddleware = createListenerMiddleware<
  RootState,
  AppDispatch
>();

/**
 * Typed startListening – use this to add listeners so listenerApi.getState/dispatch are typed.
 * Usage: startAppListening({ actionCreator: someAction, effect: (action, api) => { ... } })
 */
export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();
