import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Header from '../Header'
import Footer from '../Footer'
import './Details.css'
import {
  Redirect
} from "react-router-dom"
import DetailsAppForm from './DetailsAppForm'
import { UrlContext } from '../UrlContext';


const Details = () => {

    const [param, setParma] = useState(useParams())
    const [countRecipe, setCountRecipe] = useState(0)
    const [recipe, setRecipe] = useState({name: '', description: '', quantityPeople: '', ingredients: []})
    const token = localStorage.getItem('tokenSession')
    const [isSessionTimeOut, setIsSessionTimeOut] = useState(false)
    const [quantityPeopleValue, setQuantityPeopleValue] = useState('')
    const [quantityPeopleInit, setQuantityPeopleInit] = useState('')
    const [isModify, setIsModify] = useState(false)
    const url = useContext(UrlContext)

    const getOneRecipe = () => {
        fetch( url + `api/cooking-recipes/${param.id}`, { 
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
            setRecipe(result)
            setQuantityPeopleValue(result.quantityPeople)
            setQuantityPeopleInit(result.quantityPeople)
          },
          (error) => {
            console.log(error)
          }
        )
    }

    useEffect(() => {
      getOneRecipe()
    }, [countRecipe])

    const calculationQuantity = (ingrQuantity) => {
        if(quantityPeopleInit){
          let quantity =  parseFloat(ingrQuantity) * parseFloat(quantityPeopleValue) / parseFloat(quantityPeopleInit)
          return parseFloat(quantity).toFixed(2)
        }else{
          return parseFloat(ingrQuantity)
        }
    }

    const handleSaltForm = event => {
      return setIsModify(!isModify)
    }

    const saveRecipe = (entry) => {
      entry.type = recipe.type
      entry.id = recipe.id
      
      fetch( url + "api/cooking-recipes", { 
        method: 'put', 
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
            setRecipe(result)
            setQuantityPeopleValue(result.quantityPeople)
            setQuantityPeopleInit(result.quantityPeople)
          }
          console.log(result)
        },
        (error) => {
          console.log(error)
        }
      )
  
    }

    return (
        <div>
          <Header/>
          <Footer/>
          {isSessionTimeOut && <Redirect to ="/"/>}
          {token && !isModify &&
            <div className="container marketing content-details">

                <div className="row">
                  <div className="col-md-8">
                    <h1 className="title-sugar">{recipe.name}</h1>
                  </div>
                  <div className="col-md-4">
                    <button className="btn my-2 my-sm-0 mr-4 btn-dark btn-sm" type="button" onClick={() => setIsModify(true)}> Modifier </button>
                  </div>
                </div>

                <div className="col-lg-12 mt-5">
                  {recipe.quantityPeople && 
                    <div className="row">
                      <p className="font-italic">Pour {quantityPeopleValue} personnes.</p>
                      <i className="fa fa-plus ml-3 pt-1 clic-cursor" onClick={() => setQuantityPeopleValue(parseInt(quantityPeopleValue) + 1)}></i>
                      <i className="fa fa-minus ml-3 pt-1 clic-cursor" onClick={() => setQuantityPeopleValue(parseInt(quantityPeopleValue) - 1)}></i>
                    </div>
                  }
                  {recipe.image !== null && recipe.image !== "" ?
                    <div className="row">
                      <div className="col-md-8">
                        <p className="description text-justify">{recipe.description}</p>
                      </div>
                      <div className="col-md-4">
                        <img className="img-details" src={recipe.image} alt="Recipe Image" width="100%"/>
                      </div>
                    </div>
                  : 
                    <div className="row">
                      <div className="col-md-12">
                        <p className="description text-justify">{recipe.description}</p>
                      </div>
                    </div>
                  }
                </div>
                <ul className="list-group list-group-flush">
                    {typeof recipe.ingredients != 'undefined' && recipe.ingredients !== null && recipe.ingredients.length > 0 &&
                        recipe.ingredients.filter((item) => item.name !== "").map((ing, index) =>
                         <li key={index} className="list-group-item">{ing.quantity > 0 && calculationQuantity(ing.quantity)} {ing.unit} {ing.name}</li>)
                    }
                </ul>
              </div>
            }
            { token && isModify && <DetailsAppForm handleSaltForm={handleSaltForm} saveRecipe={saveRecipe} recipe={recipe}/>}
        </div>
    )
}

export default Details;
