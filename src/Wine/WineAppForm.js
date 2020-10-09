import React, { Component, useState } from 'react'
import { Tooltip, Button, OverlayTrigger } from 'react-bootstrap';

const WineAppForm = ({saveWine}) => {

  const [name , setName] = useState('')
  const [description , setDescription] = useState('')
  const [evaluation , setEvaluation] = useState(0)

  const handleNameUpdate = event => {
    setName(event.target.value)
  }

  const handleDescUpdate = event => {
    setDescription(event.target.value)
  }

  const handleEvaluationUpdate = event => {
    setEvaluation(event.target.value)
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

              <div className="row star-bar form-star">
                {[1,2, 3, 4, 5].map((note) => (
                  <OverlayTrigger
                    key={note}
                    note={note}
                    overlay={
                      <Tooltip id={`tooltip-top`}>
                        <strong>{note}</strong>/5
                      </Tooltip>
                    }
                  >
                    
                  
                    <input type="radio" className="fa fa-star fa-2x star-wine-add" value={note} onChange={handleEvaluationUpdate}></input>
                  </OverlayTrigger>
                ))}
            </div>

            <Button type="submit" className="wine-button-form">Ajouter</Button>
            </div>
        </form>
      </div>
    
    )

}

export default WineAppForm