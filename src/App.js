import React, { Component } from 'react';
import axios from 'axios';
import Mousetrap from 'mousetrap';
import './App.css';
import ImageItem from './components/ImageItem';
import ListView from './components/ListView';
import Controls from './components/Controls';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentIndex: 0,
      listView: true,
      posts: [],
      currentPage: 0,
      distanceFromBottom: 99999,
    }

    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.changeToViewer = this.changeToViewer.bind(this);
    this.loadData = this.loadData.bind(this);
    this.testImage = this.testImage.bind(this);
  }

  componentDidMount(){
    this.loadData();

    window.addEventListener('scroll', this.handleScroll);
    Mousetrap.bind(['a'], this.prevImage);
    Mousetrap.bind(['d'], this.nextImage);
    Mousetrap.bind(['esc'], ()=> this.setState(state=> {return {listView:true}}));
  }

  componentWillUnmount(){
    Mousetrap.unbind(['a'], this.prevImage);
    Mousetrap.unbind(['d'], this.nextImage);
    Mousetrap.unbind(['esc'], ()=> this.setState(state=> {return {listView:true}}));

  }

  handleScroll(e) {
    const distanceFromBottom = (document.documentElement.scrollHeight - document.documentElement.scrollTop)*1;
    if(distanceFromBottom < 2000 && this.state.listView){
      this.loadData();
    }
  }

  loadData(){
    this.state.currentPage++;
    axios.get(`https://danbooru.donmai.us/posts.json?page=${this.state.currentPage}`)
    .then(res => {
      res.data.forEach(post=>{
        this.testImage(post);
      });
    });
  }

  testImage(post) {
    var tester=new Image();
    tester.onload= ()=>{
      this.setState((state, props) => { return { posts:[...state.posts,post] }});
    };
    tester.onerror= ()=>{}
    tester.src=post.large_file_url;
  }



  changeToViewer(id){
    this.setState((prevState, props) => {
      return {
        currentIndex: id-1,
        listView: false,
      };
    });
  }
  nextImage(){
    if(this.state.currentIndex == this.state.posts.length-1){
      //TODO add an indication to the user that more data is beying loaded
      //load more data
      this.loadData();
    }else{
      this.setState((prevState, props) => {
        return {currentIndex: ++prevState.currentIndex,};
      });
    }
  }
  prevImage(){
    if(this.state.currentIndex == 0){
      //toast saying that there ar no more items
      console.log('cant go any further');
    }else{
      this.setState((prevState, props) => {
        return {currentIndex: --prevState.currentIndex,};
      });
    }
  }

  render() {
    if(!this.state.listView){
      return (
          <div>
            <ImageItem
              imgUrl={this.state.posts[this.state.currentIndex].large_file_url}/>
            <Controls prevImage={this.prevImage} nextImage={this.nextImage}/>
            <button onClick={this.loadData}>More</button>
          </div> 
      );
    }

    return (<div>
      <button onClick={this.loadData}>More</button>
      <ListView 
        posts={this.state.posts}
        changeToViewer={this.changeToViewer} />
    </div>);

  }
}

export default App;
