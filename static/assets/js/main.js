import database from "../js/res/database_parsing/queries.js"

    // Generates a food 
    function generate_food_div(index) {
      return `<div class = 'col food_div' id = 'recipe1' >
        <div id = 'recipe_image'>
          <img class = 'img-fluid food_image' id = 'recipe_image' src = '../static/assets/img/food2.jpg'>
          </img>
          <div class = 'row align-items-center' id = 'likes'>
            <a class='like_button' id = 'like_button_` + index + `' data-gallery='portfolioGallery' class='col feed-lightbox'>
              <span id = 'heart4'>
                <i class='fa  fa-heart-o fa-3x' id='heart_` + index + `'' aria-hidden='true' >
                </i> 
              </span>
            </a>
            <div class='like-counter' id = 'num_likes_` + index + `'>
            </div>
          </div>
        </div> 
        <h5 class='recipe_name' id = 'recipe_title_` + index + `'>
        </h5>
      </div>`
    }

    function generate_other_food_div(index){
        return `<div class = 'col food_div' id = 'recipe1' >
        <div id = 'other_recipe_image'>
          <img class = 'img-fluid food_image' id = 'other_recipe_image' src = '../static/assets/img/food2.jpg'>
          </img>
          <div class = 'row align-items-center' id = 'likes'>
            <a class='like_button' id = 'like_button_` + index + `' data-gallery='portfolioGallery' class='col feed-lightbox'>
              <span id = 'heart4'>
                <i class='fa  fa-heart-o fa-3x' id='heart_` + index + `'' aria-hidden='true' >
                </i> 
              </span>
            </a>
            <div class='like-counter' id = 'num_likes_` + index + `'>
            </div>
          </div>
        </div> 
        <h5 class='recipe_name' id = 'recipe_title_` + index + `'>
        </h5>
      </div>`
    }

    function load_recipe(recipes, num_recipes) {
      let food_div = $("#recipe_super_div");
      let total_text = "";

      //Adds the row organizer
      total_text += "<div class = 'row align-items-start food_row_maker' id = 'selectors'>"
      for (let i = 0; i < num_recipes; i++) {
        total_text += generate_food_div((i + 1));
      }
      total_text += "</div>"
      food_div.html(total_text);

      // Adds the recipes
      for (let i = 0; i < num_recipes; i++) {
        const index = i + 1;
        const recipe_title = "recipe_title_" + index
        $('#' + recipe_title).html(recipes[i].name)

        const recipe_likes = "num_likes_" + index
        $('#' + recipe_likes).html(recipes[i].likes)

        const like_button = "heart_" + index;
        $('#' + like_button).click(
          function() {
            let the_index = index; 
            if ($('#' + like_button).hasClass("liked")) {
              $('#' + like_button).removeClass("liked")
            } else {
              $('#' + like_button).addClass("liked")
            };
            database.like_recipe(recipes[i].name);

            let recipe_likes = "num_likes_" + the_index
            $('#' + recipe_likes).html(recipes[i].likes)
          }
        )
      }
    }

    function load_other_recipe(recipes, how_many){
        let food_div = $("#other_recipes");
      let total_text = "";

      //Adds the row organizer
      total_text += "<div class = 'row align-items-start food_row_maker' id = 'selectors'>"
      for (let i = how_many; i < recipes.length; i++) {
        total_text += generate_other_food_div((i + 1));
      }
      total_text += "</div>"
      food_div.html(total_text);

      // Adds the recipes
      for (let i = how_many; i < recipes.length; i++) {
        const index = i + 1;
        const recipe_title = "recipe_title_" + index
        $('#' + recipe_title).html(recipes[i].name)

        const recipe_likes = "num_likes_" + index
        $('#' + recipe_likes).html(recipes[i].likes)

        const like_button = "heart_" + index;
        $('#' + like_button).click(
          function() {
            let the_index = index; 
            if ($('#' + like_button).hasClass("liked")) {
              $('#' + like_button).removeClass("liked")
            } else {
              $('#' + like_button).addClass("liked")
            };
            database.like_recipe(recipes[i].name);

            let recipe_likes = "num_likes_" + the_index
            $('#' + recipe_likes).html(recipes[i].likes)
          }
        )
      }
    }

    export function load_some_recipes(how_many) {
      // Gets all the recipes
      var recipes = database.get_all_recipes();
      load_recipe(recipes, how_many);
      load_other_recipe(recipes, how_many);
    }

    $('#search_value').change(
      function() {
        if(window.location.href == 'http://127.0.0.1:5500/templates/create_recipe.html')
            window.location.replace('http://127.0.0.1:5500/templates/index.html')
        const content = $('#search_value').val()
        console.log("Content: " + content)
        let all_recipes = database.get_all_recipes();
        let recipes = database.filter_name(all_recipes, content)
        load_recipe(recipes, recipes.length)
        document.getElementById("title_div").innerHTML = "Results for '" + content +"'";
      }
    )
    window.onload = load_some_recipes(5);

