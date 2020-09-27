import React from 'react'
import SaltMeal from './SaltMeal.js'
import App from './App.js'

function SaltMealApp() {
  return (
    <div>
      <div class="container marketing">
      <h1 class="title-salt">Salé</h1>
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

export default SaltMealApp;
