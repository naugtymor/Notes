import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4} from 'uuid';

const slice = createSlice({
    name: "notes",
    initialState: {
        notes: [
            {id: '1', tags: ['shop'], title: 'Shop', description: 'I wanna go to the #shop'},
            {id: '2', tags: ['idea'], title: 'Idea', description: 'I like this #idea'},
            {id: '3', tags: ['left', 'right'], title: 'Pill', description: 'Which pill would you take? In the #left hand or #right hand?'},
            {id: '4', tags: ['questions'], title: 'Questions', description: 'I have four #questions for you'},
        ],
        tags: ['shop', 'idea', 'left', 'right', 'questions']
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
        editNoteAC: (state, action: PayloadAction<{id: string, title: string, description: string, tags: string[] }>) => {
            const content = action.payload.description;
            const regex = /#\w+/g;
            const tagMatches = content.match(regex);
            const newTags = tagMatches ? tagMatches.map(tag => tag.slice(1)) : [];

            const note = state.notes.find(n => n.id === action.payload.id);
            if (note) {
                note.title = action.payload.title
                note.description = action.payload.description
                note.tags = newTags
            }

            state.tags = state.notes.reduce((acc: string[], note: {tags: string[]}) => {
                note.tags.forEach(n => {
                    if (!acc.includes(n)) {
                        acc.push(n);
                    }
                });
                return acc;
            }, []);
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
export const {addNoteAC, deleteNoteAC, editNoteAC} = slice.actions;

export const notesReducer = slice.reducer;

