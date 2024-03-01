import { configureStore } from "@reduxjs/toolkit";
import authReducer from './redux/authSlice';
import notificationBarReducer from './redux/notificationBarSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notificationBar: notificationBarReducer,
    }
})