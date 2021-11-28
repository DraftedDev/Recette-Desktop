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
        ['250g Buckwheat flour', '2 eggs', '500ml (centiliter) of cold water', '40g melted butter', 'Fine sea salt'],
        [
            'Mix buckwheat flour, salt, whipped eggs and the cold water in a large bowl, then incorporate the melted butter until a smooth dough running off the spoon forms.', 
            'Let the Galette dough rest in a cool place for 2 hours.',
            'Bake the flatbreads in a pan with a non-stick coating (just like crepes).',
            'Use small amounts of dough and spread it in the width of the entire pan.'
        ]
        ),

        //Tortilla de Patatas
        new Recipe(
        'Tortilla de Patatas', 
        'Omelette of potatoes, eggs, chopped onions and sometimes green peas from spain.', 
        ['500g Potatoes', '2 Onions', '4 eggs', '250ml Olive oil', 'Pepper and salt'],
        [
            'Wash and peel the potatoes and put them into a bowl.',
            'Cut the potatoes into 1cm cubes.',
            'Heat 200 ml of olive oil in a pan and add the potato pieces. These should just be covered with oil.',
            'Fry the potatoes over medium heat for about 15 minutes. Stir occasionally.',
            'Peel the onions, cut finely and fry in them in another pan with a little oil until they are translucent.',
            'Now put the eggs in a bowl and mix them with a whisk.',
            'Take the potatoes out of the oil with a sieve and mix them with the egg mass and onions in a large bowl. Season vigorously with salt and pepper and let the mixture steep for about three minutes.',
            'Put three to four tablespoons of oil in a large pan and fry the tortilla mass for about five minutes until it\' golden brown on the bottom.',
            'Turn the Tortilla and fry it for three minutes, und it\'s golden brown.',
            'Put the finished Tortilla on a plate and let it cool down a bit.',
        ],
        ),

        //Menemen
        new Recipe(
        'Menemen', 
        'Vegetable stew with Scrambled eggs, from Turkey.', 
        ['4 big onions', '500g green (turkish) pointed peppers', '1 mild green chilli pepper', '180g Sucuk (turkish sausage)', '2 tablespoons Olive oil', '850ml Tomatoes', 'Salt and sugar', '1 bunch of flat-leaf parsley', '6 eggs'],
        [
        'Peel and roughly dice the onions. Clean and wash the peppers and cut into strips. Clean the chilli, cut lengthways, core, wash and cut into fine rings. Peel the skin off the sucuk.',
        'Halve the sausage lengthways and cut into slices.',
        'Heat the oil in a large ovenproof non-stick pan. Stew the onions, chilli and sausage in it for about 10 minutes. After 5 minutes, add the paprika.',
        'Preheat the oven (electric stove: 175 °C | convection: 150 °C | gas: see manufacturer). Add the tomatoes and their juice to the vegetables, bring to the boil and continue to simmer for about 5 minutes. Season everything with salt and a pinch of sugar.',
        'In the meantime, wash the parsley, shake dry, pluck the leaves off and chop. Stir the parsley into the vegetable sauce. Beat the eggs side by side in the pan. Let it set in the hot oven for about 10 minutes.',
        ],
        ),

        //Gözleme
        new Recipe(
        'Gozleme', 
        'Turkish dumplings from the pan.', 
        ['500g wheat flour', '110ml Milk', '1 teaspoons of salt', '2 tablespoons of Olive oil', '500g Baby spinach', '2 onions', '2 cloves of garlic', '2 tablespoons of Chilli flakes', 'Salt and pepper', '300g Sheep cheese'],
        [
        'Mix the flour and salt in a bowl. Add milk and warm water in the same proportions as well as olive oil and stir roughly with a fork.',
        'Then knead with your hands for about 8 minutes to form a smooth dough. Shape the dough into 4 balls of the same size and leave to rest covered for 30 minutes.',
        'In the meantime, wash the spinach and pat dry for the filling. Peel and finely dice onions and garlic.',
        'Heat the oil in a saucepan and fry the onions and garlic in it for about 2 minutes. Add the spinach and let it collapse.',
        'Season with chilli, salt and pepper. Stir the spinach vigorously, let it cool down a little and cut roughly on a board. Crumble the sheep\'s cheese and mix in a bowl with the spinach.',
        'Roll out the dough balls very thinly (1 mm thick). Distribute ¼ of the filling onto one half of the dough circles, fold the other half over and press on to seal.',
        'Heat the oil in a pan to fry. Bake the Gozleme on both sides for 2-3 minutes until golden brown. Remove from the pan and brush with a little oil if necessary.'
        ],
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