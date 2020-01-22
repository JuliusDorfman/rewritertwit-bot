import React, { Component } from 'react';
import 'whatwg-fetch';
// import axios from 'axios';

// TODO: Tweets that are captured by stream now populate the View.

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: []
    };

    // this.newTweet = this.newTweet.bind(this);
    // this.hideTweet = this.hideTweet.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    // this.addTestTweet = this.addTestTweet.bind(this);
    this.updateTweets = this.updateTweets.bind(this);
    // this._modifyTweet = this._modifyTweet.bind(this);
  }

  componentDidMount() {
    fetch('/api/twitterAPI', { method: 'GET'})
      .then(res => res.json())
      .then(json => {
        this.setState({
          tweets: json
        });
      });
  }

  // addTestTweet() {
  //   fetch('/api/twitterAPI/', { method: 'POST' })
  //     .then(res => res.json())
  //     .then(json => {
  //       let data = this.state.tweets;
  //       data.push(json);

  //       this.setState({
  //         tweets: data
  //       })
  //     })
  // }

  updateTweets() {
    fetch('/api/twitterAPI', {method: 'GET'})
      .then(res => res.json())
      .then(json => {
        this.setState({
          tweets: json
        });
      });
  }

  // newTweet() {
  //   fetch('/api/twitterAPI', { method: 'POST' })
  //     .then(res => res.json())
  //     .then(json => {
  //       let data = this.state.tweets;
  //       data.push(json);

  //       this.setState({
  //         tweets: data
  //       });
  //     });
  // }

  // hideTweet(index) {
  //   const id = this.state.tweets[index]._id;

  //   fetch(`/api/twitterAPI/${id}`, { method: 'DELETE' })
  //     .then(_ => {
  //       this._modifyTweet(index, null);
  //     });
  // }

  deleteTweet(index) {
    const id = this.state.tweets[index]._id;

    fetch(`/api/twitterAPI/deletetweet/${id}`, { method: 'DELETE' })
      .then(_ => {
        this._modifyTweet(index, null);
      });
  }


  _modifyTweet(index, data) {
    let prevData = this.state.tweets;

    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      tweets: prevData
    });
  }

  render() {
    return (
      <>
        <p>Tweets:</p>
        <button onClick={() => this.updateTweets()}>Update Tweets</button>
        <ul>
          {this.state.tweets.map((tweets, i) => (
            <li key={i}>
              <p>{`"${tweets.text}"`} </p>
              <p>{`- ${tweets.user}`}</p>
              <p>{tweets.created}</p>
              <p>{`"${tweets.alteredText}"`}</p>
              <p>- ReWriter, Twit</p>
              {/* <button onClick={() => this.addTestTweet(i)}>TestAddTweet</button> */}
              <button onClick={() => this.deleteTweet(i)}>Delete</button>
              {/* <button onClick={() => this.hideTweet(i)}>Hide</button>  */}
            </li>
          ))}
        </ul>

        {/* <button onClick={this.newTweet}>New tweet</button> */}
      </>
    );
  }
};

export default Home;


// import React from 'react';
// import logo from '../../assets/logo.svg';
// import { Link } from 'react-router-dom';
// import './Home.css';

// function Home() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 {/* <img src={logo} className="App-logo" alt="logo" /> */}
//                 <h1>Welcome to the Eloquent Twitter Stream</h1>
//                 <h2>by ReWriter, Twit</h2>
//                 <h4>I rewrite and transform your borderline inarticulate Tweets into something beautiful.</h4>
//                 <p>For Developers: See <Link to="/fordevs">How It's Done</Link></p>
//                 <p>Back to <Link to="/">the Tweets</Link></p>
//                 {/* <p>
//                     Edit <code>src/App.js</code> and save to reload.
//                 </p>
//                 <a
//                     className="App-link"
//                     href="https://reactjs.org"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                 </a> */}
//             </header>
//         </div>
//     );
// }

// export default Home;
