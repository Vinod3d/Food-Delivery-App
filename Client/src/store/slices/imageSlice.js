import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { baseUrl } from "../../utils";

const imageSlice = createSlice({
    name: "image",
    initialState: {
        image: [],
        loading: false,
        error: null
    },

    reducers : {
        getImageRequest(state){
            state.loading = true;
            state.error = null;
        },
        getImageSuccess(state, action){
            state.loading = false;
            state.image = action.payload;
        },
        getImageFailure(state, action){
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const getImage = () => async(dispatch)=>{
    dispatch(imageSlice.actions.getImageRequest());
    try {
        const response = await axios.get(`${baseUrl}/api/images`, {
            withCredentials: true
        });

        dispatch(imageSlice.actions.getImageSuccess(response.data.data));
    } catch (error) {
        dispatch(imageSlice.actions.getImageFailure(error.response?.data?.message));
    }
}

export default imageSlice.reducer;