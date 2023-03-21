import React from 'react';
import s from './Note.module.scss';
import {deleteNoteAC} from "../notes-reducer";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

export type NotePropsType = {
    id: string
    title: string
    description: string
    tags: string[]
    onDelete: (id: string, tags: string[]) => void
}

const Note: React.FC<NotePropsType> = ({id, title, description, tags, onDelete}) => {
    return (
        <div className={s.note}>
            <div className={s.noteTitleBlock}>
                <span className={s.title}>{title}</span>
            </div>
            <div className={s.noteDescription}>
                <div className={s.description}>{description}</div>
            </div>
            <div className={s.noteTags}>
                {tags.map((t, index) =>
                    <div key={index} className={s.tagContainer}>
                        <span className={s.tag}>#{t}</span>
                    </div>
                )}
            </div>
            <div className={s.noteButtons}>
                <button className={s.button}>EDIT</button>
                <button className={s.button} onClick={() => {onDelete(id, tags)}}>DELETE</button>
            </div>
        </div>
    );
}

export default Note;
