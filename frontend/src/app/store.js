import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice.js';
import fileSlice from '../features/fileSlice.js';

const store = configureStore({
    reducer: {
        user: userSlice,
        files: fileSlice
    }
});

export default store;