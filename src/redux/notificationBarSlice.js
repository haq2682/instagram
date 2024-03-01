import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: true,
}

export const notificationBarSlice = createSlice({
    name: 'notificationBar',
    initialState,
    reducers: {
        openNotificationBar: (state) => {
            state.open = true;
        },
        closeNotificationBar: (state) => {
            state.open = false;
        }
    }
})

export const {openNotificationBar, closeNotificationBar} = notificationBarSlice.actions;
export default notificationBarSlice.reducer;