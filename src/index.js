import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Memo.css';
import './css/bootstrap.css';
import App from './App';
import Header from './Header';
import MemoHead from './MemoHead';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <MemoHead />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
