import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurants: [],
    loading: false,
    error: null,
  },
  reducers: {
    getRestaurantsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getRestaurantsSuccess(state, action) {
      state.loading = false;
      state.restaurants = action.payload;
    },
    getRestaurantsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getRestaurants = () => async (dispatch) => {
  dispatch(restaurantSlice.actions.getRestaurantsRequest());
  try {
    const response = await axios.get(`${baseUrl}/api/restaurant/getall`);
    dispatch(restaurantSlice.actions.getRestaurantsSuccess(response.data.data));
  } catch (error) {
    dispatch(
      restaurantSlice.actions.getRestaurantsFailure(
        error.response?.data?.message || "Failed to fetch restaurants"
      )
    );
  }
};

export default restaurantSlice.reducer;
