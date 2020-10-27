import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import ImageUploader from 'react-images-upload'

const WineAppForm = ({saveWine, handleWineForm}) => {

  const [name , setName] = useState('')
  const [description , setDescription] = useState('')
  const [evaluation , setEvaluation] = useState(0)
  const [image , setImage] = useState('')
  const wineType = useState(["Rosé", "Blanc", "Rouge", "Jaune"])
  const [type , setType] = useState(wineType[0])
  

  const handleNameUpdate = event => {
    setName(event.target.value)
  }

  const handleTypeUpdate = event => {
    setType(event.target.value)
  }

  const handleDescUpdate = event => {
    setDescription(event.target.value)
  }

  const handleEvaluationUpdate =(newRating) => {
    setEvaluation(newRating)
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

  const persistWine = event => {
    // Empecher le submit vers un serveur
      event.preventDefault()
      const newEntry = {name: name, description: description, evaluation:evaluation, type: type, image: image}
      saveWine(newEntry)
  } 

    return (
      <div>
        <form className="highScoreInput" onSubmit={persistWine}>
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

              <div className="row">
                <div className="col-md-3 mt-3">
                  <select  className="form-control" onChange={handleTypeUpdate}>
                    {wineType.map((type, index) => <option key={index} value={type}>{type}</option>)}
                  </select>
                </div>
                <div className=" col-md-6 star-bar">
                  <ReactStars
                    count={5}
                    onChange={handleEvaluationUpdate}
                    size={45}
                    fullIcon="fa fa-star"
                    activeColor="#79bd9a"
                  />
                </div>
              </div>

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

            <Button type="submit" className="wine-button-form">Ajouter</Button>
            <Button variant="dark" onClick={handleWineForm}>Annuler</Button>
            </div>
            <div className="mb-4">
              <hr className="wine-solid"/>
            </div>
        </form>
      </div>
    
    )

}

export default WineAppForm