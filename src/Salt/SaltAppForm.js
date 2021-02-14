import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import ImageUploader from 'react-images-upload'
import imageCompression from 'browser-image-compression';

const SaltAppForm = ({handleSaltForm, saveSaltRecipe}) => {

  
  const [name , setName] = useState('')
  const [description , setDescription] = useState('')
  const [image , setImage] = useState('')
  const [ingredients , setIngredients] = useState([])
  const [unitIngredient] = useState(["", "g", "kg", "ml", "cl", "dl", "l", "cuillère à café", "cuillère à soupe", "pincée"])
  const [quantityPeople, setQuantityPeople] = useState('')

  const addInput = () => {
    const newInput = [{index: ingredients.length + 1, name: '', quantity: 0, unit: ''}]
    return setIngredients(ingredients.concat( newInput ))
  }

  const removeInput = (index) => {
    const newListInput = ingredients.filter((item) => item.index !== index)
    return setIngredients(newListInput)
  }

  const handleNameUpdate = event => {
    setName(event.target.value)
  }

  const handleQuantityPeopleUpdate = event => {
    setQuantityPeople(event.target.value)
  }

  async function handleImageUpload(imageFile) {
 
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
   
    const options = {
      maxWidthOrHeight: 980,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
   
      let reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        setImage(reader.result)
      };
      
    } catch (error) {
      console.log("ERROR compressing picture : " + error);
    }
  }

  const handlePictureUpdate = (newPicture) => {
    if(newPicture.length > 0){
      handleImageUpload(newPicture[0]) 
    }else{
      setImage('')
    }
  }

  const handleDescUpdate = event => {
    setDescription(event.target.value)
  }

  const handleQuantityUpdate = event => {

    const newList = ingredients.map((item) => {
      if (item.index == event.target.id) {
        item.quantity = event.target.value
        return item;
      }
 
      return item;
    });
 
    setIngredients(newList);
  }

  const handleIngredientNameUpdate = event => {

    const newList = ingredients.map((item) => {
      if (item.index == event.target.id) {
        item.name = event.target.value 
        return item;
      }
 
      return item;
    });
 
    setIngredients(newList);
  }

  const handleUnitUpdate = event => {
    
    const newList = ingredients.map((item) => {
      if (item.index == event.target.id) {
        item.unit = event.target.value 
        return item;
      }
 
      return item;
    });
 
    setIngredients(newList);
  }



  const persistSaltRecipe = event => {
    // Empecher le submit vers un serveur
      event.preventDefault()
      
      if(quantityPeople === ''){
        const newEntry = {name: name, description: description, ingredients: ingredients, imageContent: image, quantityPeople: null}
        saveSaltRecipe(newEntry)
      }else{
        const newEntry = {name: name, description: description, ingredients: ingredients, imageContent: image, quantityPeople: quantityPeople}
        saveSaltRecipe(newEntry)
      }
      
      handleSaltForm()

  } 

  return (
    <div>
      <form className="salt-form" >
        <div className="form-group">

          <div className="row">
              <div className="col-md-8">
                <div className="row">
                    <div className="col-md-1">
                      <label htmlFor="name">Nom </label>
                    </div>
                    <div className="col-md-10">
                      <input type="Text" 
                        className="form-control" 
                        id="name"
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
                    <input type="number" min="1"
                    className="form-control " 
                    id="quantityPeople"
                    value ={quantityPeople}
                    onChange={handleQuantityPeopleUpdate}/>
                  </div>
                  <div className="col-md-3 pt-2 pl-0">
                    <p> personnes.</p>
                  </div>
                </div>
              </div>
            </div>

            <label htmlFor="description">Descriptif</label>
            <textarea type="Text" 
            className="form-control" 
            id="description"
            value ={description}
            rows="5" 
            cols="100%"
            onChange={handleDescUpdate}/>

            <ImageUploader
                buttonText='Ajouter une image'
                onChange={handlePictureUpdate}
                imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
                maxFileSize={15*1024*1024} // 15Mo
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
                  <label htmlFor="quantity">Quantité</label>
                  <input type="number" min="0"
                  className="form-control" 
                  id={nbIngredient.index}
                  onChange={handleQuantityUpdate}/>
                </div>

                <div className="col-ms-4">
                  <label htmlFor="unity">Unité</label>
                  <select  className="form-control" 
                  id={nbIngredient.index} 
                  onChange={handleUnitUpdate}>
                    {unitIngredient.map((type, index) => <option key={index} value={type}>{type}</option>)}
                  </select>
                </div>

                <div className="col-md-5">
                  <label htmlFor="nameIngredient">Nom</label>
                  <input type="Text" 
                  className="form-control" 
                  id={nbIngredient.index}
                  onChange={handleIngredientNameUpdate}/>
                </div>

                <div className="col-md-2">
                  <button className="fa-2x salt-remove-ingredient-button" type="button" onClick={() => removeInput(nbIngredient.id)} >
                    <i className="fa fa-minus-circle"></i>
                  </button>
                </div>

              </div>
            ))}
            
            <div className="btn-group-form text-right">
              <Button className="salt-button-form" onClick={persistSaltRecipe}>Ajouter la recette</Button>
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