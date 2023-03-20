import React from 'react';
import s from './MainBlock.module.scss';
import searchIcon from "../../../common/styles/assets/search-icon.svg";
import { AiOutlineSearch } from "react-icons/ai";


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
                <div className={s.note}>
                    <div className={s.noteTitle}></div>
                    <div className={s.noteDescription}></div>
                    <div className={s.noteTags}></div>
                    <div className={s.noteButtons}></div>
                </div>
                <div className={s.note}></div>
                <div className={s.note}></div>
                <div className={s.note}></div>
                <div className={s.note}></div>
                <div className={s.note}></div>
                <div className={s.note}></div>
                <div className={s.note}></div>
            </div>

        </div>
    );
}

export default MainBlock;
