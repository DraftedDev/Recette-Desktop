const Store = require('electron-store');

const RECIPE_DB = new Store()

let description //string
let name //string
let ingredients //string array
let recipeInstruction //string array

class Recipe {

    constructor(name, description, ingredients, recipeInstruction) {
        this.description = description;
        this.name = name;
        this.recipeInstruction = recipeInstruction;
        this.ingredients = ingredients;
    }

}

//add pre-made recipes
function initializePreMadeRecipes() {

    //recipes
    let recipes = [

        //Galette
        new Recipe(
        'Galette', 
        'Tasty french, crepe like cake without any sugar at all!', 
        [''],
        [''],
        ),

        //Tortilla de Patatas
        new Recipe(
        'Tortilla de Patatas', 
        'Omelette of potatoes, eggs, chopped onions and sometimes green peas from spain.', 
        [''],
        [''],
        ),

        //Swabian ravioli
        new Recipe(
        'Swabian ravioli', 
        'Pasta Bags with vegetable paste inside, from germany.', 
        [''],
        [''],
        ),

        //Manti
        new Recipe(
        'Mantı', 
        'Turkish pasta bags with meat inside and surrounded by yogurt.', 
        [''],
        [''],
        ),

        //Menemen
        new Recipe(
        'Menemen', 
        'Vegetable stew with Scrambled eggs, from Turkey.', 
        [''],
        [''],
        ),

        //Sweet spring rolls
        new Recipe(
        'Sweet spring rolls', 
        'Popular Japanese dessert.', 
        [''],
        [''],
        ),

        //Gözleme
        new Recipe(
        'Gözleme', 
        'Turkish dumplings from the pan.', 
        [''],
        [''],
        ),

        //Nutella brownies
        new Recipe(
            'Nutella brownies', 
            'Easy to make Nutella brownies.', 
            [''],
            [''],
            ),

        //Cheese and herb cake
        new Recipe(
        'Cheese and herb bread', 
        'French bread with herbs and cheese.', 
        [],
        [],
        ),

        //Piraschki
        new Recipe(
        'Piraschki', 
        'Russian bread dough with meat and eggs.', 
        [''],
        [''],
        ),

        //Swedish almond cake
        new Recipe(
        'Swedish almond cake', 
        'Tasty almond cake from sweden.', 
        [''],
        [''],
        ),

        //Tamagoyaki
        new Recipe(
        'Tamagoyaki', 
        'Tasty Japanese omelette.', 
        [''],
        [''],
        ),

    ];

    //add recipes if not already added, the key of the recipes is always its name
    recipes.forEach(recipe => {
        saveRecipe(recipe)
    });

}

function saveRecipe(recipe) {
    //recipe: {'name': string, 'description': string, 'instruction': array, 'incredients': array}
    RECIPE_DB.set(recipe.name+'.'+'name', recipe.name);
    RECIPE_DB.set(recipe.name+'.'+'description', recipe.description);
    RECIPE_DB.set(recipe.name+'.'+'instruction', recipe.recipeInstruction);
    RECIPE_DB.set(recipe.name+'.'+'ingredients', recipe.ingredients);
}