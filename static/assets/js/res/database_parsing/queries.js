

//import database from "../database.json"

database = 
{
    "recipes" : [
        {
            "name" : "Pancakes",
            "ingrediants" : [
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

// async function get_database() {
//     database = await fetch("../database.json")
// }

/// get_all_recipes

// Gets all the recipes from the 
function get_all_recipes() {
    return database.recipes;
}


// Filters out the recipes for the time range
function filter_time_range(min, max) {
    return get_all_recipes().filter(recipe => { return recipe.prep_time >= min && recipe.prep_time <= max; });
    /*
    filtered = {}

    for (recipe in recipes) {
        if (recipe.prep_time >= min && recipe.prep_time <= max) {
            filtered.append(recipe);
        }
    }

    return filtered;
    */
}


function test_db() {
    console.log(filter_time_range(0, 20));
}


test_db();
