import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import { store } from './app/store/store'
import { Provider as ReduxProvider} from 'react-redux'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios';
import ScrollToTop from '../src/scroll/ScrollToTop'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
// setup axios intercepts for every Http request
const token =  localStorage.getItem("access_token");
let persistor = persistStore(store);
axios.defaults.headers.common = {
  'Authorization':`Bearer ${token}`,
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
}
ReactDOM.render(

  <React.StrictMode>
    <Router>
      <ReduxProvider store={store}>
          <PersistGate  persistor={persistor}>
         <ScrollToTop />
        <App />
          </PersistGate>
      </ReduxProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
