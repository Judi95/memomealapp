import React from 'react'
import PropTypes from 'prop-types'


const SugarMeal = ({ title, indice}) => (
  <div class="col-md-4">
      <h2>{title}</h2>
      <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
      <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
    </div>
)


SugarMeal.propTypes = {
    title: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    ingredients : PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        number: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
      })
    ) 
  }

  export default SugarMeal;