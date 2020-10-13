import React, { Component, useState } from 'react'
import SaltMeal from './SaltMeal.js'
import SaltAppForm from './SaltAppForm.js'
import './Salt.css';

const SaltMealApp = () => {
  const [hiddenForm , setHiddenForm] = useState(false)
  const [existingSaltMeal , setExistingSaltMeal] = useState([])

  const handleSaltForm = event => {
    return setHiddenForm(!hiddenForm)
  }

  const saveSaltRecipe = (entry) => {
    entry.id = existingSaltMeal.length + 1
    
    setExistingSaltMeal(existingSaltMeal.concat(entry))

  }


    return (
      <div>
        <div className="container marketing">
        <div className="row">
          <h1 className="title-salt">Salé</h1>
            <button className="fa-2x salt-button" type="button" onClick={handleSaltForm} >
              <i className="fa fa-plus-circle"></i>
            </button>
          </div>
          {hiddenForm && <SaltAppForm handleSaltForm={handleSaltForm} saveSaltRecipe={saveSaltRecipe}/>} 
          <div className="row">
            {existingSaltMeal.map((recipe) => <SaltMeal key={recipe.id} name={recipe.name} description={recipe.description} />)}
            </div>
        </div>
      </div>
    );
}

export default SaltMealApp;
