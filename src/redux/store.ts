import { configureStore } from "@reduxjs/toolkit";
// import LoginReducer from "../Pages/Login/LoginReducer";
// import loadingSlice from "./Reducers/Loading/LoadingReducer";
export default configureStore({
  reducer: {
    // login: LoginReducer,
    // loader: loadingSlice,
  },
  devTools: true,
});