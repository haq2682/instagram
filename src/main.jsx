import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {HeroUIProvider} from "@heroui/react";
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <HeroUIProvider>
                <App/>
            </HeroUIProvider>
        </PersistGate>
    </Provider>
  // </React.StrictMode>
);
