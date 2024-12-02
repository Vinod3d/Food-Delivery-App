import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import imageReducer from './slices/imageSlice.js';
import userReducer from './slices/userSlice.js';
import offerReducer from './slices/offerSlice.js';
import categoryReducer from './slices/categorySlice.js';
import restaurantReducer from './slices/restaurantSlice.js';
import addressReducer from './slices/addressSlice.js';

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
    address: addressReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;
