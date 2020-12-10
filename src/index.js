import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import calculatorForFerryCost from './calculator';
import tripPlanner from './tripPlanner';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App tripPlanner={tripPlanner} calculate={calculatorForFerryCost(0.25)} />, document.getElementById('root'));
