import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentImgData: [],
    currentPage: 1,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.currentImgData = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { setCurrent } = dataSlice.actions


export default dataSlice.reducer