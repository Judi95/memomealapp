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
        <div className="container marketing">
        
        <div className="row">
        <h1 className="title-sugar">Sucré</h1>
          <button className="fa-2x sugar-button" type="button" onClick={this.handleSugarForm} >
            <i className="fa fa-plus-circle"></i>
          </button>
        </div>
        {this.state.hiddenForm && <SugarAppForm handleSugarForm = {this.handleSugarForm}/>} 
          <div className="row">
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