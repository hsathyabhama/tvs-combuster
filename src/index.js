import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import appReducer from './Redux/reducer';

const isProd = false

const store = createStore(
  combineReducers({ app: appReducer }),
  isProd ? undefined : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <AppComponent />
  </Provider>
)

const rootHtml = document.getElementById('root')
ReactDOM.render(wrapApp(App, store), rootHtml)
// console.log(store);

// If you want to start measuring permance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
