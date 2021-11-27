import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { rootReducer } from "./rootReducer";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

// These actions from the persist library will fail the serializable check, but doesn't affect the app functionality
export const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

const isNotProductionEnv = process.env.NODE_ENV !== "production";

export const store = configureStore({
  reducer: rootReducer,
  devTools: isNotProductionEnv,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions,
      },
    }),
});

export const persistor = persistStore(store);

if (isNotProductionEnv && module.hot) {
  module.hot.accept("./rootReducer", () => store.replaceReducer(rootReducer));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// custom hooks for interacting with store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
