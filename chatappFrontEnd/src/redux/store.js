import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["authUser"],  // Only persist logged-in user
};

const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, userReducer),
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
