import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import authReducer from './slices/authSlices';
import sidebarReducer from './slices/sideBarSlices';
import basicInfoReducer from "./slices/basicInfo";
import healthStatusReducer from "./slices/healthStatus";
import medicalHistoryReducer from "./slices/medicalHistory";
import treatmentInfoReducer from "./slices/treatmentInfo";
import labResultsReducer from "./slices/labResults";
import notesReducer from "./slices/notes";

// Fix: redux-persist crashes on SSR because localStorage doesn't exist on the server.
// This creates a safe no-op storage for SSR, and real localStorage on the client.
const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, value: unknown) => Promise.resolve(value),
  removeItem: (_key: string) => Promise.resolve(),
});

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

// Combine all reducers
const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  basicInfo: basicInfoReducer,
  healthStatus: healthStatusReducer,
  medicalHistory: medicalHistoryReducer,
  treatmentInfo: treatmentInfoReducer,
  labResults: labResultsReducer,
  notes: notesReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['sidebar', 'auth'],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };

// Type exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type PersistedRootState = RootState & PersistPartial;
