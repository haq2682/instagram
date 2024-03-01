import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    name: "Abdul Haq Khalid",
    username: "haq2682",
    is_authenticated: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleAuth: (state) => {
            state.auth = !state.auth
        },
    }
})

export const {toggleAuth} = authSlice.actions;
export default authSlice.reducer;