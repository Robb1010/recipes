import React, {Component} from 'react';
import $ from 'jquery';
import Add from './Add';
import Recipe from './Recipe';

class Content extends Component {

  constructor(props) {
  super(props);
  const defaultRecipe = {
    key1: {
      recipe: {
        name: 'Shrimp, Leek, and Spinach Pasta',
        ingredients: '¾ pound gemelli, fusilli, or other short pasta; 2tablespoons unsalted butter; 2 leeks (white and light green parts only), halved lengthwise then crosswise; kosher salt and black pepper;1 pound peeled and deveined medium shrimp (raw); finely grated zest of 1 lemon; ¾ cup heavy cream; 10 ounces baby spinach (about 12 cups)',
        instructions: '*Cook the pasta according to the package directions; drain and return it to the pot.  *Meanwhile, heat the butter in a large skillet over medium heat.  *Add the leeks, ½ teaspoon salt, and ¼ teaspoon pepper and cook, stirring occasionally, until the leeks have softened, 3 to 5 minutes.  *Add the shrimp and lemon zest and cook, tossing frequently, until the shrimp is opaque throughout, 4 to 5 minutes more.  *Add the cream and ½ teaspoon salt to the pasta in the pot and cook over medium heat, stirring, until slightly thickened, 1 to 2 minutes.  *Add the shrimp mixture and the spinach and toss to combine.'
      }
    },

    key2: {
      recipe: {
        name: 'Chicken, Zucchini, and Prosciutto',
        ingredients: '4 boneless, skinless chicken breasts; 1/2 teaspoon kosher salt; 1/2 teaspoon black pepper; 2 tablespoons olive oil; 1/4 pound (about 8 slices) prosciutto; 3 small zucchini, thinly sliced into half-moons; 1 clove garlic, thinly sliced; 1 lemon',
        instructions: '*Heat oven to 400° F.  *Season the chicken with ¼ teaspoon each of the salt and pepper.  *Heat 1 tablespoon of the oil in a large ovenproof skillet over medium-high heat.  *Cook the chicken for 2 minutes per side.  *Transfer the chicken to the oven and roast for 8 minutes.  *Meanwhile, in a second skillet, over medium heat, heat the remaining oil.  *Cook the prosciutto until crisp, 1 to 2 minutes per side.  *Transfer to a plate.  *Add the zucchini, garlic, and remaining salt and pepper to the skillet and cook until tender, about 3 minutes.  *Add the prosciutto and zucchini mixture to the skillet with the chicken, squeeze the lemon over the top, and toss.  *Divide among the plates.'
      }
  },

  key3: {
    recipe: {
      name: 'Spanish Omelet With Potatoes and Chorizo',
      ingredients: '3 tablespoons extra-virgin olive oil; 1 large yellow onion, chopped; 2ounces Spanish chorizo (cured sausage), sliced into thin half-moons; 3/4pound red potatoes, diced; kosher salt and pepper; 3/4cup flat-leaf parsley, roughly chopped; 10 large eggs, beaten; 1cup (4 ounces) shredded Manchego or sharp Cheddar; 1 small head green-leaf lettuce; 1/2 small red onion, thinly sliced',
      instructions: '*Heat oven to 400° F.  *Heat 1 tablespoon of the oil in a large ovenproof skillet over medium heat.  *Add the yellow onion and cook for 5 minutes.  *Add the chorizo, potatoes, and ½ teaspoon each salt and pepper and cook, covered, stirring occasionally, until the potatoes are tender, 10 minutes.  *Stir in the parsley.  *Pour in the eggs and stir to distribute the ingredients.  *Sprinkle with the cheese and transfer to oven.  *Bake the omelet until puffed and brown around the edges and a knife comes out clean, about 15 minutes.  *Divide the lettuce and red onion among plates and drizzle with the remaining oil.  *Cut the omelet into wedges and serve with the salad.'
    }
  }
}
  if (localStorage.getItem('recipe')) {
    this.state = {
      recipe: JSON.parse(localStorage.getItem('recipe')),
      add: 'none',
      ingredients: '',
      instructions: '',
      count: JSON.parse(localStorage.getItem('count')),
      active: '',
      name_live: '',
      instructions_live: '',
      ingredients_live: '',
      style: {}
  } } else this.state = {
    recipe: defaultRecipe,
    add: 'none',
    ingredients: '',
    instructions: '',
    count: 3,
    active: '',
    name_live: '',
    instructions_live: '',
    ingredients_live: '',
    style: {}
  }
}


  onNameChange(event) {
    this.setState({
      name_live: event.target.value
    })
  }

  onIngredientsChange(event) {
    this.setState({
      ingredients_live: event.target.value
    })
  }

  onInstructionsChange(event) {
    this.setState({
      instructions_live: event.target.value
    })
  }

  showRecipe(key) {
    this.setState({
      ingredients: this.state.recipe[key].recipe.ingredients,
      instructions: this.state.recipe[key].recipe.instructions,
      active: key
    })
    $('#recipe_' + key).slideDown('fast');
  }

  doEvent(obj, event) {
    event = new Event( event, {target: obj, bubbles: true} );
    return obj ? obj.dispatchEvent(event) : false;
  }

    handleAdd(option) {
      $('#add_menu').fadeIn('fast');
      // All this is in order to set the selected values of the text input fields
      if (this.state.recipe !== {}){
      const name = document.getElementById("name");
      name.value = '';
      this.doEvent(name, 'input');
      const ingredients = document.getElementById("ingredients");
      ingredients.value = '';
      this.doEvent(ingredients, 'input');
      const instructions = document.getElementById("instructions");
      instructions.value = '';
      this.doEvent(instructions, 'input');
    }
      //-----------------------------------------------------------------------------
      this.setState({
        add: option,
        active: ''
      });
    }

    handleEdit() {
      $('#add_recipe').fadeIn('fast');
      if (this.state.active !== '') {
        // All this is in order to set the selected values of the text input fields
        const name = document.getElementById("name");
        name.value = this.state.recipe[this.state.active].recipe.name;
        this.doEvent(name, 'input');
        const ingredients = document.getElementById("ingredients");
        ingredients.value = this.state.recipe[this.state.active].recipe.ingredients;
        this.doEvent(ingredients, 'input');
        const instructions = document.getElementById("instructions");
        instructions.value = this.state.recipe[this.state.active].recipe.instructions;
        this.doEvent(instructions, 'input');
        //-----------------------------------------------------------------------------
        this.setState({
          add: 'flex',
      })
    }
    }

    handleRemove() {
      const recipe = this.state.recipe;
      delete recipe[this.state.active];
      this.setState({
        recipe: recipe,
        instructions: '',
        ingredients: ''
      })
      this.saveLocally(0);
    }

  saveLocally(num) {
    let arr = JSON.stringify(this.state.recipe);
    let count = JSON.stringify(this.state.count + num);
    localStorage.setItem('recipe', arr);
    localStorage.setItem('count', count);
  }

  handleSave(content) {
    if(this.state.name_live === '' || this.state.ingredients_live === '' || this.state.instructions_live === '') {
      alert('Please fill in all the fields!');
      return;
    }
    let count = this.state.count;
    let next = count + 1;
    const recipe = this.state.recipe;
    if (this.state.active !== '') {
      recipe[this.state.active] = content;
      this.setState({recipe: recipe,
                     add: 'none',
                     ingredients: '',
                     instructions: '',
                     count: next,
                    })
      this.showRecipe(this.state.active);
      this.saveLocally(0);
    } else if (this.state.active === '') {
      recipe["key" + next] = content;
      this.setState({recipe: recipe,
                     add: 'none',
                     ingredients: '',
                     instructions: '',
                     count: next,
                    })
        this.showRecipe("key" + next);
        this.saveLocally(1);
    }
  }

  handleCancel() {
    this.setState({
      add: 'none'
    })
  }


  render() {
    const listThem = Object.keys(this.state.recipe).map((key) =>
      <li key={key} id={key} className="list_item" onClick={() => this.showRecipe(key)}>
        {this.state.recipe[key].recipe.name}
        <Recipe ingredients={this.state.ingredients}
                instructions={this.state.instructions}
                handleEdit={this.handleEdit.bind(this)}
                handleRemove={this.handleRemove.bind(this)}
                keyid={key}
                active={this.state.active}
           />
      </li>
    );
    return (
      <div>
        <Add
            handleSave={this.handleSave.bind(this)}
            handleCancel={this.handleCancel.bind(this)}
            add={this.state.add}
            name={this.state.name_live}
            ingredients={this.state.ingredients_live}
            instructions={this.state.instructions_live}
            onNameChange={this.onNameChange.bind(this)}
            onIngredientsChange={this.onIngredientsChange.bind(this)}
            onInstructionsChange={this.onInstructionsChange.bind(this)}
            />
        <div className="header">
        <h2>Recipe box</h2>
        <button className="add" onClick={() => this.handleAdd('flex')}>Add</button>
        </div>
        <div className="main">
          <div className="list_container">
            <ul className="recipe_list">
              {listThem}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Content;
