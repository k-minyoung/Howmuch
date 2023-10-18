import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/cart.js'
import { Provider } from 'react-redux'

import ReactDom from 'react-dom';

import './tailwind.css';
import './css/Global.css'

// ReactDom.render(<App />, document.querySelector('#root'))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <App />
  </Provider>

);
