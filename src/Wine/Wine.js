import React from 'react'
import PropTypes from 'prop-types'
import ReactStars from 'react-rating-stars-component';

const Wine = ({ name, description, evaluation}) => (
    <div className="col-md-4 mt-5">
            <h2>{name}</h2>
              <ReactStars
                count={5}
                size={45}
                value={evaluation}
                edit={false}
                fullIcon="fa fa-star"
                activeColor="#79bd9a"
              />
        <p>{description}</p>
      </div>
)

Wine.propTypes = {
    name: PropTypes.string.isRequired
}

export default Wine