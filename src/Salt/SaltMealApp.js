import React, { Component, useEffect, useState } from 'react'
import SaltMeal from './SaltMeal.js'
import SaltAppForm from './SaltAppForm.js'
import './Salt.css';

const SaltMealApp = () => {
  const [hiddenForm , setHiddenForm] = useState(false)
  const [existingSaltMeal , setExistingSaltMeal] = useState([])
  const [recipeId, setRecipeId] = useState(0)

  const handleSaltForm = event => {
    return setHiddenForm(!hiddenForm)
  }

  const saveSaltRecipe = (entry) => {
    entry.type = "SALT"
    
    fetch("http://localhost:8080/api/cooking-recipes", { 
      method: 'post', 
      headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwMjg1ODIzNn0.XnjVeerhnlogvHu4Lg_aKP_EqCPn-v6u1UeIAHfIioI8T-ShlHA9FopTq9oduPUd1GQJOmtfe0IsGTsLp43B1Q',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(entry)
    })
    .then(res => res.json())
    .then(
      (result) => {
        setExistingSaltMeal(existingSaltMeal.concat( result ))
      },
      (error) => {
        console.log(error)
      }
    )

  }

  
  const getSaltRecipe = () => {
    fetch("http://localhost:8080/api/cooking-recipe?type=SALT", { 
      method: 'get', 
      headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwMjg1ODIzNn0.XnjVeerhnlogvHu4Lg_aKP_EqCPn-v6u1UeIAHfIioI8T-ShlHA9FopTq9oduPUd1GQJOmtfe0IsGTsLp43B1Q'
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
          if(result.length > 0){
            setExistingSaltMeal(existingSaltMeal.concat( result ))
          }else{
            console.log(result)
          }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  useEffect(() => {
    getSaltRecipe()
  }, [recipeId])


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
