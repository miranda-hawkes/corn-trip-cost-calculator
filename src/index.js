import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import calculatorForFerryCost from './calculator';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App calculate={calculatorForFerryCost(0.25)} />, document.getElementById('root'));
