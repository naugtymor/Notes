import React from 'react';
import s from './Note.module.scss';

const Note = () => {

    return (
        <div className={s.note}>
            <div className={s.noteTitleBlock}>
                <span className={s.title}>Shop</span>
            </div>
            <div className={s.noteDescription}>
                <div className={s.description}>I need to buy a #compunter dsfiuhuisdf sdfihuisdfh isdugfigsdf iusdhfibhsdf iushdfiuhsd</div>
            </div>
            <div className={s.noteTags}>
                <div className={s.tagContainer}>
                    <span className={s.tag}>#computer</span>
                </div>
                <div className={s.tagContainer}>
                    <span className={s.tag}>#need</span>
                </div>
            </div>
            <div className={s.noteButtons}>
                <button className={s.button}>EDIT</button>
                <button className={s.button}>DELETE</button>
            </div>
        </div>
    );
}

export default Note;
