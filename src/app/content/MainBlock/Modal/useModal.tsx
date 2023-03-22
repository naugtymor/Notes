import {useState} from 'react'

export const useModal = () => {
    const [editNoteModal, setEditNoteModal] = useState(false)

    function toggleEditNoteModal() {
        setEditNoteModal(!editNoteModal)
    }

    return {
        editNoteModal,
        toggleEditNoteModal,
    }
}
