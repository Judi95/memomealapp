import React from 'react'
import MemoHead from './MemoHead';
import {  Button } from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";

function App() {
  return (
    <div>
      <MemoHead />
      <div className="container marketing">
            <div className="row">
            <div className="col-lg-4">
              <div className="salt-icon"><i className="fa fa-hamburger"></i></div>
              <h2>Mes recettes salées</h2>
              <p><Link to="/salt">  <Button className="salt-button-form">Voir</Button></Link></p>
            </div>
            <div className="col-lg-4">
            <div className="sugar-icon"><i className="fa fa-ice-cream"></i></div>
              <h2>Mes recettes sucrées</h2>
              <p><Link to="/sugar">  <Button className="sugar-button-form">Voir</Button></Link></p>
            </div>
            <div className="col-lg-4">
            <div className="wine-icon"><i class="fa fa-wine-bottle"></i></div>
              <h2>Ma cave à vins</h2>
              <p><Link to="/wine">  <Button className="wine-button-form">Voir</Button></Link></p>
            </div>
          </div> 
      </div>
    </div>
  );
}

export default App;
