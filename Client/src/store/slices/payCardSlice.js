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
  },
});

// Actions for asynchronous operations

export const getCardsByUser = () => async (dispatch) => {
  dispatch(payCardSlice.actions.getCardsRequest());
  try {
    const response = await axios.get(`${baseUrl}/api/paycards/cards`, {
      withCredentials: true,
    });
    console.log(response.data.cards);
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
    const response = await axios.post(`${baseUrl}/api/cards`, cardData, {
      withCredentials: true,
    });
    dispatch(payCardSlice.actions.addCardSuccess(response.data.card));
  } catch (error) {
    dispatch(
      payCardSlice.actions.addCardFailure(
        error.response?.data?.message || "Failed to add card"
      )
    );
  }
};

// Edit a card
export const editCard = (cardId, updatedData) => async (dispatch) => {
  dispatch(payCardSlice.actions.editCardRequest());
  try {
    const response = await axios.put(`${baseUrl}/api/cards/${cardId}`, updatedData, {
      withCredentials: true,
    });
    dispatch(payCardSlice.actions.editCardSuccess(response.data.updatedCard));
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
    await axios.delete(`${baseUrl}/api/cards/${cardId}`, {
      withCredentials: true,
    });
    dispatch(payCardSlice.actions.deleteCardSuccess(cardId));
  } catch (error) {
    dispatch(
      payCardSlice.actions.deleteCardFailure(
        error.response?.data?.message || "Failed to delete card"
      )
    );
  }
};

export default payCardSlice.reducer;
