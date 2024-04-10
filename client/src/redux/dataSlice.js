import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentImgData: [],
    currentPage: 1,
    currentCategory: 'fish',
    lastPage: '',

}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.currentImgData = action.payload
        },
        incrementPage: (state) => {
            state.currentPage += 1
        },
        decrementPage: (state) => {
            state.currentPage -= 1
        },
        setCategory: (state, action) => {
            state.currentCategory = action.payload
        },
        setLastPage: (state, action) => {
            state.lastPage = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCurrent, setCategory, incrementPage, decrementPage, setLastPage } = dataSlice.actions


export default dataSlice.reducer