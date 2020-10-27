import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import ImageUploader from 'react-images-upload'

const SaltAppForm = ({handleSaltForm, saveRecipe, recipe}) => {

  
  const [name , setName] = useState(recipe.name)
  const [description , setDescription] = useState(recipe.description)
  const [ingredients , setIngredients] = useState(recipe.ingredients)
  const [image , setImage] = useState('')
  const unitIngredient = useState(["", "g", "kg", "ml", "cl", "dl", "l", "cuillère à café", "cuillère à soupe"])
  const [quantityPeople, setQuantityPeople] = useState(recipe.quantityPeople)

  const addInput = () => {
    const newInput = [{id: ingredients.length + 1, name: '', quantity: 0, unit: ''}]
    return setIngredients(ingredients.concat( newInput ))
  }

  const removeInput = (id) => {
    const newListInput = ingredients.filter((item) => item.id !== id)
    return setIngredients(newListInput)
  }

  const handleNameUpdate = event => {
    setName(event.target.value)
  }

  const handleQuantityPeopleUpdate = event => {
    setQuantityPeople(event.target.value)
  }

  const handleDescUpdate = event => {
    setDescription(event.target.value)
  }

  const handlePictureUpdate = (newPicture) => {

    if(newPicture.length > 0){
      let reader = new FileReader();
      reader.readAsDataURL(newPicture[0]);
      reader.onloadend = () => {
        setImage(reader.result)
      };
      
    }else{
      setImage('')
    }
  }

  const handleQuantityUpdate = event => {

    const newList = ingredients.map((item) => {
      if (item.id == event.target.id) {
        item.quantity = event.target.value
        return item;
      }
 
      return item;
    });
 
    setIngredients(newList);
  }

  const handleIngredientNameUpdate = event => {

    const newList = ingredients.map((item) => {
      if (item.id == event.target.id) {
        item.name = event.target.value 
        return item;
      }
 
      return item;
    });
 
    setIngredients(newList);
  }

  const handleUnitUpdate = event => {
    
    const newList = ingredients.map((item) => {
      if (item.id == event.target.id) {
        item.unit = event.target.value 
        return item;
      }
 
      return item;
    });
 
    setIngredients(newList);
  }



  const persistRecipe = event => {
    // Empecher le submit vers un serveur
      event.preventDefault()

      if(quantityPeople === ''){
        const newEntry = {name: name, description: description, image:image, ingredients: ingredients, quantityPeople: null}
        saveRecipe(newEntry)
      }else{
        const newEntry = {name: name, description: description, image:image, ingredients: ingredients, quantityPeople: quantityPeople}
        console.log("ENTRY : ", newEntry)
        saveRecipe(newEntry)
      }
      

      handleSaltForm()

  } 

  return (
    <div>
      <form className="details-form text-center" >
          <div className="form-group">

          <div className="row">
              <div className="col-md-8">
                <div className="row">
                    <div className="col-md-1 mt-2">
                      <label htmlFor="exampleFormControlInput1">Nom </label>
                    </div>
                    <div className="col-md-10">
                      <input type="Text" 
                        className="form-control" 
                        id="exampleFormControlInput1"
                        value ={name}
                        onChange={handleNameUpdate}/>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                <div className="row">
                <div className="col-md-3 pt-2 mr-1">
                    <p> Pour </p>
                  </div>
                  <div className="col-md-3 p-0 mr-2">
                    <input type="Text" 
                    className="form-control " 
                    id="exampleFormControlInput1"
                    value ={quantityPeople}
                    onChange={handleQuantityPeopleUpdate}/>
                  </div>
                  <div className="col-md-3 pt-2 pl-0">
                    <p> personnes.</p>
                  </div>
                </div>
              </div>
            </div>

            <label htmlFor="exampleFormControlInput1">Descriptif</label>
            <textarea type="Text" 
            className="form-control" 
            id="exampleFormControlInput1"
            value ={description}
            rows="5" 
            cols="100%"
            onChange={handleDescUpdate}/>

            <ImageUploader
                buttonText= "Modifier l'image"
                onChange={handlePictureUpdate}
                imgExtension={['.jpg', '.jpeg','.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withLabel= {false}
                withIcon= {false}
                withPreview= {true}
                className= "add-picture"
            />

            <div className="row ingredients">
              <h5>Ingrédients</h5>
                <button className="fa-2x salt-add-ingredient-button" type="button" onClick={addInput} >
                  <i className="fa fa-plus-circle"></i>
                </button>
            </div>

            {ingredients.map(nbIngredient => (
              <div key={nbIngredient.id}  className="row">

                <div className="col-sm-2">
                  <label htmlFor="exampleFormControlInput1">Quantité</label>
                  <input type="number" 
                  className="form-control" 
                  id={nbIngredient.id}
                  value= {nbIngredient.quantity}
                  onChange={handleQuantityUpdate}/>
                </div>

                <div className="col-ms-4">
                  <label htmlFor="exampleFormControlInput1">Unité</label>
                  <select  className="form-control" 
                  id={nbIngredient.id} 
                  value={nbIngredient.unit}
                  onChange={handleUnitUpdate}>
                    {unitIngredient.map((type, index) => <option key={index} value={type}>{type}</option>)}
                  </select>
                </div>

                <div className="col-md-5">
                  <label htmlFor="exampleFormControlInput1">Nom</label>
                  <input type="Text" 
                  className="form-control" 
                  id={nbIngredient.id}
                  value= {nbIngredient.name}
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
              
              <Button className="salt-button-form" onClick={persistRecipe}>Modifer la recette</Button>
              <Button variant="dark" onClick={handleSaltForm}>Annuler</Button>
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