import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import imageReducer from './slices/imageSlice.js'
import userReducer from './slices/userSlice.js'
import offerReducer from './slices/offerSlice.js'
import categoryReducer from './slices/categorySlice.js'
import restaurantReducer from './slices/restaurantSlice.js'

const userPersistConfig = {
    key: 'user',
    storage,
};

const rootReducer = combineReducers({
    image: imageReducer,
    user: persistReducer(userPersistConfig, userReducer),
    offer: offerReducer,
    category: categoryReducer,
    restaurant: restaurantReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export const persistor = persistStore(store);

export default store;