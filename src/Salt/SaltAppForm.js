import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

const SaltAppForm = ({handleSaltForm, saveSaltRecipe}) => {

  
  const [name , setName] = useState('')
  const [description , setDescription] = useState('')
  const [inputIngredient , setInputIngredient] = useState([])

  const addInput = () => {
    const newInput = [{id: inputIngredient.length + 1, ingredientName: '', quantity: 0}]
    return setInputIngredient(inputIngredient.concat( newInput ))
  }

  const removeInput = (id) => {
    const newListInput = inputIngredient.filter((item) => item.id !== id)
    return setInputIngredient(newListInput)
  }

  const handleNameUpdate = event => {
    setName(event.target.value)
  }

  const handleDescUpdate = event => {
    setDescription(event.target.value)
  }

  const handleQuantityUpdate = event => {

    const newList = inputIngredient.map((item) => {
      if (item.id == event.target.id) {
        item.quantity = event.target.value
        return item;
      }
 
      return item;
    });
 
    setInputIngredient(newList);
    console.log("APRES : ", inputIngredient)
  }

  const handleIngredientNameUpdate = event => {

    const newList = inputIngredient.map((item) => {
      if (item.id == event.target.id) {
        item.ingredientName = event.target.value 
        return item;
      }
 
      return item;
    });
 
    setInputIngredient(newList);
    console.log("APRES : ", inputIngredient)
  }


  const persistSaltRecipe = event => {
    // Empecher le submit vers un serveur
      event.preventDefault()
      const newEntry = {name: name, description: description, ingredients: inputIngredient}
      handleSaltForm()
      saveSaltRecipe(newEntry)
  } 

    return (
      <div>
        <form className="salt-form" >
            <div className="form-group">

              <label htmlFor="exampleFormControlInput1">Nom</label>
              <input type="Text" 
              className="form-control" 
              id="exampleFormControlInput1"
              value ={name}
              onChange={handleNameUpdate}/>

              <label htmlFor="exampleFormControlInput1">Descriptif</label>
              <textarea type="" 
              className="form-control" 
              id="exampleFormControlInput1"
              value ={description}
              onChange={handleDescUpdate}/>


              <div className="row ingredients">
                <h5>Ingrédients</h5>
                  <button className="fa-2x salt-add-ingredient-button" type="button" onClick={addInput} >
                    <i className="fa fa-plus-circle"></i>
                  </button>
              </div>

              {inputIngredient.map(nbIngredient => (
                <div key={nbIngredient.id}  className="row">

                  <div className="col-md-2">
                    <label htmlFor="exampleFormControlInput1">Quantité</label>
                    <input type="number" 
                    className="form-control" 
                    id={nbIngredient.id}
                    onChange={handleQuantityUpdate}/>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="exampleFormControlInput1">Name</label>
                    <input type="Text" 
                    className="form-control" 
                    id={nbIngredient.id}
                    onChange={handleIngredientNameUpdate}/>
                  </div>

                  <div className="col-md-2">
                    <button className="fa-2x salt-remove-ingredient-button" type="button" onClick={() => removeInput(nbIngredient.id)} >
                      <i className="fa fa-minus-circle"></i>
                    </button>
                  </div>

                </div>
              ))}
              
              <div className="btn-group-form">
                
                <Button className="salt-button-form" onClick={persistSaltRecipe}>Ajouter la recette</Button>
                <Button variant="secondary" onClick={handleSaltForm}>Annuler</Button>
              </div>
              
            </div>
            <div className="mb-4">
              <hr className="salt-solid"/>
            </div>
        </form>
      </div>
    )
  }


export default SaltAppForm