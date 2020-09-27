import React from 'react'
import PropTypes from 'prop-types'



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