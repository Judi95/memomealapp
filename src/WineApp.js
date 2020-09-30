import React, { Component } from 'react'
import Wine from './Wine.js'
import WineAppForm from './WineAppForm'

class WineApp extends Component {
  state = {hiddenForm: false}

  handleWineForm = event => {
    this.setState({hiddenForm: !this.state.hiddenForm })
  }

  
render() {
  return (
    <div>
      <div class="container marketing">
      <h1 class="title-win">Vin</h1> 
      <i class="fas fa-plus-circle"></i>
      <button class="favorite styled" type="button" onClick={this.handleWineForm} >
          +
      </button>
      {this.state.hiddenForm && <WineAppForm handleWineForm = {this.handleWineForm}/>} 
        <div class="row">
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
