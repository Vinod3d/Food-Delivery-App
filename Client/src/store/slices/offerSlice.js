import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const offerSlice = createSlice({
  name: "offer",
  initialState: {
    offers: [],
    loading: false,
    error: null,
  },

  reducers: {
    getOffersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getOffersSuccess(state, action) {
      state.loading = false;
      state.offers = action.payload;
    },
    getOffersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

// get all offers
export const getOffers = () => async (dispatch) => {
  dispatch(offerSlice.actions.getOffersRequest());
  try {
    const response = await axios.get(`${baseUrl}/api/offers/getall`, {
      withCredentials: true,
    });
    dispatch(offerSlice.actions.getOffersSuccess(response.data.data));
  } catch (error) {
    dispatch(offerSlice.actions.getOffersFailure(error.response?.data?.message));
  }
};

// get offers by restaurant id
export const getOffersByRestaurant = (restaurantId) => async (dispatch) => {
    dispatch(offerSlice.actions.getOffersByRestaurantRequest());
    try {
      const response = await axios.get(
        `${baseUrl}/api/offers/restaurant/${restaurantId}`,
        { withCredentials: true }
      );
      dispatch(offerSlice.actions.getOffersByRestaurantSuccess(response.data.data));
    } catch (error) {
      dispatch(offerSlice.actions.getOffersByRestaurantFailure(error.response?.data?.message));
    }
};


export default offerSlice.reducer;
