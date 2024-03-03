import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username: '',
    firstName: '',
    lastName: '',
    is_authenticated: false
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
        },
        logout: (state) => {
            state.is_authenticate = false;
            state.username = '';
            state.firstName = '';
            state.lastName = '';
        }
    }
})

export const {authenticate, logout} = authSlice.actions;
export default authSlice.reducer;