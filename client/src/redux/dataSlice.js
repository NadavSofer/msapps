import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//MARK: initial State
const initialState = {
    loading: false,
    error: "",
    currentImgData: [], // will store arrays of 9 objects from the data that fetchImages fetches. each array of 9 objects will be referred to be me as a 'set'
    
    currentIndex: 0, // will act as the the current position in currentImgData and we'll iterate through it to move between the sets

    currentCategory: "", // sets the category
    lastPage: 0, // is the last page that can be fetched. used to disable the the next button
};


//MARK: fetch func
// will fetch the data from the server's API 
export const fetchImages = createAsyncThunk("data/fetchImages", async ({ category, page, numPerPage }) => {
    const res = await axios
        .get(`http://localhost:5000/api/${category}/${page}/${numPerPage}`);
    
    return res.data;
});

//MARK: preload func
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
        // if anything goes wrong
        console.error("Error preloading images:", error);
    }
};

export const dataSlice = createSlice({
    name: "data",
    initialState,
    //MARK: reducers
    reducers: {
        // reset the data in the store. is activated on category change 
        resetData: (state) => {
            state.currentImgData = [];
            state.currentIndex = 0
        },

        // will increment and decrement respectively the index to iterate through currentImgData 
        incrementPage: (state) => {
            state.currentIndex += 1;
        },
        decrementPage: (state) => {
            state.currentIndex -= 1;
        },

        // will be called in CategoryModal and set the category to the one the user inputted in CategoryForm
        setCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
    },
    //MARK: extra reducers
    extraReducers: builder => {
        // standard loading
        builder.addCase(fetchImages.pending, (state) => {
            state.loading = true;
        });

        // will activated when fetchImages is successful
        builder.addCase(fetchImages.fulfilled, (state, action) => {
            state.loading = false; // remove the loading
            const hitsArr = action.payload.data.hits // variable for convenience 
            preLoadImages(hitsArr) // will send the sets to the preload func to do it's thing
            .then(res=> res)

            // in the mounting phase we fetch 18 items for the initial preload
            // this will cut them in half to keep the structure of 
            //currentImgData to be 9 per set
            if (hitsArr.length > 9) {
                // cut the initial double set in two
                const firstHalf = hitsArr.slice(0, 9);
                const secondHalf = hitsArr.slice(9);

                // and push them in currentImgData
                state.currentImgData.push(firstHalf)
                state.currentImgData.push(secondHalf)
            } else {
                state.currentImgData.push(hitsArr)
            }
            // set the last page to disable the next button when needed
            state.lastPage = action.payload.maxPage;
            state.error = "";
        });
        // standard fetch fail bit will also make sure that the currentImgData is clean
        builder.addCase(fetchImages.rejected, (state, action) => {
            state.loading = false;
            state.currentImgData = [];
            state.error = action.error.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const {
    resetData,
    setCategory,
    incrementPage,
    decrementPage,
} = dataSlice.actions;

export default dataSlice.reducer;
