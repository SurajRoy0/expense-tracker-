import { createSlice } from '@reduxjs/toolkit';
import { addItem, deleteItem, fetchItems } from '../Api/api';

const initialState = {
    items: null,
    isLoading: false,
    isError: false,
    editData: {},
};
const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setEditData(state, action) {
            state.editData = action.payload;
        },
    },
    extraReducers(builder) {
        //Fetching Data
        builder.addCase(fetchItems.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.isLoading = false;
            if(action.payload) state.items = Object.entries(action.payload);
        })

        builder.addCase(fetchItems.rejected, (state, action) => {
            state.isError = true;
        })

        builder.addCase(addItem.fulfilled, (state, action) => {
            console.log(action)
            const existingItemIndex = state.items.findIndex(item => item[0] === action.payload[0])
            const existingItem = state.items[existingItemIndex]
            if (existingItem) {
                state.items[existingItemIndex] = [action.payload[0], action.payload[1]]
            } else {
                state.items.push(action.payload)
            }
        })

        builder.addCase(deleteItem.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item[0] !== action.payload)
        })
    }
});

export const itemActions = itemsSlice.actions;

export default itemsSlice.reducer;
