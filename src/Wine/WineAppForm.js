import React, { Component } from 'react'
import { Tooltip, Button, OverlayTrigger } from 'react-bootstrap';
import { saveWine } from './WineApp'

class WineAppForm extends Component {

  state = {title: '', desc: ''}

  handleTitleUpdate = event => {
    this.setState({title: event.target.value})
  }

  persistWine = event => {
    // Empecher le submit vers un serveur
      event.preventDefault()
      const newEntry = {title: this.state.title}
      saveWine(newEntry)
  }

  render() {
    return (
      <div>
        <form className="highScoreInput" onSubmit={this.persistWine}>
            <div className="form-group">

              <label htmlFor="exampleFormControlInput1">Nom</label>
              <input type="Text" 
              className="form-control" 
              id="exampleFormControlInput1"
              value ={this.state.title}
              onChange={this.handleTitleUpdate}/>

              <label htmlFor="exampleFormControlInput1">Descriptif</label>
              <textarea type="" className="form-control" id="exampleFormControlInput1"/>
              <div className="row star-bar">
                {['1', '2', '3', '4', '5'].map((note) => (
                  <OverlayTrigger
                    key={note}
                    note={note}
                    overlay={
                      <Tooltip id={`tooltip-top`}>
                        <strong>{note}</strong>/5
                      </Tooltip>
                    }
                  >
                    <i key={note} className="fa fa-star fa-2x star-wine"></i>
                  </OverlayTrigger>
                ))}
            </div>

            <Button type="submit" className="wine-button-form">Ajouter</Button>
            </div>
        </form>
      </div>
    
    )}

}

export default WineAppForm