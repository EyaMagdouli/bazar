import React from 'react';
import ReactDOM from 'react-dom';
import Bazar from './components/Bazar';


if (document.getElementById('bazarHome')) {
    ReactDOM.render(<Bazar/>, document.getElementById('bazarHome'));
}
