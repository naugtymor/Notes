import React, {useRef, useState} from 'react';
import s from './MainBlock.module.scss';
import Note from "./Note/Note";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {useFormik} from "formik";
import {addNoteAC, deleteNoteAC} from "./notes-reducer";

export type FormikModalErrorType = {
    title?: string
    description?: string
}

const MainBlock = () => {
    const dispatch = useAppDispatch();
    const {notes, tags} = useAppSelector(s => s.notes)

    const [searchTag, setSearchTag] = useState<string>('');
    const [isButtonHolding, setIsButtonHolding] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredNotes = notes.filter(note => searchTag !==  "" ? note.tags.some(tag => tag.includes(searchTag)) : note);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validate: (values) => {
            const errors: FormikModalErrorType = {};

            if (!values.title) {
                errors.title = 'Required';
            } else if (values.title.length < 3) {
                errors.title = 'Must be 3 characters or more';
            } else if (values.title.length > 12) {
                errors.title = 'Must be less then 12 characters';
            }

            if (!values.description) {
                errors.description = 'Required';
            } else if (values.description.length < 3) {
                errors.description = 'Must be 3 characters or more';
            } else if (values.description.length > 250) {
                errors.description = 'Must be less then 250 characters';
            }
            return errors;
        },
        onSubmit: (values, e) => {
            dispatch(addNoteAC(values));
            e.resetForm();
        },
    });

    const onDeleteNote = (id: string, tags: string[]) => {
        dispatch(deleteNoteAC({id, tags}))
    }

    const onTagClick = (t: string) => {
        setSearchTag(t)
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const onSearchTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTag(event.target.value);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const onSearchInputBlur = () => {
        if (!isButtonHolding) {
            setSearchTag('')
        }
    }

    return (
        <div className={s.mainBlock}>
            <div className={s.titleBlock}>
                <h1 className={s.title}>NOTES.</h1>
            </div>
            <div className={s.addNoteBlock}>
                <form onSubmit={formik.handleSubmit}>
                    <input style={formik.errors.title && formik.touched.title ? {border: `1px solid #bd1010`} : {}}
                           {...formik.getFieldProps('title')}
                           placeholder={'Title'}
                           className={s.addTitle}/>
                    {formik.errors.title && formik.touched.title &&
                        <span className={s.error}>{formik.errors.title}</span>}
                    <textarea style={formik.errors.description && formik.touched.description ? {border: `1px solid #bd1010`} : {}}
                              {...formik.getFieldProps('description')}
                              placeholder={'Description'}
                              className={s.addDescription}>
                    </textarea>
                    {formik.errors.description && formik.touched.description &&
                        <span className={s.error}>{formik.errors.description}</span>}
                    <button disabled={!(formik.isValid && formik.dirty)}
                            type={"submit"}
                            className={s.addButton}>ADD NOTE</button>
                </form>
            </div>
            <div className={s.searchBlock}>
                <input ref={inputRef}
                       onBlur={() => {onSearchInputBlur()}}
                       placeholder={'🔍︎'}
                       className={s.search}
                       onChange={onSearchTagChange}
                       defaultValue={searchTag}/>
            </div>
            <div className={s.tagsBlock}>
                {tags.map((t, index) =>
                    <div key={index} className={s.tagContainer}
                         onMouseDown={() => {setIsButtonHolding(true)}}
                         onClick={() => {onTagClick(t)}}
                         onMouseUp={() => {setIsButtonHolding(false)}}>
                        <span className={s.tag}>#{t}</span>
                    </div>
                )}
            </div>
            <div className={s.notesBlock}>
                {filteredNotes.map((p, index) => <Note
                                                                    onDelete={onDeleteNote}
                                                                    id={p.id}
                                                                    tags={p.tags}
                                                                    title={p.title}
                                                                    description={p.description}
                                                                    key={index}
                />)
                }
            </div>
        </div>
    );
}

export default MainBlock;
