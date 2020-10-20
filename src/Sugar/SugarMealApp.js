import React, { Component, useContext, useEffect, useState } from 'react'
import SugarAppForm from './SugarAppForm.js'
import './Sugar.css';
import {
  Link
} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Header from '../Header'
import Footer from '../Footer'
import { TokenContext } from '../TokenContext.js';

const SugarMealApp = () => {
  const [hiddenForm , setHiddenForm] = useState(false)
  const [existingSugarMeal , setExistingSugarMeal] = useState([])
  const [recipeId, setRecipeId] = useState(0)
  const token = useContext(TokenContext)

  const handleSugarForm = event => {
    return setHiddenForm(!hiddenForm)
  }

  const saveSugarRecipe = (entry) => {
    entry.type = "SUGAR"
    
    fetch("http://localhost:8080/api/cooking-recipes", { 
      method: 'post', 
      headers: new Headers({
        'Authorization': 'Bearer ' + {token},
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
        'Authorization': 'Bearer ' + {token}
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
        'Authorization': 'Bearer ' + {token}
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
    const newList = existingSugarMeal.filter((item) => item.id !== id)
    return setExistingSugarMeal(newList)
}

  useEffect(() => {
    getSugarRecipe()
  }, [recipeId])


    return (
      <div>
        <Header/>
        <Footer/>
        { token &&
        <div className="container marketing content-page">
        <div className="row">
          <h1 className="title-sugar">Sucré</h1>
            <button className="fa-2x sugar-button" type="button" onClick={handleSugarForm} >
              <i className="fa fa-plus-circle"></i>
            </button>
          </div>
          {hiddenForm && <SugarAppForm handleSugarForm={handleSugarForm} saveSugarRecipe={saveSugarRecipe}/>} 
          <div className="row">
            {existingSugarMeal.map((recipe, index) => {
              return (
                <div key={index} className="col-md-3 mt-4 mr-4 list-items">
                  <div className="content-item">
                    <div className="title-item"><h2>{recipe.name}</h2></div>
                  </div>
                  <button className="fa-2x delete-recipe" onClick={() => confirmDelete(recipe.id, recipe.name)}  >
                    <i className="fa fa-minus-circle"></i>
                  </button>   
                  {recipe.image !== null && recipe.image !== '' && <img className="img-item" src={recipe.image} alt="Recipe Image" width="100%"/>}  
                  <p><Link className="link-recipe" to={`details/${recipe.id}`}> <button className="btn button-item sugar-button-item">Recette</button></Link></p>
                  </div>

              )
            })}
            </div>
        </div>
        }
      </div>
    );
}

export default SugarMealApp;
