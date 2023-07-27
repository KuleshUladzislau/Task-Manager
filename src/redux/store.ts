import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {todosApi} from "../Dall/api";
import authReducer from './Slices/authSlice';
import paginatorReducer from './Slices/paginatorSlice';



const rootReducer = combineReducers({
    [todosApi.reducerPath]: todosApi.reducer,
    auth: authReducer,
    pageSettings:paginatorReducer
})





export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        todosApi.middleware,
    ],
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


