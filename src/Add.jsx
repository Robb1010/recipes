import React, {Component} from 'react';

class Add extends Component {
  
  render() {
    const style = {
      display: this.props.add
    }
    const recipe = {
      name: this.props.name,
      ingredients: this.props.ingredients,
      instructions: this.props.instructions
    }
    return (
      <div className="add_back" id="add_menu" style={style}>
        <div className="add_recipe" id="add_recipe">
          <p>Recipe name</p>
          <input name="name_" type="text" className="name" id="name" onChange={this.props.onNameChange}></input>
          <p>Ingredients</p>
          <input type="text" className="ingredients" id="ingredients" onChange={this.props.onIngredientsChange}></input>
          <p>Instructions</p>
          <textarea className="instructions" id="instructions" onChange={this.props.onInstructionsChange}></textarea>
          <div className='buttons_popup'>
            <button className="save" onClick={() => this.props.handleSave({recipe})}>
              Save
            </button>
            <button className="cancel" onClick={() => this.props.handleCancel()}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Add;
