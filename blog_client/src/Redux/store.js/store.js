import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "../slice.js/slice"
import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "@reduxjs/toolkit"

const persistConfig = {
    key: 'root',
    storage,
}

const reducer = combineReducers({
    authDetails: userReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer
})