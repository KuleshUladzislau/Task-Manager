import {createSlice} from "@reduxjs/toolkit";
export {createSlice} from '@reduxjs/toolkit'


type AuthSliceType = {
    isAuth: boolean
    login:string
    email:string

}
const initialState: AuthSliceType = {
    login:'',
    email:'',
    isAuth:false
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthorized: (state, action) => {
            return  action.payload
        }
    },

})

export const {setAuthorized} = authSlice.actions
export default authSlice.reducer