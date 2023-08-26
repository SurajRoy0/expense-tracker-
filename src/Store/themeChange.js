import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkTheme: false,
    isPremium: false
}

const themeSlice = createSlice({
    name: 'themeChange',
    initialState: initialState,
    reducers: {
        themeChanger(state) {
            state.isDarkTheme = !state.isDarkTheme;
        },
        isPremiumHandler(state, action) {
            state.isPremium = action.payload;
        }
    }
})

export const { themeChanger, isPremiumHandler } = themeSlice.actions;

export default themeSlice.reducer;