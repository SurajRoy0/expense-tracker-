import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Auth';
import itemReducer from './Items';
import themeReducer from './themeChange'

const store = configureStore({
    reducer: { auth: authReducer, items: itemReducer, theme: themeReducer }
});

export default store;