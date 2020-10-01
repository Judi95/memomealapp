import PropTypes from 'prop-types'
import React, { Component } from 'react'

function WineAppForm ({handleWineForm}) {
    return (
      <div>
        <form className="highScoreInput">
            <div class="form-group">
              <label for="exampleFormControlInput1">Nom</label>
              <input type="Text" class="form-control" id="exampleFormControlInput1"/>
              <label for="exampleFormControlInput1">Descriptif</label>
              <textarea type="" class="form-control" id="exampleFormControlInput1"/>
              <div class="row star-bar">
              
              <a href="#"></a><i data-toggle="tooltip" data-placement="top" title="Tooltip on top" class="fa fa-star fa-2x star-wine"></i>
                <i class="fa fa-star fa-2x star-wine"></i>
                <i class="fa fa-star fa-2x star-wine"></i>
                <i class="fa fa-star fa-2x star-wine"></i>
                <i class="fa fa-star fa-2x star-wine"></i>
              </div>

            </div>
            <button type="submit" class="btn mb-2 wine-button-form">Ajouter</button>
            <button class="btn btn-secondary mb-2 wine-button-form" type="button" onClick={handleWineForm}>Annuler</button>
        </form>
      </div>
    )
  }


export default WineAppForm