import React from 'react'
import PropTypes from 'prop-types'
import {  Button } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";

const SaltMeal = ({ name, description}) => (
  <div className="col-md-4">
      <h2>{name}</h2>
      <p>{description}</p>
      <p><Link to="/details">  <Button className="salt-button-form">Recette</Button></Link></p>
    </div>
)


SaltMeal.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }

  export default SaltMeal;