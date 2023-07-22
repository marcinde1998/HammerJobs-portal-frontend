import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Dodaj inne reducery, jeśli są w projekcie
});

export default rootReducer;