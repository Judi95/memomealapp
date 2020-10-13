import React, { useState } from 'react'
import { Tooltip, Button, OverlayTrigger } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

const WineAppForm = ({saveWine, handleWineForm}) => {

  const [name , setName] = useState('')
  const [description , setDescription] = useState('')
  const [evaluation , setEvaluation] = useState(0)

  const handleNameUpdate = event => {
    setName(event.target.value)
  }

  const handleDescUpdate = event => {
    setDescription(event.target.value)
  }

  const handleEvaluationUpdate =(newRating) => {
    console.log(newRating);
    setEvaluation(newRating)
  }

  const persistWine = event => {
    // Empecher le submit vers un serveur
      event.preventDefault()
      const newEntry = {name: name, description: description, evaluation:evaluation}
      console.log('TEST newEntry : ', newEntry)
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

              <div className="row star-bar">
                <ReactStars
                  count={5}
                  onChange={handleEvaluationUpdate}
                  size={45}
                  fullIcon="fa fa-star"
                  activeColor="#79bd9a"
                />
              </div>

            <Button type="submit" className="wine-button-form">Ajouter</Button>
            <Button variant="secondary" onClick={handleWineForm}>Annuler</Button>
            </div>
            <div className="mb-4">
              <hr className="wine-solid"/>
            </div>
        </form>
      </div>
    
    )

}

export default WineAppForm