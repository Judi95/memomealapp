import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ingredients = [
    {number: 1, type: 'Fromage'},
    {number: 12, type: 'carottes'},
    {number: 5, type: 'Fraise'}
  ];
  

class DetailsSugar extends Component {

    render() {
        return (
                
            <div>
                <div className="container marketing">
                    <h1 className="title-sugar">{this.props.title}</h1>
                    <div className="col-lg-12">
                    <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. 
                            Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, 
                            tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, 
                            tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                    </div>
                    {ingredients.map(ing => {
                        return <p>{ing.number} / {ing.type}</p>
                    }

                )}
                </div>
            </div>
    )}
}

DetailsSugar.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients : PropTypes.arrayOf(
        PropTypes.shape({
          //id: PropTypes.number.isRequired,
          number: PropTypes.number.isRequired,
          type: PropTypes.string.isRequired
        })
      )
  }

export default DetailsSugar;

