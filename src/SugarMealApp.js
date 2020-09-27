import React from 'react'
import SugarMeal from './SugarMeal'
import App from './App.js'


function SugarMealApp() {
  return (
    <div>
      <div class="container marketing">
      <h1 class="title-sugar">Sucré</h1>
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

export default SugarMealApp;