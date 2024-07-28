import {configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
// import {combineReducers} from "redux";
import storage from 'redux-persist/lib/storage';
import authReducer from './redux/authSlice';
import notificationBarReducer from './redux/notificationBarSlice';

// const reducers = combineReducers({
//     auth: authReducer,
// })

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        notificationBar: notificationBarReducer
    },
    devTools: 'production',
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    } 
})

// export const store = createStore(persistedReducer);
export const persistor = persistStore(store);