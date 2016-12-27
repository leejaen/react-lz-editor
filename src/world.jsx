/**
 * Created by lizhen on 4/2/2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './world.css';

class World extends React.Component {
    render() {
        return <h1>World!</h1>
    }
}

ReactDOM.render(<World/>, document.getElementById('world'));
