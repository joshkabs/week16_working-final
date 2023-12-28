import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default function RecipeCard({ id, title, category, area, thumbnail }) {
  return (
    <div className="recipe-card">
      <img className="recipe-thumbnail" src={thumbnail} alt={title} />
      <div className="recipe-info">
        <h3 className="recipe-title">{title}</h3>
        <p className="recipe-category">Category: {category}</p>
        <p className="recipe-area">Area: {area}</p>
        <Link to={`/recipes/${id}`} className="view-details-link">View Details</Link>
      </div>
    </div>
  );
};