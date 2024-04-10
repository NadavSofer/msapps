import React from 'react'

const ImgModal = ({ imgData }) => {
    // will get the data from ImagesContainer and renders it. nothing special here
    return (
        <div className='flex flex-col w-full h-full items-center justify- gap-5'>
            <div className='flex gap-5 w-full h-full px-20'>
                <div className='flex flex-col w-1/2 gap-5 justify-center text-xl'>
                    <p>Uploader: {imgData.user}</p>
                    <p>Type: {imgData.type}</p>
                    <p>Tags: {imgData.tags}</p>
                </div>
                <div className='flex flex-col w-1/2 gap-5 justify-center text-xl'>
                    <p>Downloads: {imgData.downloads}</p>
                    <p>Likes: {imgData.likes}</p>
                    <p>Views: {imgData.views}</p>
                </div>
            </div>
            <button className='bg-customBlue text-slate-100 w-fit text-3xl m-5 px-12 py-3 rounded-xl hover:bg-opacity-60 '><a href={imgData.pageURL} target='_blank' rel="noreferrer">Link to page</a></button>
        </div>
    )
}

export default ImgModal