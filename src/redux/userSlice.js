"use strict";

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUser: null,
            isFetching: false,
            error: false,
            succes: true,
        },
    },
    reducers: {
        getAllUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getAllUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUser = action.payload;
            state.users.succes = true;
        },
        getAllUsersError: (state) => {
            state.users.isFetching = true;
            state.users.error = true;
        },
    },
});

export const { getAllUsersStart, getAllUsersSuccess, getAllUsersError } =
    userSlice.actions;

export default userSlice.reducer;
