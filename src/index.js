import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from 'components/App/App';

import { Provider } from 'react-redux'
import store from 'redux/store'

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
<Provider store={store}>
    <TodoApp />
  </Provider>,
document.getElementById('root'));
