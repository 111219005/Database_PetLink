import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from "./cartSlice";
import colorReducer from "./colorSlice";
import { combineReducers } from "redux";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// 1. Combine Reducers
const rootReducer = combineReducers({
  cart: persistReducer(
    {
      key: 'shoppingCart',
      storage,
    },
    cartReducer
  ),
  color: colorReducer,
});

// 2. Create Store
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        // 加上這幾個 persist actions 避免 TS 警告
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 3. Persistor
export const persistor = persistStore(store);

// 4. Type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
