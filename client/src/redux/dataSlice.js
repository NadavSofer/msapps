import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: "",
    currentImgData: [],
    currentPage: 1,
    currentCategory: "fish",
    lastPage: "",
};

export const fetchImages = createAsyncThunk("data/fetchImages", async ({ category, page, numPerPage }) => {
    const res = await axios
        .get(`http://localhost:5000/api/${category}/${page}/${numPerPage}`);
    
    return res.data;
});

const preLoadImages = async (images) => {
    try {
        await Promise.all(
            images.map((image) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = image.url;
                    img.onload = () => resolve();
                });
            })
        );
    } catch (error) {
        console.error("Error preloading images:", error);
    }
};

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.currentImgData = action.payload;
        },
        incrementPage: (state, action) => {
            state.currentPage += 1;
        },
        decrementPage: (state) => {
            state.currentPage -= 1;

        },
        setCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
        setLastPage: (state, action) => {
            state.lastPage = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchImages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchImages.fulfilled, (state, action) => {
            state.loading = false;
            const hitsArr = action.payload.data.hits
            preLoadImages(hitsArr)
            .then(res=> res)
            if (hitsArr.length > 9) {
                const firstHalf = hitsArr.slice(0, 9);

                const secondHalf = hitsArr.slice(9);
                state.currentImgData.push(firstHalf)
                state.currentImgData.push(secondHalf)
            } else {
                state.currentImgData.push(hitsArr)
            }

            state.lastPage = action.maxPage;
            state.error = "";
        });
        builder.addCase(fetchImages.rejected, (state, action) => {
            state.loading = false;
            state.currentImgData = [];
            state.error = action.error.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const {
    setCurrent,
    setCategory,
    incrementPage,
    decrementPage,
    setLastPage,
} = dataSlice.actions;

export default dataSlice.reducer;
