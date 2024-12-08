import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    cartRequest(state) {
      state.loading = true;
      state.error = null;
    },
    cartSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    cartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addItemToCart(state, action) {
      state.loading = false;
      console.log(action.payload)
      const existingItemIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    
    removeItemFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload.productId
      );
    },
  },
});

// fetch the cart
export const getCart = () => async (dispatch) => {
  dispatch(cartSlice.actions.cartRequest());
  try {
    const response = await axios.get(`${baseUrl}/api/cart`, {
      withCredentials: true,
    });
    dispatch(cartSlice.actions.cartSuccess(response.data.cart.items));
  } catch (error) {
    dispatch(cartSlice.actions.cartFailure(error.response.data.message));
  }
};

// add item to the cart
export const addToCart = (productId) => async (dispatch) => {
  dispatch(cartSlice.actions.cartRequest());
  try {
    const response = await axios.post(
      `${baseUrl}/api/cart`,
      { productId },
      { withCredentials: true }
    );
    console.log(response)
    dispatch(cartSlice.actions.addItemToCart(response.data.addedItem));
    return true;
  } catch (error) {
    dispatch(cartSlice.actions.cartFailure(error.response.data.message));
    return false;
  }
};

// remove item from the cart
export const removeFromCart = (productId) => async (dispatch) => {
  dispatch(cartSlice.actions.cartRequest());
  try {
    await axios.delete(`${baseUrl}/api/cart/item/${productId}`, {
      withCredentials: true,
    });
    dispatch(cartSlice.actions.removeItemFromCart({ productId }));
  } catch (error) {
    dispatch(cartSlice.actions.cartFailure(error.response.data.message));
  }
};

export default cartSlice.reducer;
