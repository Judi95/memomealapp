import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Tooltip, Button, OverlayTrigger } from 'react-bootstrap';

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
                    <i class="fa fa-star fa-2x star-wine"></i>
                  </OverlayTrigger>
                ))}
            </div>

              <div class="btn-group-form">
                <Button className="wine-button-form">Ajouter</Button>
                <Button variant="secondary" onClick={handleWineForm}>Annuler</Button>
              </div>
            </div>
        </form>
      </div>
    )
  }


export default WineAppForm