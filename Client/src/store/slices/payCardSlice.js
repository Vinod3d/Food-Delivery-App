import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const payCardSlice = createSlice({
  name: "payCard",
  initialState: {
    cards: [],
    loading: false,
    error: null,
  },

  reducers: {
    getCardsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getCardsSuccess(state, action) {
      state.loading = false;
      state.cards = action.payload;
    },
    getCardsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addCardRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addCardSuccess(state, action) {
      state.loading = false;
      state.cards.push(action.payload);
    },
    addCardFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCardRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteCardSuccess(state, action) {
      state.loading = false;
      state.cards = state.cards.filter((card) => card._id !== action.payload);
    },
    deleteCardFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    editCardRequest(state) {
      state.loading = true;
      state.error = null;
    },
    editCardSuccess(state, action) {
      state.loading = false;
      const updatedCard = action.payload;
      const index = state.cards.findIndex((card) => card._id === updatedCard._id);
      if (index !== -1) {
        state.cards[index] = updatedCard;
      }
    },
    editCardFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },


    clearErrors: (state) => {
      state.error = null;
    },

  },
});

// Actions for asynchronous operations

export const getCardsByUser = () => async (dispatch) => {
  dispatch(payCardSlice.actions.getCardsRequest());
  try {
    const response = await axios.get(`${baseUrl}/api/paycards/cards`, {
      withCredentials: true,
    });

    dispatch(payCardSlice.actions.getCardsSuccess(response.data.cards));
  } catch (error) {
    dispatch(
      payCardSlice.actions.getCardsFailure(
        error.response?.data?.message || "Failed to fetch cards"
      )
    );
  }
};

// Add a new card
export const addCard = (cardData) => async (dispatch) => {
  dispatch(payCardSlice.actions.addCardRequest());
  try {
    const response = await axios.post(`${baseUrl}/api/paycards/card`, cardData, {
      withCredentials: true,
    });
    dispatch(payCardSlice.actions.addCardSuccess(response.data.card));
    return true;
  } catch (error) {
    dispatch(
      payCardSlice.actions.addCardFailure(
        error.response?.data?.message || "Failed to add card"
      )
    );
    return false;
  }
};

// Edit a card
export const editCard = (cardId, updatedData) => async (dispatch) => {
  console.log(cardId, updatedData)
  dispatch(payCardSlice.actions.editCardRequest());
  try {
    const response = await axios.put(`${baseUrl}/api/paycards/card/${cardId}`, updatedData, {
      withCredentials: true,
    });

    console.log(response.data.card)
    dispatch(payCardSlice.actions.editCardSuccess(response.data.card));
  } catch (error) {
    dispatch(
      payCardSlice.actions.editCardFailure(
        error.response?.data?.message || "Failed to edit card"
      )
    );
  }
};

// Delete a card by ID
export const deleteCard = (cardId) => async (dispatch) => {
  dispatch(payCardSlice.actions.deleteCardRequest());
  try {
     await axios.delete(`${baseUrl}/api/paycards/card/${cardId}`, {
      withCredentials: true,
    });
    
    dispatch(payCardSlice.actions.deleteCardSuccess(cardId));
    return true;
  } catch (error) {
    console.error("Delete Card Error:", error);
    dispatch(
      payCardSlice.actions.deleteCardFailure(
        error.response?.data?.message || "Failed to delete card"
      )
    );
    return false;
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch(payCardSlice.actions.clearErrors());
};

export default payCardSlice.reducer;
