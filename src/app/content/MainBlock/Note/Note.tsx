import React, {useState} from 'react';
import s from './Note.module.scss';

export type NotePropsType = {
    id: string
    title: string
    description: string
    tags: string[]
    onDelete: (id: string, tags: string[]) => void
}

const Note: React.FC<NotePropsType> = ({id, title, description, tags, onDelete}) => {

    const highlightedTag = tags.reduce((acc, tag) => {
        const regex = new RegExp(tag, 'gi');
        return acc.replace(regex, `<span style="color: rgb(255, 125, 0);">${tag}</span>`);
    }, description);

    return (
        <div className={s.note}>
            <div className={s.noteTitleBlock}>
                <span className={s.title}>{title}</span>
            </div>
            <div className={s.noteDescription}>
                <div className={s.description} dangerouslySetInnerHTML={{ __html: highlightedTag }}></div>
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
