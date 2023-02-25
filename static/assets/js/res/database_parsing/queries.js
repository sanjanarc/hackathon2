
database = require("../database.json")
fs = require('fs');

// Gets all the recipes from the 
function get_all_recipes() {
    return database.recipes;
}

// Gets all the authors in the Database
function get_all_authors() {
    return database.authors;
}

// Gets all the followed authors
function get_followed_authors() {
    return get_all_authors().filter(author => author.followed)
}

// Gets a all authors with this name
function get_authors_with_name(author_name) {
    return get_all_authors().filter(author => author.name.includes(author_name))
}

// Gets the approximate price of an ingredient
function get_aproximate_price(ingredient) {
    return Math.random() * 100; 
}

// Gets the total time to cookie a recipe
function get_recipe_total_time(recipe) {
    return recipe.prep_time + recipe.cooking_time;
}

// Gets the approximate cost of a recipe
function get_approximate_recipe_cost(recipe) {
    return recipe.ingredients
        .map(ing => { 
            return get_aproximate_price(ing);
        }).reduce((x, y) => { return x + y }, 0)
}

// Filters for favourited recipes
function filter_favourited_recipes(recipes) {
    return recipes.filter(recipe => recipe.favourited);
}

// Filters out the recipes for the time range
function filter_time_range(recipes, min, max) {
    return recipes.filter(recipe => { 
        const total_time = get_recipe_total_time(recipe);
        return total_time >= min && total_time <= max; 
    });
}

// Filters out the recipes for the difficulty range
function filter_difficulty_range(recipes, min, max) {
    return recipes.filter(recipe => { return recipe.difficulty >= min && recipe.difficulty <= max; });
}

// Filters for the name
function filter_name(recipes, name) {
    name = name.toLowerCase();
    return recipes.filter(recipe => {
        const recipe_name = recipe.name.toLowerCase();

        // Checks if the name is contained
        let valid = recipe_name.includes(name);

        return valid;
    });
}

// Filters the items based off followed authors
function filter_followed_authors(recipes) {
    followed = get_followed_authors();
    followed_names = followed.map(follow => follow.name)

    return recipes.filter(recipe => {
        return followed_names.includes(recipe.author);
    })
}


// Filters for authors with the name
function filter_authors_with_name(recipes, author_name) {
    authors = get_authors_with_name(author_name);
    author_names = authors.map(author => author.name)

    return recipes.filter(recipe => {
        return author_names.includes(recipe.author);
    })
}

// Filters recipes that have ALL of these ingredients
function filter_ingredients_all(recipes, ingredients) {
    return recipes.filter(recipe => {
        return ingredients.every(ing => {
            return recipe.ingredients.includes(ing);
        });
    });
}

// Filters recipes that have AT LEAST 1 of these ingredients
function filter_ingredients_any(recipes, ingredients) {
    return recipes.filter(recipe => {
        return ingredients.some(ing => {
            return recipe.ingredients.includes(ing);
        });
    });
}

// Filters for a recipe that fits within the bounds
function recipe_filter(time_min, time_max, difficulty_min, difficulty_max, search_name, ingredients) {
    let recipes = get_all_recipes();
    recipes = filter_name(recipes, search_name);
    recipes = filter_time_range(recipes, time_min, time_max);
    recipes = filter_difficulty_range(recipes, difficulty_min, difficulty_max);
    recipes = filter_ingredients_all(recipes, ingredients);
    
    return recipes;
}

// Creates a recipe
function create_recipe(name, ingredients, prep_time, cook_time, difficulty, author) {
    const recipe = {
        "name" : name,
        "ingredients" : ingredients,
        "prep_time" : prep_time,
        "cooking_time" : cook_time,
        "difficulty" : difficulty,
        "favourited" : false,
        "author" : author
    }

    return recipe;
}

// Saves a Recipe
function save_recipe(recipe) {
    database.recipes.push(recipe);
    const new_data = JSON.stringify(database, null, 4);
    fs.writeFile("../database2.json", new_data, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

// Tests the database
function test_db() {
    save_recipe(create_recipe(
        "Apple Strudle",
        ["Egg", "Milk"],
        10,
        10,
        4,
        "Ozone"
    ))
}



test_db();
