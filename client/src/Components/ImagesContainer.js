import React from 'react'
import { useSelector } from 'react-redux';

const ImagesContainer = () => {
const currentImgs = useSelector(state => state.data.currentImgData)

    return (
        <div className='grid-rows-3 grid-cols-3	grid w-1/3 h-1/5'>
            {currentImgs.map((img) => (
                <div key={img.id} >
                    <img src={img.previewURL} className='w-full h-full' alt={img.type}></img>
                </div>
            ))}
        </div>
    )
}

export default ImagesContainer