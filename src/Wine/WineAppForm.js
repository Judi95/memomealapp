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
      maxWidthOrHeight: 1920,
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
      console.log(error);
    }
   
  }

  const handlePictureUpdate = (newPicture) => {

    if(newPicture.length > 0){

      handleImageUpload(newPicture[0])
      //let test = resizeImageFn(newPicture[0]);

      /*let reader = new FileReader();
      reader.readAsDataURL(newPicture[0]);
      reader.onloadend = () => {
        setImage(reader.result)
      };*/
      
    }else{
      setImage('')
    }
  }

  /*async function resizeImageFn(file) {

    const resizedImage = await compress.compress([file], {
      size: 15*1024*1024, // the max size in MB, defaults to 2MB
      quality: 1, // the quality of the image, max is 1,
      maxWidth: 1920, // the max width of the output image, defaults to 1920px
      maxHeight: 1920, // the max height of the output image, defaults to 1920px
      resize: false // defaults to true, set false if you do not want to resize the image width and height
    })
    const img = resizedImage[0];
    const base64str = img.data
    const imgExt = img.ext
    const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt)
    let reader = new FileReader();
      reader.readAsDataURL(resizedFiile);
      reader.onloadend = () => {
        setImage(reader.result)
      };
    return resizedFiile;
  }*/

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
                    activeColor="#79bd9a"
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