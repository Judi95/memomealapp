import React from 'react'
import PropTypes from 'prop-types'

const Wine = ({ title, indice}) => (
    <div class="col-md-4">
        <h2>{title} / {indice}*</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
        <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
      </div>
)

Wine.propTypes = {
    title: PropTypes.string.isRequired,
    indice: PropTypes.oneOf([
        '0', '1', '2', '3', '4', '5'
    ]).isRequired
}

export default Wine