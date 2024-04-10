import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, resetData, setCategory } from '../redux/dataSlice';

const CategoryModal = ({closeModal}) => {
    const dispatch = useDispatch();
    const [currentCategory, setCurrentCategory] = useState('');
    const storedCategory = useSelector(state => state.data.currentCategory)
    const storedPage = useSelector(state => state.data.currentPage)


    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentCategory !== '') {
            dispatch(setCategory(currentCategory));
        }
        dispatch(resetData())
        closeModal()
    };

    const handleChange = (e) => {
        setCurrentCategory(e.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='type your category'
                    value={currentCategory}
                    onChange={handleChange}
                />
                <button type="submit">search</button>
            </form>
        </div>
    )
}

export default CategoryModal