import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { Provider } from 'react-redux';
import store from './store'
import './index.css';
import 'font-awesome/css/font-awesome.css'

ReactDOM.render(
    <Provider store={store}>
  <App />
        </Provider>,
  document.getElementById('root')
);
