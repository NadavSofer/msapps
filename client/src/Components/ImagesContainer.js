import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Modal from 'react-modal'
import ImgModal from './ImgModal.js';


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

const ImagesContainer = () => {
    const currentImgs = useSelector(state => state.data.currentImgData)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [focusedImg, setFocusedImg] = useState({})

    Modal.setAppElement(document.getElementById('Test'));
    function openModal() {
        setIsOpen(true);
    }
    
    function closeModal() {
        setIsOpen(false);
    }

    const handleClick = (imgData) => {
        openModal()
        console.log(imgData);
        setFocusedImg(imgData)
    }

    return (
        <div className='grid-rows-3 grid-cols-3	grid h-2/3 w-1/2'>
            {currentImgs.map((img) => (
                <button key={img.id} onClick={()=>handleClick(img)}>
                    <img src={img.previewURL} className='w-full h-full' alt={img.type}></img>
                </button>
            ))}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Category Modal"
            >
                <ImgModal imgData={focusedImg}></ImgModal>
            </Modal>
        </div>
    )
}

export default ImagesContainer