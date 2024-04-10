import React from 'react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setCurrent, setLastPage, incrementPage, decrementPage } from '../redux/dataSlice.js'
import ImagesContainer from './ImagesContainer.js';
import Button from './Button';
import CategoryModal from './CategoryModal.js';
import Modal from 'react-modal'


const Test = () => {
    const dispatch = useDispatch();
    const storedCategory = useSelector(state => state.data.currentCategory)
    const storedPage = useSelector(state => state.data.currentPage)
    const [modalIsOpen, setIsOpen] = useState(false);

    // Modal.setAppElement('#Test');

    useEffect(() => {
        fetchData();
    }, [storedCategory, storedPage]);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/${storedCategory}/${storedPage}`);
            const jsonData = await response.json();
            dispatch(setCurrent(jsonData.data.hits))
            dispatch(setLastPage(jsonData.maxPage))
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    function openModal() {
        setIsOpen(true);
    }

    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div>
            <button className='bg-cyan-400 text-slate-100 text-3xl m-5 px-5 py-3 w-40 rounded-xl' onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <CategoryModal closeModal={()=> closeModal()}></CategoryModal>
            </Modal>

            <ImagesContainer></ImagesContainer>
            <div className='flex items-center'>
                <Button text='Prev' pageNumber={storedPage} action={decrementPage()}></Button>
                <p className='text-slate-100 text-3xl ${}'>{storedPage}</p>
                <Button text='Next' pageNumber={storedPage} action={incrementPage()}></Button>
            </div>
        </div>
    )
}

export default Test