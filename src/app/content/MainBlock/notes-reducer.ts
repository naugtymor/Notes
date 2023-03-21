import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "notes",
    initialState: {
        notes: [],
        tags: []
    },
    reducers: {

    },
})

export const notesReducer = slice.reducer;

