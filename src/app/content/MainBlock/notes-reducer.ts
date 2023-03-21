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
            const uniqTags = newTags.filter(t => !state.tags.includes(t));
            state.tags = state.tags.concat(uniqTags)
            state.notes.push({
                id: v4(),
                title: action.payload.title,
                description: action.payload.description,
                tags: newTags
            });
        },
        deleteNoteAC: (state, action: PayloadAction<{ id: string, tags: string[] }>) => {
            state.notes = state.notes.filter(n => n.id !== action.payload.id);
            state.tags = state.notes.reduce((acc: string[], record: {id: string, tags: string[]}) => {
                record.tags.forEach(tag => {
                    if (!acc.includes(tag)) {
                        acc.push(tag);
                    }
                });
                return acc;
            }, []);
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
export const {addNoteAC, deleteNoteAC} = slice.actions;

export const notesReducer = slice.reducer;

