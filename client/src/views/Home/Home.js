import React, { Component } from 'react';
import './Home.css';
import 'whatwg-fetch';
// import axios from 'axios';

//TODO: stop truncating tweets.
//TODO: paginate front page. staggard card view.
//TODO: visual button queue
//TODO: MATERICAL DESIGN DEPRESSED ORIGINAL TWEET: RAISED RWRITTEN TWEET BORDERS TO CONVAY 
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
            isButtonDisabled: false
        };

        // this.newTweet = this.newTweet.bind(this);
        // this.hideTweet = this.hideTweet.bind(this);
        this.deleteTweet = this.deleteTweet.bind(this);
        // this.addTestTweet = this.addTestTweet.bind(this);
        this.updateTweets = this.updateTweets.bind(this);
        this.disableButton = this.disableButton.bind(this);
        // this._modifyTweet = this._modifyTweet.bind(this);
    }

    componentDidMount() {
        fetch('/api/twitterAPI', { method: 'GET' })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    tweets: json
                });
            });
    }

    disableButton() {
        this.setState({ isButtonDisabled: true })
        setTimeout(() => {
            this.setState({ isButtonDisabled: false });
        }, 3000)
    }
    updateTweets() {
        fetch('/api/twitterAPI', { method: 'GET' })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    tweets: json
                });
            });
    }
    
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

    render() {
        return (
            <>
                <button
                    className='update-tweets-button'
                    disabled={this.stateisButtonDisabled}
                    onClick={() => { this.updateTweets(); this.disableButton() }}>Update</button>
                <hr />
                <ul className='tweet-line'>
                    {this.state.tweets.map((tweets, i) => (
                        <li key={i}>
                            <div className='user-container'>
                                <p className='user-text'>{`"${tweets.text}"`} </p>
                                <p className='user-username'>{`- @${tweets.user}`}</p>
                                <p className='tweet-date'>{tweets.created}</p>
                            </div>
                            <div className='twit-container'>
                                <div className='twit-content-wrapper'>
                                    <p className='twit-text'>{`"${tweets.alteredText}"`}</p>
                                    <div className='twit-signature'>
                                        <div className='twit-photo-wrapper'>
                                            <img src="/assets/images/twitphoto-medium.png" alt="twit-rewriter-photo" />
                                        </div>
                                        <p className='twit-username'>- ReWriter, Twit</p>
                                    </div>
                                    <button className='dont-bother' onClick={() => this.deleteTweet(i)}>Delete</button>
                                </div>
                            </div>
                            <hr />
                            {/* <button onClick={() => this.addTestTweet(i)}>TestAddTweet</button> */}
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

