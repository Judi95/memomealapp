import PropTypes from 'prop-types'
import React, { Component } from 'react'

function WineAppForm ({handleWineForm}) {
    return (
      <div>
        <form className="highScoreInput">
            <div class="form-group">
              <label for="exampleFormControlInput1">Nom</label>
              <input type="Text" class="form-control" id="exampleFormControlInput1"/>
            </div>
            <button type="submit" class="btn btn-primary mb-2">Terminer</button>
            <button type="submit" class="btn btn-primary mb-2" onClick={()=> handleWineForm}>Annuler</button>
        </form>
      </div>
    )
  }


export default WineAppForm