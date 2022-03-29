import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* store */
import {createStore} from 'redux';
import myReducer from './reducers/index';
import {Provider} from 'react-redux';

/* lien ket voi reduce */
const store = createStore(myReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
