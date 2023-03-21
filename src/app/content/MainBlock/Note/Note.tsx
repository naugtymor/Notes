import React from 'react';
import s from './Note.module.scss';

export type NotePropsType = {
    title: string
    description: string
    tags: string[]
    // onDelete: () => void
}

const Note: React.FC<NotePropsType> = ({title, description, tags}) => {

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
                <button className={s.button}>DELETE</button>
            </div>
        </div>
    );
}

export default Note;
