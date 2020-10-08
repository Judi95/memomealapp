import React, { Component } from 'react'
import Wine from './Wine.js'
import './Wine.css';
import WineAppForm from './WineAppForm'
import PropTypes, { func } from 'prop-types'
import { Tooltip, Button, OverlayTrigger } from 'react-bootstrap';
 
class WineApp extends Component {

  state = {
    hiddenForm: false, 
    existingWine: []
  }

  handleWineForm = event => {
    this.setState({hiddenForm: !this.state.hiddenForm })
  }
  
  render() {
    return (

      <div>
        <div className="container marketing">
          <div className="row">
            <h1 className="title-win">Vin</h1> 
            <button className="fa-2x wine-button" type="button" onClick={this.handleWineForm} >
              <i className="fa fa-plus-circle"></i>
            </button>
          </div>
          {this.state.hiddenForm && <WineAppForm/>}
          <div className="row">
            {this.state.existingWine.map ((wine) =>  <Wine title={wine.name} key={wine.id} indice={wine.evaluation} />)}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount(){
    fetch("http://localhost:8080/api/wines", { 
      method: 'get', 
      headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwMjI0ODc4Mn0.akhGpH0FmaTC3CdbdXYBZDjuGofMEaVLKgLwDy0ZUijuGqffi6vCDkXU7ocM2SCKV0tGbJJpwrVE_Mh4jfi6Mg'
      })
    })
    .then(res => res.json()
    )
    .then(
      (result) => {
          console.log(result)
        this.setState({
          isLoaded: true,
          existingWine: this.state.existingWine.concat( result )
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
  
}

WineApp.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      comment: PropTypes.string
    })
  ).isRequired,
  
}

export default WineApp;

export function saveWine(entry, onStored) {
  //const lastId = this.existingWine.length;

  //this.state.existingWine = this.state.existingWine.concat( { id: lastId+1, title: entry.title, indice: 5 })

}
