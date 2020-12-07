import React, {  useContext, useEffect, useState } from 'react'
import SugarAppForm from './SugarAppForm.js'
import './Sugar.css';
import {
  Link,
  Redirect
} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Header from '../Header'
import Footer from '../Footer'
import { UrlContext } from '../UrlContext';

const SugarMealApp = () => {
  const [hiddenForm , setHiddenForm] = useState(false)
  const [existingSugarMeal , setExistingSugarMeal] = useState([])
  const token = localStorage.getItem('tokenSession')
  const url = useContext(UrlContext)
  const [isSessionTimeOut, setIsSessionTimeOut] = useState(false)

  const handleSugarForm = event => {
    return setHiddenForm(!hiddenForm)
  }

  const saveSugarRecipe = (entry) => {
    entry.type = "SUGAR"
    
    fetch(url + "/cooking-recipes", { 
      method: 'post', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(entry)
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.status === 401){
          localStorage.clear();
          setIsSessionTimeOut(true)
        }
        setExistingSugarMeal(existingSugarMeal.concat( result ))
      },
      (error) => {
        console.log(error)
      }
    )

  }

  
  const getSugarRecipe = () => {
    fetch(url + "/cooking-recipe?type=SUGAR", { 
      method: 'get', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.status === 401){
          localStorage.clear();
          setIsSessionTimeOut(true)
        }
        if(result.length > 0){
          setExistingSugarMeal(existingSugarMeal.concat( result ))
        }else{
          console.log("Error : " + result)
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

    fetch(url + `/cooking-recipes/${id}`, { 
      method: 'delete', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`
      })
    })
    .then(
      (result) => {
        if(result.status === 401){
          localStorage.clear();
          setIsSessionTimeOut(true)
        }
      },
      (error) => {
        console.log(error)
      }
    )
    const newList = existingSugarMeal.filter((item) => item.id !== id)
    return setExistingSugarMeal(newList)
}

  useEffect(() => {
    getSugarRecipe()
  }, [])


    return (
      <div>
        {isSessionTimeOut && <Redirect to ="/"/>}
        <Header/>
        <Footer/>
        { token &&
        <div className="container marketing content-page">
          <div className="row">
            <h1 className="title-sugar mb-3">Sucré</h1>
            <button className="sugar-button" type="button" onClick={handleSugarForm} >
              <i className="fa fa-plus-circle"></i>
            </button>
          </div>
          {existingSugarMeal.length < 1 && <h2 className="text-center font-weight-light font-italic mt-2">Ajoutez votre première recette sucrée !</h2>}
          {hiddenForm && <SugarAppForm handleSugarForm={handleSugarForm} saveSugarRecipe={saveSugarRecipe}/>} 
          <div className="row">
            {existingSugarMeal.map((recipe, index) => {
              return (
                <div key={index} className="col-md-3 mt-4 mr-4 ml-5 list-items">
                  <div className="content-item">
                    <div className="title-item"><h2>{recipe.name}</h2></div>
                  </div>
                  <button className="delete-recipe" onClick={() => confirmDelete(recipe.id, recipe.name)}  >
                    <i className="fa fa-minus-circle"></i>
                  </button>   
                  {recipe.image !== null && recipe.image !== '' && <img className="img-item" src={recipe.image} alt="recipe" width="100%"/>}  
                  <p><Link className=" nav-link link-recipe" to={`details/${recipe.id}`}> <button className="btn button-item sugar-button-item">Recette</button></Link></p>
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
