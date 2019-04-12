import React, { Component } from 'react'
import './Controls.css';

export default class Controls extends Component {
    render() {
        const {prevImage,nextImage} = this.props;
        return (<div className="controls">
            <button onClick={prevImage}>Prev</button>
            <button onClick={nextImage}>Next</button>
        </div>);
    }
}
