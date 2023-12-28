import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { RecipeContext } from "./RecipeContext"; //Import the context component to allow access to the function addRecipeToList

export default function RecipeForm() {
  //if you then need to reference multiple values from the context component, you can destructure them from the context component
  //  const { isLoading, recipes, statusMessage, addRecipeToList } = useContext(RecipeContext);

  //Only need to reference the function addRecipeToList from the context component in this case
  const { addRecipeToList } = useContext(RecipeContext); //Add the context component to the function
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    area: "",
    ingredients: "",
    instructions: "",
    image: null, // Add a state for the image file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate sending form data to a server (replace with actual API call)
      const response = await fetch(
        "https://65307f8a6c756603295eb0f7.mockapi.io/api/week14/recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }

      // Assuming the server returns the added recipe
      const addedRecipe = await response.json();

      // Add the recipe to the list
      addRecipeToList(addedRecipe);

      // After submitting the form, you can clear the form data or perform any other actions
      setFormData({
        title: "",
        category: "",
        area: "",
        ingredients: "",
        instructions: "",
        image: null,
      });

      // For demonstration purposes, let's log the added recipe
      console.log("Added Recipe:", addedRecipe);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="area">
        <Form.Label>Area</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter area"
          name="area"
          value={formData.area}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="ingredients">
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="instructions">
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" name="image" onChange={handleImageChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Recipe
      </Button>
    </Form>
  );
}