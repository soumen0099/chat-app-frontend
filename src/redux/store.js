import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";

// sessionStorage use karo taaki har tab ka login alag rahe (localStorage tabs mein share hota hai)
const userPersistConfig = {
  key: "user",
  storage: storageSession,
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
