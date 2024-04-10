import React from 'react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setCurrent, setLastPage, incrementPage, decrementPage } from '../redux/dataSlice.js'
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
    const dispatch = useDispatch();
    const storedCategory = useSelector(state => state.data.currentCategory)
    const storedPage = useSelector(state => state.data.currentPage)
    const [modalIsOpen, setIsOpen] = useState(false);
    Modal.setAppElement(document.getElementById('Test'));


    useEffect(() => {
        fetchData();
    }, [storedCategory, storedPage]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/${storedCategory}/${storedPage}`);
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

    function closeModal() {
        setIsOpen(false);
    }

    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }




    return (
        <div className='w-full h-full flex flex-col items-center justify-center' id='Test'>
            
            <div className='flex items-center'>
                <Button text='Prev' pageNumber={storedPage} action={decrementPage()}></Button>
                <button className='bg-cyan-400 text-slate-100 w-fit text-3xl m-5 px-5 py-3 rounded-xl' onClick={openModal}>Search</button>
                
                <Button text='Next' pageNumber={storedPage} action={incrementPage()}></Button>
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
            <p className='text-slate-100 text-3xl ${}'>{storedPage}</p>
        </div>
    )
}

export default Test