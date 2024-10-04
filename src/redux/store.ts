import { configureStore } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";

const store =  configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type AppDispatch = typeof store.dispatch
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export default store;