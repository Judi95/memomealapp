import React from 'react'
import PropTypes from 'prop-types'

const BubbleHome = ({ title, comment, color_bubble}) => (
    <div class="col-lg-4">
        <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140">
		<rect width="100%" height="100%" fill={color_bubble}/><text x="50%" y="50%" fill={color_bubble} dy=".3em">140x140</text>
		</svg>
        <h2>{title}</h2>
        <p>{comment}</p>
        <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
      </div>
)

BubbleHome.propTypes = {
    title: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    color_bubble: PropTypes.oneOf([
        '0', '1', '2', '3', '4', '5'
    ]).isRequired
}

export default BubbleHome