import React, { Component } from 'react'
import Wine from './Wine.js'
import './Wine.css';
import WineAppForm from './WineAppForm'

class WineApp extends Component {
  state = {hiddenForm: false}

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
        {this.state.hiddenForm && <WineAppForm handleWineForm = {this.handleWineForm}/>} 
          <div className="row">
            <Wine title="Bordeau" indice="1" />
            <Wine title="Chardonay" indice="5" />
            <Wine title="Côte du Rhone" indice="3" />
            <Wine title="Jurançon" indice="4" />
            <Wine title="Beaujolais" indice="0" />
            </div>
        </div>
      </div>
    );
  }

}


export default WineApp;
