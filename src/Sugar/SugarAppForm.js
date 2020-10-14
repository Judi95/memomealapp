import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import ImageUploader from 'react-images-upload'

const SugarAppForm = ({handleSugarForm, saveSugarRecipe}) => {

  
  const [name , setName] = useState('')
  const [description , setDescription] = useState('')
  const [ingredients , setIngredients] = useState([])
  const [image , setImage] = useState('')
  const [unitIngredient , setIUnitngredients] = useState(["", "g", "kg", "ml", "cl", "dl", "l", "cuillère à café", "cuillère à soupe"])

  const addInput = () => {
    const newInput = [{id: ingredients.length + 1, name: '', quantity: 0}]
    return setIngredients(ingredients.concat( newInput ))
  }

  const removeInput = (id) => {
    const newListInput = ingredients.filter((item) => item.id !== id)
    return setIngredients(newListInput)
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

  const handleNameUpdate = event => {
    setName(event.target.value)
  }

  const handleDescUpdate = event => {
    setDescription(event.target.value)
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


  const persistSugarRecipe = event => {
    // Empecher le submit vers un serveur
      event.preventDefault()
      const newEntry = {name: name, description: description, ingredients: ingredients, image: image}
      handleSugarForm()
      saveSugarRecipe(newEntry)
  } 

  return (
    <div>
      <form className="sugar-form" >
          <div className="form-group">

            <label htmlFor="exampleFormControlInput1">Nom</label>
            <input type="Text" 
            className="form-control" 
            id="exampleFormControlInput1"
            value ={name}
            onChange={handleNameUpdate}/>

            <label htmlFor="exampleFormControlInput1">Descriptif</label>
            <textarea type="Text" 
            className="form-control" 
            id="exampleFormControlInput1"
            value ={description}
            onChange={handleDescUpdate}/>

            <ImageUploader
                buttonText='Ajouter une image'
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
                <button className="fa-2x sugar-add-ingredient-button" type="button" onClick={addInput} >
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
                  onChange={handleQuantityUpdate}/>
                </div>

                <div className="col-md-4">
                  <label htmlFor="exampleFormControlInput1">Unité</label>
                  <select  className="form-control" onChange={handleUnitUpdate}>
                    {unitIngredient.map((type, index) => <option key={index} value={type}>{type}</option>)}
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="exampleFormControlInput1">Name</label>
                  <input type="Text" 
                  className="form-control" 
                  id={nbIngredient.id}
                  onChange={handleIngredientNameUpdate}/>
                </div>

                <div className="col-md-2">
                  <button className="fa-2x sugar-remove-ingredient-button" type="button" onClick={() => removeInput(nbIngredient.id)} >
                    <i className="fa fa-minus-circle"></i>
                  </button>
                </div>

              </div>
            ))}
            
            <div className="btn-group-form">
              
              <Button className="sugar-button-form" onClick={persistSugarRecipe}>Ajouter la recette</Button>
              <Button variant="secondary" onClick={handleSugarForm}>Annuler</Button>
            </div>
            
          </div>
          <div className="mb-4">
            <hr className="sugar-solid"/>
          </div>
      </form>
    </div>
  )
}


export default SugarAppForm