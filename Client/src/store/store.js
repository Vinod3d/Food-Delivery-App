import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './slices/imageSlice.js'
import userReducer from './slices/userSlice.js'
import offerReducer from './slices/offerSlice.js'
import categoryReducer from './slices/categorySlice.js'
import restaurantReducer from './slices/restaurantSlice.js'

const store = configureStore({
    reducer: {
        image: imageReducer,
        user: userReducer,
        offer: offerReducer,
        category: categoryReducer,
        restaurant: restaurantReducer
    },
})

export default store;