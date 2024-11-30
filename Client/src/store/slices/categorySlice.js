import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },

  reducers: {
    getCategoriesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getCategoriesSuccess(state, action) {
      state.loading = false;
      state.categories = action.payload;
    },
    getCategoriesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getCategories = () => async (dispatch) => {
  dispatch(categorySlice.actions.getCategoriesRequest());
  try {
    const response = await axios.get(`${baseUrl}/api/categories`, {
      withCredentials: true,
    });
    dispatch(categorySlice.actions.getCategoriesSuccess(response.data.data));
  } catch (error) {
    dispatch(categorySlice.actions.getCategoriesFailure(error.response?.data?.message));
  }
};

export const getUniqeCategories = () => async (dispatch) => {
  dispatch(categorySlice.actions.getCategoriesRequest());
  try {
    const response = await axios.get(`${baseUrl}/api/categories/getuniqe`, {
      withCredentials: true,
    });
    dispatch(categorySlice.actions.getCategoriesSuccess(response.data.data));
  } catch (error) {
    dispatch(categorySlice.actions.getCategoriesFailure(error.response?.data?.message));
  }
};


export default categorySlice.reducer;
