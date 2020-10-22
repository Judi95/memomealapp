import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component';
import './Wine.css';
import WineAppForm from './WineAppForm'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Header from '../Header'
import Footer from '../Footer'

const WineApp = () => {

  const [hiddenForm , setHiddenForm] = useState(false)
  const [existingWine , setExistingWine] = useState([])
  const [wineId, setWineId] = useState(0)
  const token = localStorage.getItem('tokenSession')

  const handleWineForm = event => {
    setHiddenForm(!hiddenForm )
  }
  
  const saveWine = (entry) => {
    setHiddenForm(!hiddenForm)

    fetch("http://localhost:8080/api/wines", { 
      method: 'post', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(entry)
    })
    .then(res => res.json())
    .then(
      (result) => {
        setExistingWine(existingWine.concat( result ))  
      },
      (error) => {
        console.log(error)
      }
    )


  }

  const getWines = () => {
    fetch("http://localhost:8080/api/wines", { 
      method: 'get', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
          if(result.length > 0){
            setExistingWine(existingWine.concat( result ))
          }else{
            console.log(result)
          }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const confirmDelete = (id, name) => {
    confirmAlert({
      message: 'Êtes-vous sûr de vouloir supprimer la boutielle : ' + name,
      buttons: [
        {
          label: 'Valider',
          onClick: () => deleteRecipe(id)
        },
        {
          label: 'Annuler',
          onClick: () =>  {}
        }
      ]
    });
  }
  
  const deleteRecipe = (id) => {
    console.log("MON ID : ", id)
    fetch(`http://localhost:8080/api/wines/${id}`, { 
      method: 'delete', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`
      })
    })
    .then(
      (result) => {
        console.log(result)
      },
      (error) => {
        console.log(error)
      }
    )
    const newList = existingWine.filter((item) => item.id !== id)
    return setExistingWine(newList)
}

  useEffect(() => {
    getWines()
  }, [wineId])


  return (
    <div>
      <Header/>
      <Footer/>
      {token &&
      <div className="container marketing content-page">
        <div className="row">
          <h1 className="title-win">Vin</h1> 
          <button className="fa-2x wine-button" type="button" onClick={handleWineForm} >
            <i className="fa fa-plus-circle"></i>
          </button>
        </div>
        {existingWine.length < 1 && <h2 className="text-center font-weight-light font-italic mt-2">Ajoutez votre premier vin !</h2>}
        {hiddenForm && <WineAppForm saveWine={saveWine} handleWineForm={handleWineForm}/>}
        <div className="row">
          {existingWine.map ((wine) => {
            return (
              <div key={wine.id} className="col-md-3 mt-4 mr-4 ml-5 list-items">
              <div className="content-item">
                    <div className="title-item"><h2>{wine.name}</h2></div>
                    <button className="fa-2x delete-recipe" onClick={() => confirmDelete(wine.id, wine.name)}  >
                      <i className="fa fa-minus-circle"></i>
                    </button>
                      <ReactStars
                        count={5}
                        size={30}
                        value={wine.evaluation}
                        edit={false}
                        fullIcon="fa fa-star"
                        activeColor="#79bd9a"
                      />
                      {console.log(wine.type)}
                {wine.type !== null && wine.type !== "" && <p className="wine-type">Type : {wine.type}</p>}
                <p className="wine-desc">{wine.description}</p>
                </div>
                {wine.image != null && wine.image !== '' && <img className="img-item img-wine" src={wine.image} alt="Recipe Image" width="100%"/>}
              </div>

            )
          })}
        </div>
      </div>
      }
    </div>
  );
  

  
  
}

export default WineApp;