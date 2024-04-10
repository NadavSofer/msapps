import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../redux/dataSlice';

const CategoryModal = ({closeModal}) => {
    const dispatch = useDispatch();
    const [currentCategory, setCurrentCategory] = useState('');
    const storedCategory = useSelector(state => state.data.currentCategory)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentCategory !== '') {
            dispatch(setCategory(currentCategory));
        }
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