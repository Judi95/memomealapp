import React from 'react'
import PropTypes from 'prop-types'

const numbers = [1, 2, 3, 4, 5];

const Wine = ({ title, indice}) => (
    <div className="col-md-4 mt-5">
            <h2>{title}</h2>
            <p>
                {numbers.map(nb => {
                        if(nb <= indice)
                            return <i key={nb} className="fa fa-star fa-2x star-wine-grade"></i>
                        return <i key={nb} className="fa fa-star fa-2x star-wine-under-grade"></i>
                    }

                )}
            </p>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
      </div>
)

Wine.propTypes = {
    title: PropTypes.string.isRequired,
    indice: PropTypes.oneOf([
        0, 1, 2, 3, 4, 5
    ]).isRequired
}

export default Wine