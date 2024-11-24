import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './slices/imageSlice.js'
import userReducer from './slices/userSlice.js'

const store = configureStore({
    reducer: {
        image: imageReducer,
        user: userReducer
    },
})

export default store;