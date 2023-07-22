// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Zakładając, że masz plik z root reducerem

const store = configureStore({
  reducer: rootReducer,
});

export default store;
