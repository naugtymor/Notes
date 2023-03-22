import s from "./Modal.module.scss"
import React from "react";

export type ModalPropsType = {
    setModalActive: (modalActive: boolean) => void
    hide: () => void
}

const Modal: React.FC<ModalPropsType> = ({setModalActive, hide}) => {
    return (
        <div className={s.modalBlock} onClick={() => setModalActive(false)}>
            <div className={s.modalContent} onClick={e => e.stopPropagation()}>
                <div className={s.closeBlock} onClick={() => hide()}></div>
            </div>
        </div>
    )
}

export default Modal;