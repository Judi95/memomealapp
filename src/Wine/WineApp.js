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
  
  saveWine = (entry) => {
    entry.id = this.state.existingWine.length + 1

    this.setState({
      hiddenForm: !this.state.hiddenForm,
      existingWine: this.state.existingWine.concat( entry )
    });
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
          {this.state.hiddenForm && <WineAppForm saveWine={this.saveWine} />}
          <div className="row">
            {this.state.existingWine.map ((wine) =>  <Wine key={wine.id} name={wine.name}  description={wine.description} evaluation={wine.evaluation} />)}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount(){
    fetch("http://localhost:8080/api/wines", { 
      method: 'get', 
      headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwMjg1ODIzNn0.XnjVeerhnlogvHu4Lg_aKP_EqCPn-v6u1UeIAHfIioI8T-ShlHA9FopTq9oduPUd1GQJOmtfe0IsGTsLp43B1Q'
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
          if(result.length > 0){
            console.log(result)
            this.setState({
              existingWine: this.state.existingWine.concat( result )
            });
          }
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