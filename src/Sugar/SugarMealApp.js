import React, { Component } from 'react'
import SugarMeal from './SugarMeal'
import SugarAppForm from './SugarAppForm.js'
import './Sugar.css';


class SugarMealApp extends Component {
  state = {hiddenForm: false}

  handleSugarForm = event => {
    this.setState({hiddenForm: !this.state.hiddenForm })
  }

  render() {
    return (
      <div>
        <div class="container marketing">
        
        <div class="row">
        <h1 class="title-sugar">Sucré</h1>
          <button class="fa-2x sugar-button" type="button" onClick={this.handleSugarForm} >
            <i class="fa fa-plus-circle"></i>
          </button>
        </div>
        {this.state.hiddenForm && <SugarAppForm handleSugarForm = {this.handleSugarForm}/>} 
          <div class="row">
            <SugarMeal title="Tarte sucre"/>
            <SugarMeal title="Clafouti"/>
            <SugarMeal title="Crème anglaise"/>
            <SugarMeal title="Salade de fruits"/>
            <SugarMeal title="Gâteau au yahourt"/>
            </div>
        </div>
      </div>
    );
  }
}

export default SugarMealApp;