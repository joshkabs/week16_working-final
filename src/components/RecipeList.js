import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
// import the context component ie. RecipeContext
import { RecipeContext } from "./RecipeContext";

export default function RecipeList() {
    const [apiRecipes, setApiRecipes] = useState([]);
    const [userRecipes, setUserRecipes] = useState([]);

    useEffect(() => {
        const fetchApiRecipes = async () => {
            try {
                const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
                console.log("fetch api recipes response, ", response.data);
                setApiRecipes(response.data.meals);
            } catch (error) {
                console.error('Error fetching API data:', error);
            }
        };

        fetchApiRecipes();
    }, []);

    useEffect(() => {
        console.log('User recipes have been updated:', userRecipes);
    }, [userRecipes])

    const addRecipeToList = (newRecipe) => {
        // Added a console.log to see when/if this function is called and
        console.log("addRecipeToList, ", newRecipe);
        setUserRecipes([...userRecipes, newRecipe]);
    };



    const unifyRecipeStructure = (recipe) => {
        return {
            id: recipe.idMeal || recipe.id, // Use a consistent property name for ID
            title: recipe.strMeal || recipe.title, // Use a consistent property name for Title
            category: recipe.strCategory || recipe.category, // Use a consistent property name for Category
            area: recipe.strArea || recipe.area, // Use a consistent property name for Area
            thumbnail: recipe.strMealThumb || recipe.image, // Use a consistent property name for Thumbnail
        };
    };

    const allRecipes = [
        ...apiRecipes.map(unifyRecipeStructure),
        ...userRecipes.map(unifyRecipeStructure),
    ];

    return (
        // wrap the returned JSX in the context component and return the value or values, in this case the function addRecipeToList

        //example if you want to pass multiple values:
        /*
            <RecipeContext.Provider value={{ 
        isLoading, // a boolean state
        recipes, // an array state
        statusMessage, // a string state
        addRecipeToList // a function
            }}>
        */

        //Passes only the addRecipeToList method to the context component
        <RecipeContext.Provider value={{ addRecipeToList }}>
            <div>
                <h2>Recipes</h2>
                {allRecipes.length === 0 ? (
                    <p>Loading recipes...</p>
                ) : (
                    allRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title}
                            category={recipe.category}
                            area={recipe.area}
                            thumbnail={recipe.thumbnail}
                        />
                    ))
                )}
            </div>
        </RecipeContext.Provider>
    );
}