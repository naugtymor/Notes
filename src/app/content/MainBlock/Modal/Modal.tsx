import s from "./Modal.module.scss"
import React from "react";
import {useFormik} from "formik";
import {addNoteAC} from "../notes-reducer";
import {FormikModalErrorType} from "../MainBlock";

export type ModalPropsType = {
    setModalActive: (modalActive: boolean) => void
    hide: () => void
    title: string
    description: string
}

const Modal: React.FC<ModalPropsType> = ({setModalActive, hide, title, description}) => {

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
            console.log(values)
        },
    });


    return (
        <div className={s.modalBlock} onClick={() => setModalActive(false)}>
            <div className={s.modalContent} onClick={e => e.stopPropagation()}>
                <div className={s.closeBlock} onClick={() => hide()}></div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.noteTitleBlock}>
                        <span className={s.title}>{title}</span>
                    </div>
                    <div className={s.noteDescription}>
                        <div className={s.description}>{description}</div>
                    </div>
                    <div className={s.noteButtons}>
                        <button disabled={!(formik.isValid && formik.dirty)}
                                type={"submit"}
                                className={s.button}
                                onClick={() => {}}>
                            SAVE</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal;