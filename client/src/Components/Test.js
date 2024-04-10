import React from 'react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, resetData, setLastPage, incrementPage, decrementPage, fetchImages } from '../redux/dataSlice.js'
import ImagesContainer from './ImagesContainer.js';
import Button from './Button';
import CategoryModal from './CategoryModal.js';
import Modal from 'react-modal'





const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '50%'
    },
};

const Test = () => {
    const storedPage = useSelector(state => state.data.currentPage)
    const [modalIsOpen, setIsOpen] = useState(false);
    const currentImgs = useSelector(state => state.data.currentImgData)
    const storedCategory = useSelector(state => state.data.currentCategory)
    const dispatch = useDispatch();
    Modal.setAppElement(document.getElementById('Test'));

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleNext = () => {
        console.log(currentImgs.length, storedPage-1);
        if (storedPage-1 === currentImgs.length - 2) {
            dispatch(fetchImages({category:storedCategory, page:storedPage, numPerPage: 9}))
        }
        dispatch(incrementPage())
    }


    return (
        <div className='w-full h-full flex flex-col items-center justify-center' id='Test'>
            
            <div className='flex items-center'>
                <Button text='Prev' pageNumber={storedPage} action={decrementPage()}></Button>
                <button className='bg-cyan-400 text-slate-100 w-fit text-3xl m-5 px-5 py-3 rounded-xl' onClick={openModal}>Search</button>
                
                <Button text='Next' pageNumber={storedPage} action={()=>handleNext()}></Button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Category Modal"
            >
                <CategoryModal closeModal={() => closeModal()}></CategoryModal>
            </Modal>
            <ImagesContainer></ImagesContainer>
        </div>
    )
}

export default Test