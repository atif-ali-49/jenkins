import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import alertReducer from './alerts/AlertsSlice'
import cartReducer from "./cart/CartSlice";
import generalReducer from "./general/generalSlice";
import frontCartReducer from './front-cart/FrontCartSlice';
import cryptoCartReducer from "./crypto-cart/CryptoCart";
import activeLanguageReducer from './translator/translatorSlice';
import notificationReducers from './notifications/NotificationSlice';
import uninotificationReducers from './notifications/NotificationSlice';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist'

const reducers = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  cart: cartReducer,
  general: generalReducer,
  frontCart:frontCartReducer,
  cryptoCart:cryptoCartReducer,
  activeLanguage:activeLanguageReducer,
  notification:notificationReducers,
  uni_notification:uninotificationReducers
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist:['alert'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer:persistedReducer,
  devTools: process.env.REACT_APP_ENV !== 'production',
});
