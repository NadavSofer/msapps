import React from 'react'

const ImgModal = ({ imgData }) => {
    return (
        <div>
            <p>uploader: {imgData.user}</p>
            <p>downloads: {imgData.downloads}</p>
            <p>likes: {imgData.likes}</p>
            <p>type: {imgData.type}</p>
            <p>tags: {imgData.tags}</p>
            <p>views: {imgData.views}</p>
            <a href={imgData.pageURL} target='_blank'>link to page</a>
        </div>
    )
}

export default ImgModal