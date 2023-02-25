

database = 
{
    "recipes" : [
        {
            "name" : "Pancakes",
            "ingredients" : [
                "Flower",
                "Egg",
                "Milk",
                "Butter",
                "Baking powder",
                "Sugar"
            ],
            "prep_time" : 10,
            "cooking_time" : 5,
            "difficulty" : 2
        },
        {
            "name" : "French Toast",
            "ingredients" : [
                "Flower",
                "Egg",
                "Milk",
                "Butter",
                "Baking powder"
            ],
            "prep_time" : 15,
            "cooking_time" : 10,
            "difficulty" : 2
        }
    ]
};

function get_aproximate_price(ingredient) {
    return Math.random() * 100;
}
 
// Gets all the recipes from the 
function get_all_recipes() {
    return database.recipes;
}

// Gets the cost of a recipe
function get_recipe_cost(recipe) {
    return 10;
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

// Tests the database
function test_db() {
    console.log(recipe_filter(10, 30, 1, 5, "pan", ["Egg"]));
    
    console.log(get_approximate_recipe_cost(get_all_recipes()[0]));
}



test_db();
