import React, { Component } from 'react'
import SaltMeal from './SaltMeal.js'
import SaltAppForm from './SaltAppForm.js'
import './Salt.css';

class SaltMealApp extends Component {
  state = {hiddenForm: false}

  handleSaltForm = event => {
    this.setState({hiddenForm: !this.state.hiddenForm })
  }

  render() {
    return (
      <div>
        <div class="container marketing">
        <div class="row">
          <h1 class="title-salt">Salé</h1>
            <button class="fa-2x salt-button" type="button" onClick={this.handleSaltForm} >
              <i class="fa fa-plus-circle"></i>
            </button>
          </div>
          {this.state.hiddenForm && <SaltAppForm handleSaltForm = {this.handleSaltForm}/>} 
          <div class="row">
            <SaltMeal title="Tarte épinards"/>
            <SaltMeal title="Quiche"/>
            <SaltMeal title="Burger"/>
            <SaltMeal title="Salade de riz"/>
            <SaltMeal title="Ratatouille"/>
            </div>
        </div>
      </div>
    );
  }
}
export default SaltMealApp;
