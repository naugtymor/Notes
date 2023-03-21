import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4} from 'uuid';

const slice = createSlice({
    name: "notes",
    initialState: {
        notes: [],
        tags: []
    } as NotesStateType,
    reducers: {
        addNoteAC: (state, action: PayloadAction<{ title: string, description: string }>) => {
            const content = action.payload.description;
            const regex = /#\w+/g;
            const tagMatches = content.match(regex);
            const newTags = tagMatches ? tagMatches.map(tag => tag.slice(1)) : [];
            state.tags = state.tags.concat(newTags)
            state.notes.push({id: v4(), title: action.payload.title, description: action.payload.description, tags: newTags});
        },
    },
})

export type NotesStateType = {
    notes: NoteType[],
    tags: string[]
}
export type NoteType = {
    id: string
    title: string
    description: string
    tags: string[]
}
export const {addNoteAC} = slice.actions;

export const notesReducer = slice.reducer;

