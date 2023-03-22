import s from "./Modal.module.scss"
import React from "react";
import {useFormik} from "formik";
import {FormikModalErrorType} from "../MainBlock";
import {editNoteAC} from "../notes-reducer";
import {useAppDispatch} from "../../../store/store";

export type ModalPropsType = {
    setModalActive: (modalActive: boolean) => void
    hide: () => void
    title: string
    description: string
    id: string
    tags: string[]
}

const Modal: React.FC<ModalPropsType> = ({setModalActive, hide, title, description, id, tags}) => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            id: id,
            title: title,
            description: description,
            tags: tags
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
        onSubmit: (values) => {
            dispatch(editNoteAC(values))
            hide()
        },
    });

    return (
        <div className={s.modalBlock} onClick={() => setModalActive(false)}>
            <div className={s.modalContent} onClick={e => e.stopPropagation()}>
                <div className={s.closeBlock} onClick={() => hide()}></div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.noteTitleBlock}>
                        <input
                            style={formik.errors.title && formik.touched.title ? {borderBottom: `2px solid #bd1010`} : {}}
                            {...formik.getFieldProps('title')}
                            placeholder={'Title'}
                            className={s.title}/>
                    </div>
                    <div className={s.noteDescription}>
                        <textarea
                            style={formik.errors.description && formik.touched.description ? {border: `2px solid #bd1010`} : {}}
                            {...formik.getFieldProps('description')}
                            placeholder={'Description'}
                            className={s.description}>
                        </textarea>
                    </div>
                    <div className={s.noteButtons}>
                        <button disabled={!(formik.isValid && formik.dirty)}
                                type={"submit"}
                                className={s.button}
                                onClick={() => {
                                }}>
                            SAVE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal;