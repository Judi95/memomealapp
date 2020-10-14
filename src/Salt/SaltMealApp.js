import React, { Component, useEffect, useState } from 'react'
import SaltAppForm from './SaltAppForm.js'
import './Salt.css';
import {
  Link
} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

  const confirmDelete = (id, name) => {
    confirmAlert({
      message: 'Êtes-vous sûr de vouloir supprimer la recette : ' + name,
      buttons: [
        {
          label: 'Valider',
          onClick: () => deleteRecipe(id)
        },
        {
          label: 'Annuler',
          onClick: () =>  {}
        }
      ]
    });
  }
  
  const deleteRecipe = (id) => {
    console.log("MON ID : ", id)
    /*fetch(`http://localhost:8080/api/cooking-recipes/${id}`, { 
      method: 'delete', 
      headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwMjg1ODIzNn0.XnjVeerhnlogvHu4Lg_aKP_EqCPn-v6u1UeIAHfIioI8T-ShlHA9FopTq9oduPUd1GQJOmtfe0IsGTsLp43B1Q'
      })
    })
    .then(
      (result) => {
        console.log(result)
      },
      (error) => {
        console.log(error)
      }
    )*/
    const newList = existingSaltMeal.filter((item) => item.id !== id)
    return setExistingSaltMeal(newList)
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
            {existingSaltMeal.map((recipe) => {
              return(
              <div className="col-sm-3 mt-5 mr-5 list-items">
              <div className="content-item">
                <div className="title-item"><h2>{recipe.name}</h2></div>
              </div>
              <button className="fa-2x delete-recipe" onClick={() => confirmDelete(recipe.id, recipe.name)}  >
                <i className="fa fa-minus-circle"></i>
              </button>
           
                {recipe.image !== null && recipe.image !== '' &&<img className="img-item" src={recipe.image} alt="Recipe Image" width="100%"/>}
               <Link to={`details/${recipe.id}`}> <button className="btn button-item salt-button-item">Recette</button></Link>
              </div>)
            })
          }
            </div>
        </div>
      </div>
    );
}

export default SaltMealApp;
