import React from 'react'
import PropTypes from 'prop-types'

const numbers = ['1', '2', '3', '4', '5'];

const Wine = ({ name, description, evaluation}) => (
    <div className="col-md-4 mt-5">
            <h2>{name}</h2>
            <p>
                {numbers.map(nb => {
                        if(nb <= evaluation)
                            return <i key={nb} className="fa fa-star fa-2x star-wine-grade"></i>
                        return <i key={nb} className="fa fa-star fa-2x star-wine-under-grade"></i>
                    }

                )}
            </p>
        <p>{description}</p>
      </div>
)

Wine.propTypes = {
    name: PropTypes.string.isRequired
}

export default Wine