import React from 'react'
import PropTypes from 'prop-types'
import ReactStars from 'react-rating-stars-component';

const Wine = ({ name, description, evaluation, image}) => (
    <div className="col-md-3 mt-5 mr-5 list-items">
      <div className="content-item">
            <div className="title-item"><h2>{name}</h2></div>
              <ReactStars
                count={5}
                size={30}
                value={evaluation}
                edit={false}
                fullIcon="fa fa-star"
                activeColor="#79bd9a"
              />
        <p>{description}</p>
        </div>
        {image !== null && <img className="img-item img-wine" src={image} alt="Recipe Image" width="100%"/>}
      </div>
)

Wine.propTypes = {
    name: PropTypes.string.isRequired
}

export default Wine