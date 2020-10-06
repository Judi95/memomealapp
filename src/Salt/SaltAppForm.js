import React from 'react'
import { Button } from 'react-bootstrap';

function SaltAppForm ({handleSaltForm}) {
    return (
      <div>
        <form className="highScoreInput">
            <div className="form-group">
              <label for="exampleFormControlInput1">Nom</label>
              <input type="Text" className="form-control" id="exampleFormControlInput1"/>
              <label for="exampleFormControlInput1">Descriptif</label>
              <textarea type="" className="form-control" id="exampleFormControlInput1"/>
              
              <div className="btn-group-form">
                <Button className="salt-button-form">Ajouter</Button>
                <Button variant="secondary" onClick={handleSaltForm}>Annuler</Button>
              </div>
            </div>
        </form>
      </div>
    )
  }


export default SaltAppForm