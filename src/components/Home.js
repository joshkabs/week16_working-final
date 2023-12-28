import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

export default function Home() {
    return (
        <div className="home-container">
            <div className="background-image"></div>
            <div className="home-content-container">
                <h1>Nutrition App </h1>
                <p>Discover Our delicious recipes!</p>
                <Link to="/recipes">View Recipes</Link>
            </div>
        </div>
    );
};