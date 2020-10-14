import React from 'react'
import PropTypes from 'prop-types'
import {  Button } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";

const SaltMeal = ({ name, image, id}) => (
  <div className="col-md-3 mt-5 mr-4 list-items">
    <div className="content-item">
      <div className="title-item"><h2>{name}</h2></div>
    </div>
      {image !== null && <img className="img-item" src={image} alt="Recipe Image" width="100%"/>}
     <Link to={`details/${id}`}> <Button className="button-item salt-button-item">Recette</Button></Link>
    </div>
)


SaltMeal.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }

  export default SaltMeal;