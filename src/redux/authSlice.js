import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            success: false,
            error: false,
        },
        register: {
            isFetching: false,
            success: false,
            error: false,
        },

        logout: {
            // dataLogout: null,
            isFetching: false,
            error: false,
            success: true,
        },
    },
    reducers: {
        // Login
        loginStart: (state) => {
            state.login.isFetching = true;
            state.login.success = false;
            state.login.error = false;
            state.login.currentUser = null;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.success = true;
        },
        loginError: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        // Register
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.success = true;
        },
        registerError: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
        },
        //Logout
        logOutStart: (state) => {
            state.logout.isFetching = true;
        },
        logOutSuccess: (state) => {
            state.logout.isFetching = false;
            state.logout.success = true;
            // state.logout.dataLogout = action.payload;
            state.login.currentUser = null;
        },
        logOutError: (state) => {
            state.logout.isFetching = true;
            state.logout.error = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginError,
    registerStart,
    registerSuccess,
    registerError,
    logOutStart,
    logOutSuccess,
    logOutError,
} = authSlice.actions;

export default authSlice.reducer;
