import React, { Component, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

const ingredients = [
    {number: 1, type: 'Fromage'},
    {number: 12, type: 'carottes'},
    {number: 5, type: 'Fraise'}
  ];
  

const Details = () => {

    const [param, setParma] = useState(useParams())
    const [countRecipe, setCountRecipe] = useState(0)
    const [recipe, setRecipe] = useState({name: '', description: '', ingredients: []})

    const getOneRecipe = () => {
        fetch(`http://localhost:8080/api/cooking-recipes/${param.id}`, { 
          method: 'get', 
          headers: new Headers({
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwMjg1ODIzNn0.XnjVeerhnlogvHu4Lg_aKP_EqCPn-v6u1UeIAHfIioI8T-ShlHA9FopTq9oduPUd1GQJOmtfe0IsGTsLp43B1Q'
          })
        })
        .then(res => res.json())
        .then(
          (result) => {
            setRecipe(result)
            console.log(result)
          },
          (error) => {
            console.log(error)
          }
        )
      }
    
      useEffect(() => {
        getOneRecipe()
      }, [countRecipe])

    return (
        <div>
            <div className="container marketing">
                <h1 className="title-sugar">{recipe.name}</h1>
                <div className="col-lg-12 mt-5">
                <p className="description">{recipe.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    {typeof recipe.ingredients != 'undefined' && recipe.ingredients !== null && recipe.ingredients.length > 0 && 
                        recipe.ingredients.map((ing, index) => <li key={index} className="list-group-item">{ing.quantity} {ing.unit} {ing.name}</li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default Details;

