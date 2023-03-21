import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4} from 'uuid';

const slice = createSlice({
    name: "notes",
    initialState: {
        notes: [
            {id: '1', tags: ['one'], title: 'First', description: 'I have #one question'},
            {id: '2', tags: ['two'], title: 'Second', description: 'I have #two question'},
            {id: '3', tags: ['three'], title: 'Third', description: 'I have #three question'},
            {id: '4', tags: ['four'], title: 'Fourth', description: 'I have #four question'},
        ],
        tags: ['one', 'two', 'three', 'four']
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
            state.tags = state.notes.reduce((acc: string[], note: {tags: string[]}) => {
                note.tags.forEach(n => {
                    if (!acc.includes(n)) {
                        acc.push(n);
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

