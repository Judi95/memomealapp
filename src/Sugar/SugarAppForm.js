import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Tooltip, Button, OverlayTrigger } from 'react-bootstrap';

function SugarAppForm ({handleSugarForm}) {
    return (
      <div>
        <form className="highScoreInput">
            <div class="form-group">
              <label for="exampleFormControlInput1">Nom</label>
              <input type="Text" class="form-control" id="exampleFormControlInput1"/>
              <label for="exampleFormControlInput1">Descriptif</label>
              <textarea type="" class="form-control" id="exampleFormControlInput1"/>
              
              <div class="btn-group-form">
              <Button className="sugar-button-form">Ajouter</Button>
              <Button variant="secondary" onClick={handleSugarForm}>Annuler</Button>
              </div>
            </div>
        </form>
      </div>
    )
  }


export default SugarAppForm