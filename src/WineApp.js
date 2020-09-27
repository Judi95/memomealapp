import React from 'react'
import Wine from './Wine.js'
import WineAppForm from './WineAppForm'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function WineApp() {
  return (
    <div>
      <div class="container marketing">
      <h1 class="title-win">Vin</h1> 
      <Router>
      <Link to="/winForm"><p>+</p></Link>
      <Route path="/winForm">
          <WineAppForm/>
      </Route>
      </Router>
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

export default WineApp;
