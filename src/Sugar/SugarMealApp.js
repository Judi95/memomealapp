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
import { UrlContext } from '../UrlContext'
import RiseLoader from "react-spinners/RiseLoader";

const SugarMealApp = () => {
  const [hiddenForm , setHiddenForm] = useState(false)
  const [existingSugarMeal , setExistingSugarMeal] = useState([])
  const token = localStorage.getItem('tokenSession')
  const url = useContext(UrlContext)
  const [isSessionTimeOut, setIsSessionTimeOut] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
  z-index: 10000;
  position: absolute;
  left: 30%;
  top: 30%;
`;

  const handleSugarForm = event => {
    return setHiddenForm(!hiddenForm)
  }

  const saveSugarRecipe = (entry) => {
    entry.type = "SUGAR"

    document.getElementById("content-page-id")
    .setAttribute("style", "filter: blur(5px);");
    setIsLoading(true)
    
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
        }else  if( ! result.status){
          setExistingSugarMeal(existingSugarMeal.concat( result ))
        }
        setIsLoading(false)
        document.getElementById("content-page-id")
        .setAttribute("style", "");
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
        } if (result.status) {
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
        <RiseLoader
          css={override}
          size={100}
          color={"#490A3D"}
          loading={isLoading}
        />
        
        { token &&
        <div id="content-page-id" className="container marketing content-page">
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
                  <Link className=" nav-link link-recipe" to={`details/${recipe.id}`}> <button className="btn button-item sugar-button-item">Voir la recette</button></Link>
                  <button className="delete-recipe" onClick={() => confirmDelete(recipe.id, recipe.name)}  >
                    <i className="fa fa-minus-circle"></i>
                  </button>   
                  {recipe.picture !== null && <img className="img-item" src={`${url}/picture/${recipe.picture.name}`} alt="recipe" width="100%"/>}  
                  
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
