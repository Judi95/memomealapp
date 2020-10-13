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
            <SugarMeal title="Gâteau au yaourt"/>
            </div>
        </div>
      </div>
    );
  }

  componentDidMount(){
    fetch("http://localhost:8080/api/cooking-recipe?type=SUGAR", { 
      method: 'get', 
      headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwMjI0ODc4Mn0.akhGpH0FmaTC3CdbdXYBZDjuGofMEaVLKgLwDy0ZUijuGqffi6vCDkXU7ocM2SCKV0tGbJJpwrVE_Mh4jfi6Mg'
      })
    })
    .then(res => res.json()
    )
    .then(
      (result) => {
          console.log(result)
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
  
}

export default SugarMealApp;