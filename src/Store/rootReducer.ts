import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import { pathwayDataApi } from "./services/carePathway";
import { carePathwayinitialState, carePathwaySlice } from "./slices/carePathway";

const rootPersistConfig = {
  whitelist: [],
  key: "root",
  storage: localStorage,
};

const carePathwayPersistConfig = {
  blacklist: ["data"],
  key: "carePathway",
  storage: localStorage,
};

export const initialRootState = {
  carePathway: carePathwayinitialState,
};

const combinedReducer = combineReducers({
  carePathway: persistReducer(carePathwayPersistConfig, carePathwaySlice.reducer),
  [pathwayDataApi.reducerPath]: pathwayDataApi.reducer,
});

export const rootReducer = persistReducer(rootPersistConfig, combinedReducer);
