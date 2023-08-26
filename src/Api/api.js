import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk('fetchItems', async (modifiedEmail) => {
    try {
        const res = await axios.get(`https://expense-tracker-b7fdf-default-rtdb.firebaseio.com/expense-tracker/${modifiedEmail}.json`);
        return res?.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch items');
    }
});

export const addItem = createAsyncThunk('addItem', async ({ item, email, id }) => {
    try {
        if (!id) {
            const res = await axios.post(
                `https://expense-tracker-b7fdf-default-rtdb.firebaseio.com/expense-tracker/${email}.json`,
                item
            );
            console.log(res.data.name)
            return [res.data.name, item]

        } else {
            const res = await axios.put(
                `https://expense-tracker-b7fdf-default-rtdb.firebaseio.com/expense-tracker/${email}/${id}.json`,
                item
            );
            return [id, res.data]
        }
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add item');
    }
});

export const deleteItem = createAsyncThunk('deleteItem', async ({ id, email }) => {
    console.log(email)
    try {
        await axios.delete(`https://expense-tracker-b7fdf-default-rtdb.firebaseio.com/expense-tracker/${email}/${id}.json`);
        return id;
    } catch (error) {
        return error
    }
});
