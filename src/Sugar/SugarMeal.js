import React from 'react'
import PropTypes from 'prop-types'
import {  Button } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DetailsSugar from './DetailsSugar.js'


const SugarMeal = ({ name, description, id}) => (
  <div className="col-md-4">
      <h2>{name}</h2>
      <p> {description} </p>
        <p><Link to="/details?recipeId={id}">  <Button className="sugar-button-form">Recette</Button></Link></p>
    </div>
)


SugarMeal.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

  export default SugarMeal;