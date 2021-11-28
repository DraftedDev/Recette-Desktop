//variables
const getRecipeBtn = document.querySelector('#recipe-button');
const recipeInput = document.querySelector('#recipe-input');
const createBtn = document.querySelector('#create-button');
const content = document.querySelector('#content');

//pre-made recipes
initializePreMadeRecipes();
//random catalog recipes
initCatalog();

//listeners
getRecipeBtn.onclick = () => onGetRecipeClick()
createBtn.onclick = () => onCreateClick()
document.onclick = (ev) => onDocumentClick(ev)


function onDocumentClick(ev) {
    
    //check if element is recipe
    if(ev.target.hasAttribute('data-recipe')) {
        selectRecipe(ev.target.getAttribute('data-recipe'))
    }
}

function selectRecipe(recipeName) {

    //entry with recipe attrubutes
    recipe = RECIPE_DB.get(recipeName);

    content.innerHTML = 
    `<br><div class="card text-center recipe-card">
    <div class="card-body">
      <h1 class="card-title">${recipe['name']}</h1>
      <h4>${recipe['description']}</h4>
      <hr class="my-3"><br><br>

      <h1>Ingredients:</h1>
      ${getIngredients()}<br>
      
      <hr class="my-3">

      <h1>Instruction:</h1>
      ${getInstruction()}<br><br><br>

      <button class="btn bg-light-error h-mini-nano w-nano font-mini align" id="recipeDeleteBtn">Delete Recipe</button>
      <button class="btn bg-warning h-mini-nano w-nano font-mini align" id="recipeEditBtn">Edit Recipe</button>

    </div>
    </div><br><br>`;


    //delete recipe
    const delBtn = document.querySelector('#recipeDeleteBtn');
    delBtn.onclick = () => {
        //custom alert
        const Alert = require("electron-alert");

        let alert = new Alert();
        
        let swalOptions = {
            title: 'Are you sure you want to delete this recipe?',
            text: 'This cannot be undone!',
            icon: "warning",
            showCancelButton: true
        };
        
        alert.fireFrameless(swalOptions, null, true, false).then((result) => {
            if (result.value) {
                // confirmed
                RECIPE_DB.delete(recipe['name'])
                initCatalog();
                return;
            }
        })
    };

    //edit recipe
    const editBtn = document.querySelector('#recipeEditBtn');
    editBtn.onclick = () => {
        editRecipe(recipe);
    };

    //scroll up again
    window.scrollTo(0, 0);

    //returns a html string with ingredients
    function getIngredients() {
        let htmlString = '<p>';
        recipe['ingredients'].forEach(el => {
            htmlString += 
            `- ${el}<br>`
        });
        htmlString += '</p>';
        return htmlString;
    }
    //returns a html string with the unstruction
    function getInstruction() {
        let htmlString = '<p>';
        let index = 1;
        recipe['instruction'].forEach(el => {
            htmlString += 
            `<h2><u>${index} </u></h2> ${el}<br><br>`
            index += 1;
        });
        htmlString += '</p>';
        return htmlString;
    }

}

//edit recipe
function editRecipe(recipe) {
    content.innerHTML = 
    `<br><div class="card text-center recipe-card">
    <div class="card-body">
      <h1 class="card-title">Edit Recipe</h1>
      <hr class="my-3"><br><br>

      <h2>Name</h2>
      <input type="text" class="w-normal" id="createName" value="${recipe['name']}" disabled></input>
      <br>
      <br>
      <h3>Description</h3>
      <input type="text" class="w-big" id="createDescription" value="${recipe['description']}"></input>
      <br><br>

      <hr class="my-3">

      <h2>Ingredients</h2>
      <textarea class="w-huge h-bigger-nano" id="createIngredients">${getIngredients()}</textarea>
      <br><br>

      <hr class="my-1"><br>

      <h2>Instruction</h2>
      <textarea class="w-huge h-bigger-mini" id="createInstruction">${getInstruction()}</textarea>
      <br><br><br>

      <hr>
      <button class="border h-mini-nano w-mini" id="createBtn">Save Recipe</button>
      <hr>

      <br><br>

    </div>
    </div><br><br>`;

    function getInstruction() {
        let htmlString = '';

        for(instr in recipe['instruction']) {
            htmlString += recipe['instruction'][instr] + '\n';
        }

        return htmlString;
    }

    function getIngredients() {
        let htmlString = '';

        for(instr in recipe['ingredients']) {
            htmlString += recipe['ingredients'][instr] + '\n';
        }

        return htmlString;
    }

    const createBtn = document.querySelector('#createBtn');
    createBtn.onclick = () => {
        const description = document.querySelector('#createDescription').value;
        const name = document.querySelector('#createName').value;
        const instruction = document.querySelector('#createInstruction').value.split('\n');
        const ingredients = document.querySelector('#createIngredients').value.split('\n');

        //check if input fields are empty
        if(description.length === 0 || name.length === 0 || ingredients.length === 0 || instruction.length === 0) {
            
            const Alert = require("electron-alert");

            let alert = new Alert();
            
            let swalOptions = {
                title: "Empty Input Fields",
                text: "Please don't let any input fields empty!",
                icon: "error"
            };
            
            alert.fireFrameless(swalOptions, null, true, false);

            initCatalog();
            return;
        }

        const newRecipe = new Recipe(name, description, ingredients, instruction);
        saveRecipe(newRecipe);
        //back to main menu
        initCatalog();
    };

    //scroll up again
    window.scrollTo(0, 0);
}

//search recipe
function onGetRecipeClick() {
    
    //make search and recipe keys lowercase
    const search = recipeInput.value.toLowerCase().trim();
    const recipes = Object.keys(RECIPE_DB.store);

    //reset content
    content.innerHTML = '';

    //if search is empty
    if(search.replace(' ', '').length === 0) {
        initCatalog();
        return;
    }

    recipes.forEach(recipeName => {
        const lowerName = recipeName.toLowerCase();
        if(lowerName.includes(search)) {

            const recipe = RECIPE_DB.get(recipeName)
            content.innerHTML += 
            `<br>`+
            `<div class="card text-center catalog-card">`+
            `<div class="card-body">`+
            `<h1 class="card-title" data-recipe="${recipe['name']}">${recipe['name']}</h1>`+
            `<hr class="my-3">`+
            `<p class="card-text">${recipe['description']}</p>`+
            `</div>`+
            `</div>`
            ;
        }
    })
    //if search was unsuccessful
    if(content.innerHTML === '') {

        const Alert = require("electron-alert");

        let alert = new Alert();
        
        let swalOptions = {
            title: "Recipe not found!",
            text: `Could not find recipe "${recipeInput.value}"`,
            icon: "error"
        };
        
        alert.fireFrameless(swalOptions, null, true, false);

        initCatalog();
    }
}

//new recipe
function onCreateClick() {

    content.innerHTML = 
    `<br><div class="card text-center recipe-card">
    <div class="card-body">
      <h1 class="card-title">Create a new recipe</h1>
      <hr class="my-3"><br><br>

      <h2>Name</h2>
      <input type="text" class="w-normal" placeholder="Boring Pizza" id="createName"></input>
      <br>
      <br>
      <h3>Description</h3>
      <input type="text" class="w-big" placeholder="A normal default looking boring pizza..." id="createDescription"></input>
      <br><br>

      <hr class="my-3">

      <h2>Ingredients</h2>
      <textarea class="w-huge h-bigger-nano" placeholder="200 gram butter...\n2 eggs" id="createIngredients"></textarea>
      <br><br>

      <hr class="my-1"><br>

      <h2>Instruction</h2>
      <textarea class="w-huge h-bigger-mini" placeholder="Get yourself a little tray...\nPour 1L milk...\nPut 100g Butter..." id="createInstruction"></textarea>
      <br><br><br>

      <hr>
      <button class="border h-mini-nano w-mini" id="createBtn">Create Recipe</button>
      <hr>

      <br><br>

    </div>
    </div><br><br>`;

    const createBtn = document.querySelector('#createBtn');
    createBtn.onclick = () => {
        const description = document.querySelector('#createDescription').value;
        const name = document.querySelector('#createName').value;
        const instruction = document.querySelector('#createInstruction').value.split('\n');
        const ingredients = document.querySelector('#createIngredients').value.split('\n');

        //check if input fields are empty
        if(description.length === 0 || name.length === 0 || ingredients.length === 0 || instruction.length === 0) {
            
            const Alert = require("electron-alert");

            let alert = new Alert();
            
            let swalOptions = {
                title: "Empty Input Fields",
                text: "Please don't let any input fields empty!",
                icon: "error"
            };
            
            alert.fireFrameless(swalOptions, null, true, false);

            initCatalog();
            return;
        }

        const newRecipe = new Recipe(name, description, ingredients, instruction);
        saveRecipe(newRecipe);
        //back to main menu
        initCatalog();
    };

    //scroll up again
    window.scrollTo(0, 0);

}


function initCatalog() {
    const recipes = Object.keys(RECIPE_DB.store).sort()
    content.innerHTML = '';
    recipes.forEach(el => {
        const recipe = RECIPE_DB.get(el)
        content.innerHTML += 
        `<br>`+
        `<div class="card text-center catalog-card">`+
        `<div class="card-body">`+
        `<h1 class="card-title" data-recipe="${recipe['name']}">${recipe['name']}</h1>`+
        `<hr class="my-3">`+
        `<p class="card-text">${recipe['description']}</p>`+
        `</div>`+
        `</div>`
        ;
    });
    content.innerHTML += '<br><br>';

}