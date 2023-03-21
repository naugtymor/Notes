import React from 'react';
import s from './MainBlock.module.scss';
import Note from "./Note/Note";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {useFormik} from "formik";

export type FormikModalErrorType = {
    title?: string
    description?: string
}

const MainBlock = () => {
    const {notes, tags} = useAppSelector(s => s.notes)
    const dispatch = useAppDispatch();

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
            } else if (values.title.length > 10) {
                errors.title = 'Must be less then 12 characters';
            }

            if (!values.description) {
                errors.description = 'Required';
            } else if (values.description.length < 3) {
                errors.description = 'Must be 3 characters or more';
            } else if (values.description.length > 100) {
                errors.description = 'Must be less then 100 characters';
            }
            return errors;
        },
        onSubmit: (values, e) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

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
                    <button disabled={!(formik.isValid && formik.dirty)} type="submit" className={s.addButton}>ADD NOTE</button>
                </form>
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
                <Note/>
                <Note/>
            </div>

        </div>
    );
}

export default MainBlock;
