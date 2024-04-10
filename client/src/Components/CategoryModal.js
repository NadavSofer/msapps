import React from 'react'
import { useDispatch } from 'react-redux';
import { resetData, setCategory } from '../redux/dataSlice';
import CategoryForm from './CategoryForm';

const CategoryModal = ({closeModal}) => {
    const dispatch = useDispatch();
    
    const handleCategorySubmit = (category) => {
        // Will change the category into the inputted result
        if (category !== '') {
            dispatch(setCategory(category));
        }
        // will reset the image list and index
        dispatch(resetData())

        closeModal()
    };
    
    return (
        <div className='flex flex-col items-center h-full w-full'>
            <p className='text-slate-100 text-5xl h-1/3 flex items-end'>Search for category</p>
            <CategoryForm onSubmit={handleCategorySubmit} />
        </div>
    )
}

export default CategoryModal