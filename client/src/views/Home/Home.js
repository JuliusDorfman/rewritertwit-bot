import React, { Component } from 'react';
import './Home.css';
import 'whatwg-fetch';
// import axios from 'axios';

// TODO: Tweets that are captured by stream now populate the View.

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
        this.setState({isButtonDisabled: true})
        setTimeout(() => {
            this.setState({isButtonDisabled: false});
        }, 3000)
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
        fetch('/api/twitterAPI', { method: 'GET' })
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
                <button 
                disabled={this.stateisButtonDisabled}
                onClick={() => {this.updateTweets(); this.disableButton()}}>Update</button>
                <ul className='tweet-line'>
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

