import PropTypes from 'prop-types'
import React, { Component } from 'react'

class WineAppForm extends Component {

  render() {
    return (
      <form className="highScoreInput">
          <div class="form-group">
            <label for="exampleFormControlInput1">Nom</label>
            <input type="Text" class="form-control" id="exampleFormControlInput1"/>
          </div>
          <button type="submit" class="btn btn-primary mb-2">Terminer</button>
      </form>
    )
  }
}

export default WineAppForm