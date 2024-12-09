import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const itemSlice = createSlice({
  name: "item",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    getItemsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getItemsSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    getItemsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    searchItemsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    searchItemsSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    searchItemsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const searchItems = (query) => async (dispatch) => {
  dispatch(itemSlice.actions.searchItemsRequest());
  try {
    const response = await axios.get(`${baseUrl}/api/items/search`, {
      params: { query },
      withCredentials: true,
    });
    dispatch(itemSlice.actions.searchItemsSuccess(response.data));
  } catch (error) {
    dispatch(itemSlice.actions.searchItemsFailure(error.response?.data?.message || "An error occurred"));
  }
};


export const getItemsByRestaurant = (restaurantId) => async (dispatch) => {
  dispatch(itemSlice.actions.getItemsRequest());
  try {
    const response = await axios.get(`${baseUrl}/api/items/restaurant/${restaurantId}`, {
      withCredentials: true,
    });
    dispatch(itemSlice.actions.getItemsSuccess(response.data.data));
  } catch (error) {
    dispatch(
      itemSlice.actions.getItemsFailure(error.response?.data?.message || error.message)
    );
  }
};

// Export the actions and reducer
export const { getItemsRequest, getItemsSuccess, getItemsFailure } = itemSlice.actions;
export default itemSlice.reducer;
