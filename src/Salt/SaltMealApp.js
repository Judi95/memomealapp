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
import RiseLoader from "react-spinners/RiseLoader";

const SaltMealApp = () => {
  const [hiddenForm , setHiddenForm] = useState(false)
  const [existingSaltMeal , setExistingSaltMeal] = useState([])
  const token = localStorage.getItem('tokenSession')
  const [isSessionTimeOut, setIsSessionTimeOut] = useState(false)
  const url = useContext(UrlContext)
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

  const handleSaltForm = event => {
    return setHiddenForm(!hiddenForm)
  }

  const saveSaltRecipe = (entry) => {
    entry.type = "SALT"

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
        } if( ! result.status){
          setExistingSaltMeal(existingSaltMeal.concat( result ))
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

  
  const getSaltRecipe = () => {

    fetch(url + "/cooking-recipe?type=SALT", { 
      method: 'get', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`
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
            setExistingSaltMeal(existingSaltMeal.concat( result ))
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
          console.log("Error : " ,result)
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
        <RiseLoader
          css={override}
          size={100}
          color={"#490A3D"}
          loading={isLoading}
        />

        {isSessionTimeOut && <Redirect to ="/"/>}
        {token &&
        <div id="content-page-id" className="container marketing content-page">
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
                  <Link to={`details/${recipe.id}`}> <button className="btn button-item salt-button-item">Voir la recette</button></Link>
                  <button className="delete-recipe" onClick={() => confirmDelete(recipe.id, recipe.name)}  >
                    <i className="fa fa-minus-circle"></i>
                  </button>
                    {recipe.picture !== null && <img className="img-item" src={`${url}/picture/${recipe.picture.name}`} alt="recipe" width="100%"/>}
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
