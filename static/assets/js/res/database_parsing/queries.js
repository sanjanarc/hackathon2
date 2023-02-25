

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
                "Baking powder",
                "Sugar"
            ],
            "prep_time" : 15,
            "cooking_time" : 10,
            "difficulty" : 2
        }
    ]
};

// Gets all the recipes from the 
function get_all_recipes() {
    return database.recipes;
}

// Gets the cost of a recipe
function get_recipe_cost(recipe) {
    return 10;
}

function get_recipe_total_time(recipe) {
    return recipe.prep_time + recipe.cooking_time;
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

// Filters out recipes that don't contain these ingrediants
function filter_ingredients_exact(recipes, ingredients) {
    return recipes.filter(recipe => {
        return recipe.ingredients.every(ing => {
            return ingredients.includes(ing);
        });
    });
}

// Tests the database
function test_db() {
    console.log(filter_time_range(get_all_recipes(), 5, 15));
    console.log(filter_name(get_all_recipes(), "to"));
    console.log(filter_ingredients_exact(get_all_recipes(), ["Egg"]));
}



test_db();
