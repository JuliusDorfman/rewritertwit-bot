import React from 'react';
// import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className="header">
            {/* Logo */}
            {/* <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/logo192.png" } alt="React logo" />
            </Link> */}
            <div className="header-content">

                <div className="profile-picture-wrapper">
                    <img className='profile-picture' src="/assets/images/twitphoto-large.png" alt="twit-rewriter-photo" />
                </div>

                <div className='welcome-banner'>
                    <p className='banner-username'>twit-rewriter</p>
                    <p><a className='banner-handle' href='https://twitter.com/RewriterTwit'>@ReWriter-Twit</a></p>
                    <p className='banner-bio'>I rewrite and transform your borderline inarticulate Tweets into something beautiful.</p>
                </div>
            </div>
            {/* Page Links */}
            <div className="nav-items">
                <a href="https://twitter.com/RewriterTwit"><p className='call-to-action'><i class="fa fa-twitter"></i></p></a>
                {/* <a href="https://twitter.com/intent/tweet?screen_name=rewriter-twit%20ref_src=twsrc%5Etfw" class="twitter-mention-button" data-show-count="false"><button>@ me! <br /> I always respond!</button></a> */}


                {/* <Link className="nav-link" to='/Home'>Home</Link> */}
                {/* <Link className = "nav-link" to='/Register'>Extra Page</Link> */}
                {/* <a className = "nav-link" target='_blank' rel="noopener noreferrer" href="https://reactjs.org/docs/getting-started.html">
                    React Docs
                </a>
                <a className = "nav-link" target="_blank" rel="noopener noreferrer" href="https://reactjs.org/tutorial/tutorial.html">React Tutorial</a>
                <a className = "nav-link" target="_blank" rel="noopener noreferrer" href="https://nodejs.org/en/docs/">Node Docs</a> */}
            </div>

        </div>
    )
};

export default NavBar;
