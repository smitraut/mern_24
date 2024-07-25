import React from 'react';
import '../index.css';  

export const Home = () => {
    return (
        <div className="home-container">
            <main className="main-content">
                <div className="hero-section">
                    <h1>Welcome to MyWebsite</h1>
                    <p>Your one-stop solution for all your needs.</p>
                    <button className="hero-button">Get Started</button>
                </div>
            </main>
        </div>
    );
};
