// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();

  // If no recipes in localStorage, fetch from reference/recipes.json
  if (recipes.length === 0) {
    const recipesJsonUrl = new URL(
      "reference/recipes.json",
      window.location.href
    );
    fetch(recipesJsonUrl)
      .then((response) => response.json())
      .then((jsonRecipes) => {
        saveRecipesToStorage(jsonRecipes);
        addRecipesToDocument(jsonRecipes);
      });
  } else {
    // Add each recipe to the <main> element
    addRecipesToDocument(recipes);
  }
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  if (localStorage.getItem("recipes") == null) {
    return [];
  }
  let recipes = localStorage.getItem("recipes");
  recipes = JSON.parse(recipes);
  return recipes;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  const main = document.querySelector("main");
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  for (const recipe of recipes) {
    // used: for (let i = 0; i < recipes.length; i++) {... const recipe = recipes[i]; ...}
    const recipeCard = document.createElement("recipe-card");
    recipeCard.data = recipe;
    main.append(recipeCard);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  recipes = JSON.stringify(recipes);
  localStorage.setItem("recipes", recipes);
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  // B2. TODO - Get a reference to the <form> element
  const form = document.querySelector("form");
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Steps B4-B9 will occur inside the event listener from step B3
    // B4. TODO - Create a new FormData object from the <form> element reference above
    const formData = new FormData(form);
    // B5. TODO - Create an empty object (we'll refer to this object as recipeObject to
    //            make this easier to read), and then extract the keys and corresponding
    //            values from the FormData object and insert them into recipeObject
    let recipeObject = {};
    for (const [key, value] of formData.entries()) {
      recipeObject[key] = value;
    }
    // B6. TODO - Create a new <recipe-card> element
    const recipeCard = document.createElement("recipe-card");
    // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
    recipeCard.data = recipeObject;
    // B8. TODO - Append this new <recipe-card> to <main>
    const main = document.querySelector("main");
    main.append(recipeCard);
    // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage
    let recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);
  });
  // B10. TODO - Get a reference to the "Clear Local Storage" button
  const clearButton = document.querySelector("button.danger");
  // B11. TODO - Add a click event listener to clear local storage button
  clearButton.addEventListener("click", (event) => {
    // Steps B12 & B13 will occur inside the event listener from step B11
    // B12. TODO - Clear the local storage
    localStorage.clear();
    // B13. TODO - Delete the contents of <main>
    const main = document.querySelector("main");
    main.innerHTML = "";
  });
}
