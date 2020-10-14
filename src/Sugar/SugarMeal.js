import React from 'react'
import PropTypes from 'prop-types'
import {  Button } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";

const SaltMeal = ({ name, image, id}) => (
  <div className="col-md-3 mt-5 mr-4 list-items">
      <div className="title-item"><h2>{name}</h2></div>
      {image !== null && <img className="img-item" src={image} alt="Recipe Image" width="100%"/>}
      <p><Link to={`details/${id}`}> <Button className="button-item sugar-button-item">Recette</Button></Link></p>
    </div>
)


SaltMeal.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }

  export default SaltMeal;