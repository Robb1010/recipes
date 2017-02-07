import React, {Component} from 'react';

class Recipe extends Component {

  displayIt() {
    if (this.props.keyid===this.props.active) {
      return {display: 'flex'}
    } else return {display: 'none'}
  }


  render() {
    const array = this.props.ingredients.split(';');
    const ingredients = array.map((ingredient, index) =>
        <li key={"ingredient" + index} id={"ingredient_" + index} className="ingredient">{ingredient}</li>
    );
    return (
      <div className="recipe" style={this.displayIt()} id={"recipe_" + this.props.keyid}>
        <div className="ingredients"><ul className="ingredients_list">{ingredients}</ul></div>
        <div className="text" dangerouslySetInnerHTML={{__html: '<p>' + this.props.instructions.replace(/\s\s/g, '<br>').replace(/\*/g, '&#8226 ') + '</p>'}}></div>
        <div className="buttons">
          <button className="edit" onClick={() => this.props.handleEdit()}>Edit</button>
          <button className="remove" onClick={() => this.props.handleRemove()}>Remove</button>
        </div>
      </div>
    )
  }
}

export default Recipe;
