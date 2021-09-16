import React from 'react';
import ReactDOM from 'react-dom';


import App from './App';
import Task from './Components/Task'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Task />
  </React.StrictMode>,
  document.getElementById('root')
);