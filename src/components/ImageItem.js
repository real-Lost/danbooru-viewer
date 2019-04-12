import React, { Component } from 'react'
import './ImageItem.css';
export default class ImageItem extends Component {
  render() {
    const {posts, imgUrl, currentIndex} = this.props;
    return (
      <div className='image-item card'>
        <div className="image-container">
          <img src={imgUrl} className="card-img-top" />
        </div>
        <div className="card-body">
          <p className="card-text">more info here</p>
        </div>
      </div>
    )
  }
}
