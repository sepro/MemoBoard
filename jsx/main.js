
var $ = require ('jquery');
require('react');


import React from 'react';
import ReactDOM from 'react-dom';

import Memoboard from './components/memoboard.jsx';


ReactDOM.render(
  <Memoboard url={document.getElementById('memoboard').getAttribute('url')} />,
  document.getElementById('memoboard')
);