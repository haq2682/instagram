import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username: '',
    firstName: '',
    lastName: '',
    is_verified: false,
    is_authenticated: false,
    is_password_reset: false,
    verify_token: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate: (state, action) => {
            state.is_authenticated = true;
            state.username = action.payload.data.username;
            state.firstName = action.payload.data.firstName;
            state.lastName = action.payload.data.lastName;
            state.verify_token = action.payload.data.verify_token;
        },
        logout: (state) => {
            setTimeout(()=> {
                state.is_verified = false;
                state.is_authenticate = false;
                state.username = '';
                state.firstName = '';
                state.lastName = '';
                state.verify_token = '';
            }, 3000);
        },
        verifyEmail: (state) => {
            state.is_verified = true;
        },
        togglePasswordReset: (state) => {
            state.is_password_reset = !state.is_password_reset;
        }
    }
})

export const {authenticate, logout, verifyEmail, togglePasswordReset} = authSlice.actions;
export default authSlice.reducer;