import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal'
import ImgModal from './ImgModal.js';
import { fetchImages } from '../redux/dataSlice.js';


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
    const dispatch = useDispatch();
    const currentImgs = useSelector(state => state.data.currentImgData)
    const storedPage = useSelector(state => state.data.currentPage)
    const storedCategory = useSelector(state => state.data.currentCategory)
    const data = useSelector(state => state.data)

    const [modalIsOpen, setIsOpen] = useState(false);
    const [focusedImg, setFocusedImg] = useState({})

    useEffect(() => {
        dispatch(fetchImages({category:storedCategory, page:storedPage, numPerPage: 18}))

    }, [storedCategory])

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
        <div className=' h-2/3 w-1/2'>
            {currentImgs.loading && <div>Loading...</div>}
            {!currentImgs.loading && data.error ? <div>Error: {data.error}</div> : null}
            {!currentImgs.loading && data.currentImgData.length ? (
                <div className='grid-rows-3 grid-cols-3	grid w-full h-full'>
                    {currentImgs[storedPage-1].map((img) => (
                        <button key={img.id} onClick={() => handleClick(img)}>
                            <img src={img.previewURL} className='w-full h-full' alt={img.type}></img>
                        </button>
                    ))}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Category Modal">
                        <ImgModal imgData={focusedImg}></ImgModal>
                    </Modal>
                </div>) : ''}

        </div>
    )
}

export default ImagesContainer