import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './counter'
export const store=configureStore({
    reducer:{
        cart:cartReducer
    }
})