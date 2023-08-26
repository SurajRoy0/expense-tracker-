import { createSlice } from "@reduxjs/toolkit";

const userAuthToken = JSON.parse(localStorage.getItem("Authdata")) || {};

const initialAuthState = {
    token: userAuthToken.token || "",
    isLoggedIn: !!userAuthToken.token,
    userName: userAuthToken.userName || "",
    userEmail: userAuthToken.userEmail || "",
};


const authSlice = createSlice({
    name: "authentication",
    initialState: initialAuthState,
    reducers: {
        isLogin(state, action) {
            state.isLoggedIn = true;
            const updatedAuthData = {
                token: action.payload.token,
                userEmail: action.payload.userEmail,
                userName: action.payload.userName
            };
            localStorage.setItem("Authdata", JSON.stringify(updatedAuthData));
        },

        logOut(state) {
            state.isLoggedIn = false
            localStorage.removeItem("Authdata");
        },

        addUserName(state, action) {
            const updatedAuthData = {
                token: state.tokentoken,
                userEmail: state.userEmail,
                userName: action.payload.userName
            };
            localStorage.setItem("Authdata", JSON.stringify(updatedAuthData));
        },
    },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
