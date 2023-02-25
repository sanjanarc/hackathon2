

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
            "prep_time" : 10
        }
    ]
};

// Gets all the recipes from the 
function get_all_recipes() {
    return database.recipes;
}


// Filters out the recipes for the time range
function filter_time_range(recipes, min, max) {
    return recipes.filter(recipe => { return recipe.prep_time >= min && recipe.prep_time <= max; });
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

function test_db() {
    console.log(filter_time_range(get_all_recipes(), 5, 15));
    console.log(filter_name(get_all_recipes(), "pan"));
}


test_db();
