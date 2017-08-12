import React from 'react'
import { render } from 'react-dom'
import Main from './components/main.jsx'
require('./styles/app.css')

Object.prototype.reduce = function(f, acc) {
    var keys = Object.keys(this);
    var r = acc === undefined ? this[keys[0]] : acc;
    for(var i = acc === undefined ? 1 : 0; i < keys.length; i++) {
        r = f(r, keys[i], this[keys[i]]);
    }
    return r;
};

render(<Main />, document.getElementById('app'))

