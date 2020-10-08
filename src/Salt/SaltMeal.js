import React from 'react'
import PropTypes from 'prop-types'
import {  Button } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";

const SaltMeal = ({ title, indice}) => (
  <div className="col-md-4">
      <h2>{title}</h2>
      <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
      <p><Link to="/details">  <Button className="salt-button-form">Recette</Button></Link></p>
    </div>
)


SaltMeal.propTypes = {
    title: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired
  }

  export default SaltMeal;