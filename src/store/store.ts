import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import authReducer from './slices/authSlices';
import sidebarReducer from './slices/sideBarSlices';
import basicInfoReducer from "./slices/basicInfo";
import healthStatusReducer from "./slices/healthStatus";
import medicalHistoryReducer from "./slices/medicalHistory";
import treatmentInfoReducer from "./slices/treatmentInfo";
import labResultsReducer from "./slices/labResults";
import notesReducer from "./slices/notes";

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
  whitelist: ['auth'], // Add other reducers here if you want to persist them
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable for redux-persist compatibility
    }),
});

// Create persistor
const persistor = persistStore(store);
export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

