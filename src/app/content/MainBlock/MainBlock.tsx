import React from 'react';
import s from './MainBlock.module.scss';
import Note from "./Note/Note";

const MainBlock = () => {

    return (
        <div className={s.mainBlock}>
            <div className={s.titleBlock}>
                <h1 className={s.title}>NOTES.</h1>
            </div>
            <div className={s.addNoteBlock}>
                <input placeholder={'Title'} className={s.addTitle}/>
                <textarea placeholder={'Description'} className={s.addDescription}></textarea>
                <button className={s.addButton}>ADD NOTE</button>
            </div>
            <div className={s.searchBlock}>
                <input placeholder={'🔍︎'} className={s.search}/>
            </div>
            <div className={s.tagsBlock}>
                <div className={s.tagContainer}>
                    <span className={s.tag}>#milk</span>
                </div>
                <div className={s.tagContainer}>
                    <span className={s.tag}>#shop</span>
                </div>
                <div className={s.tagContainer}>
                    <span className={s.tag}>#programming</span>
                </div>
            </div>
            <div className={s.notesBlock}>
                <Note/>
                <Note/>
                <Note/>

            </div>

        </div>
    );
}

export default MainBlock;
