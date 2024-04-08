import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    imgData: [],
}

export const dataSlice = createSlice({
    name: 'imgData',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.imgData = [...state, action.payload]
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCurrent } = dataSlice.actions

export default dataSlice.reducer