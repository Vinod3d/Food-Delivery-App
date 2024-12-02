import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

// Address Slice
const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },

  reducers: {
    getAddressesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAddressesSuccess(state, action) {
      state.loading = false;
      state.addresses = action.payload;
    },
    getAddressesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addAddressRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addAddressSuccess(state, action) {
      state.loading = false;
      state.addresses.push(action.payload);
    },
    addAddressFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateAddressRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateAddressSuccess(state, action) {
      state.loading = false;
      const index = state.addresses.findIndex(address => address._id === action.payload._id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    updateAddressFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    removeAddressRequest(state) {
      state.loading = true;
      state.error = null;
    },
    removeAddressSuccess(state, action) {
      state.loading = false;
      state.addresses = state.addresses.filter(address => address._id !== action.payload);
    },
    removeAddressFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Get all addresses
export const getAddresses = (userId) => async (dispatch) => {
  dispatch(addressSlice.actions.getAddressesRequest());
  try {
    const response = await axios.get(`${baseUrl}/api/address/user/${userId}/addresses`, {
      withCredentials: true,
    });
    dispatch(addressSlice.actions.getAddressesSuccess(response.data));
  } catch (error) {
    dispatch(
      addressSlice.actions.getAddressesFailure(error.response?.data?.message || "Failed to fetch addresses")
    );
  }
};

// Add a new address
export const addAddress = (addressData) => async (dispatch) => {
  dispatch(addressSlice.actions.addAddressRequest());
  try {
    const response = await axios.post(`${baseUrl}/api/address/add`, addressData, {
      withCredentials: true,
    });
    dispatch(addressSlice.actions.addAddressSuccess(response.data));
    return true;
  } catch (error) {
    dispatch(addressSlice.actions.addAddressFailure(error.response?.data?.message));
    return false;
  }
};

// Update an existing address
export const updateAddress = (addressData) => async (dispatch) => {
  console.log(addressData)
  dispatch(addressSlice.actions.updateAddressRequest());
  try {
    const response = await axios.put(
      `${baseUrl}/api/address/update/${addressData.id}`,
      addressData.data,
      {
        withCredentials: true,
      }
    );

    dispatch(addressSlice.actions.updateAddressSuccess(response.data));
    return true;
  } catch (error) {
    dispatch(addressSlice.actions.updateAddressFailure(error.response?.data?.message));
    return false;
  }
};

// Remove an address
export const removeAddress = (addressId) => async (dispatch) => {
  dispatch(addressSlice.actions.removeAddressRequest());
  try {
    await axios.delete(`${baseUrl}/api/address/delete/${addressId}`, {
      withCredentials: true,
    });
    dispatch(addressSlice.actions.removeAddressSuccess(addressId));
  } catch (error) {
    dispatch(addressSlice.actions.removeAddressFailure(error.response?.data?.message));
  }
};

export default addressSlice.reducer;
