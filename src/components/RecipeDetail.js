import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecipeDetailPage.css';

export default function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                console.log('Fetching recipe for ID:', id);
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                setRecipe(response.data.meals[0]); // Assuming the API response is an object with a 'meals' array
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-detail-container">
            <div className="recipe-detail">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image-detail" />
                <h2 className="recipe-title-detail">{recipe.strMeal}</h2>
                <div className="recipe-ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        {Array.from({ length: 20 }, (_, i) => i + 1)
                            .filter(i => recipe[`strIngredient${i}`])
                            .map(i => (
                                <li key={i}>
                                    {recipe[`strMeasure${i}`]} {recipe[`strIngredient${i}`]}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="recipe-instructions">
                    <h3>Instructions:</h3>
                    <p>{recipe.strInstructions}</p>
                </div>
            </div>
        </div>
    );
};