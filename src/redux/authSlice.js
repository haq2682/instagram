import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username: '',
    firstName: '',
    lastName: '',
    website: '',
    gender: '',
    bio: '',
    email: '',
    profile_picture: null,
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
            state.website = action.payload.data.website;
            state.gender = action.payload.data.gender;
            state.bio = action.payload.data.bio;
            state.email = action.payload.data.email;
            state.profile_picture = action.payload.data.profile_picture;
        },
        logout: (state) => {
            setTimeout(()=> {
                state.is_verified = false;
                state.is_authenticated = false;
                state.username = '';
                state.firstName = '';
                state.lastName = '';
                state.verify_token = '';
                state.website = '';
                state.gender = '';
                state.bio = '';
                state.email = '';
                state.profile_picture = null;
            }, 3000);
        },
        verifyEmail: (state) => {
            state.is_verified = true;
        },
        unVerifyEmail: (state) => {
            state.is_verified = false;
        },
        togglePasswordReset: (state) => {
            state.is_password_reset = !state.is_password_reset;
        }
    }
})

export const {authenticate, logout, verifyEmail, togglePasswordReset, unVerifyEmail} = authSlice.actions;
export default authSlice.reducer;