import React, { Component } from 'react'
import './ListView.css';

export default class ListView extends Component {
    constructor(props){
        super(props);

        this.postsToCards = this.postsToCards.bind(this);
        this.imageClick = this.imageClick.bind(this);
    }

    imageClick(e){
        console.log(e.currentTarget);
        this.props.changeToViewer(e.currentTarget.id);
    }

    postsToCards() {
        return this.props.posts.map((post, i)=>{
            return (
            <li key={i+1} className='image-container' onClick={this.imageClick} id={i+1}>
                <img className="card-img-top" src={post.large_file_url}/>
            </li>)
        });
    }

    render() {
        const {posts} = this.props;
        return (<ul className="container">
            {this.postsToCards()}
        </ul>);
    }
}
