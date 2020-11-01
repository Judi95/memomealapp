import React, { useContext, useEffect, useState } from 'react'
import SaltAppForm from './SaltAppForm.js'
import './Salt.css';
import {
  Link,
  Redirect
} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Header from '../Header'
import Footer from '../Footer'
import { UrlContext } from '../UrlContext';

const SaltMealApp = () => {
  const [hiddenForm , setHiddenForm] = useState(false)
  const [existingSaltMeal , setExistingSaltMeal] = useState([])
  const token = localStorage.getItem('tokenSession')
  const [isSessionTimeOut, setIsSessionTimeOut] = useState(false)
  const url = useContext(UrlContext)

  const handleSaltForm = event => {
    return setHiddenForm(!hiddenForm)
  }

  const saveSaltRecipe = (entry) => {
    entry.type = "SALT"
    
    fetch(url + "api/cooking-recipes", { 
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
        } if( ! result.status){
          setExistingSaltMeal(existingSaltMeal.concat( result ))
        }
        
      },
      (error) => {
        console.log(error)
      }
    )

  }

  
  const getSaltRecipe = () => {


    fetch(url + "api/cooking-recipe?type=SALT", { 
      method: 'get', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
          if(result.status === 401){
            console.log(result)
            localStorage.clear();
            setIsSessionTimeOut(true)
          }
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
    
    fetch(url + `api/cooking-recipes/${id}`, { 
      method: 'delete', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
      })
    })
    .then(
      (result) => {
        if(result.status === 401){
          localStorage.clear();
          setIsSessionTimeOut(true)
        }if(result.status === 204){
          const newList = existingSaltMeal.filter((item) => item.id !== id)
          setExistingSaltMeal(newList)
        }else{
          console.log("KO : " ,result)
        }
        
      },
      (error) => {
        console.log(error)
      }
    ) 
  }

  useEffect(() => {
    getSaltRecipe()
  }, [])


    return (
      
      <div>
        <Header/>
        <Footer/>
        {isSessionTimeOut && <Redirect to ="/"/>}
        {token &&
        <div className="container marketing content-page">
        <div className="row">
          <h1 className="title-salt mb-3">Salé</h1>
            <button className="salt-button" type="button" onClick={handleSaltForm} >
              <i className="fa fa-plus-circle"></i>
            </button>
          </div>
          {existingSaltMeal.length < 1 && <h2 className="text-center font-weight-light font-italic mt-2">Ajoutez votre première recette salée !</h2>}
          {hiddenForm && <SaltAppForm handleSaltForm={handleSaltForm} saveSaltRecipe={saveSaltRecipe}/>} 
          <div className="row">
            {existingSaltMeal.map((recipe, index) => {
              return(
                <div key={index} className="col-md-3 mt-4 mr-4 ml-5 list-items">
                  <div className="content-item">
                    <div className="title-item"><h2>{recipe.name}</h2></div>
                  </div>
                  <button className="delete-recipe" onClick={() => confirmDelete(recipe.id, recipe.name)}  >
                    <i className="fa fa-minus-circle"></i>
                  </button>
                    {recipe.image !== null && recipe.image !== "" &&<image className="img-item" src={recipe.image} alt="recipe" width="100%"/>}
                  <Link to={`details/${recipe.id}`}> <button className="btn button-item salt-button-item">Recette</button></Link>
                </div>)
            })
          }
            </div>
        </div>
        }
      </div>
    );
}

export default SaltMealApp;
