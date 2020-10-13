import React, { Component, useEffect, useState } from 'react'
import SugarMeal from './SugarMeal.js'
import SugarAppForm from './SugarAppForm.js'
import './Sugar.css';

const SugarMealApp = () => {
  const [hiddenForm , setHiddenForm] = useState(false)
  const [existingSugarMeal , setExistingSugarMeal] = useState([])
  const [recipeId, setRecipeId] = useState(0)

  const handleSugarForm = event => {
    return setHiddenForm(!hiddenForm)
  }

  const saveSugarRecipe = (entry) => {
    entry.type = "SUGAR"
    
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
        setExistingSugarMeal(existingSugarMeal.concat( result ))
      },
      (error) => {
        console.log(error)
      }
    )

  }

  
  const getSugarRecipe = () => {
    fetch("http://localhost:8080/api/cooking-recipe?type=SUGAR", { 
      method: 'get', 
      headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwMjg1ODIzNn0.XnjVeerhnlogvHu4Lg_aKP_EqCPn-v6u1UeIAHfIioI8T-ShlHA9FopTq9oduPUd1GQJOmtfe0IsGTsLp43B1Q'
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
          if(result.length > 0){
            setExistingSugarMeal(existingSugarMeal.concat( result ))
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
    getSugarRecipe()
  }, [recipeId])


    return (
      <div>
        <div className="container marketing">
        <div className="row">
          <h1 className="title-sugar">Salé</h1>
            <button className="fa-2x sugar-button" type="button" onClick={handleSugarForm} >
              <i className="fa fa-plus-circle"></i>
            </button>
          </div>
          {hiddenForm && <SugarAppForm handleSugarForm={handleSugarForm} saveSugarRecipe={saveSugarRecipe}/>} 
          <div className="row">
            {existingSugarMeal.map((recipe) => <SugarMeal key={recipe.id} name={recipe.name} description={recipe.description} />)}
            </div>
        </div>
      </div>
    );
}

export default SugarMealApp;
