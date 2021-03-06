import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import ImageUploader from 'react-images-upload'
import imageCompression from 'browser-image-compression';

const WineAppForm = ({saveWine, handleWineForm}) => {

  const [name , setName] = useState('')
  const [description , setDescription] = useState('')
  const [evaluation , setEvaluation] = useState(0)
  const [image , setImage] = useState('')
  const [wineType, setWineType] = useState(["Rosé", "Blanc", "Rouge", "Jaune"])
  const [type , setType] = useState(wineType[0])
  const Compress = require('compress.js')
  const compress = new Compress()
  
  

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

  const persistWine = event => {
    // Empecher le submit vers un serveur
      event.preventDefault()
      const newEntry = {name: name, description: description, evaluation:evaluation, type: type, imageContent: image}
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
                    activeColor="#F7BA53"
                  />
                </div>
              </div>

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

              <div className="btn-group-form text-right">
                  <Button type="submit" className="wine-button-form">Ajouter</Button>
                  <Button variant="dark" onClick={handleWineForm}>Annuler</Button>
              </div>
            
            </div>
            <div className="mb-4">
              <hr className="wine-solid"/>
            </div>
        </form>
      </div>
    
    )

}

export default WineAppForm