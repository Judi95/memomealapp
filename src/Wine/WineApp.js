import React, { Suspense, useContext, useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component';
import './Wine.css';
import WineAppForm from './WineAppForm'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Header from '../Header'
import Footer from '../Footer'
import { UrlContext } from '../UrlContext';
import {
  Redirect
} from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import BounceLoader from "react-spinners/BounceLoader"; // OK
import DotLoader from "react-spinners/DotLoader"; // OK + 
import GridLoader from "react-spinners/GridLoader"; // OK
import PuffLoader from "react-spinners/PuffLoader"; // OK
import PulseLoader from "react-spinners/PulseLoader"; // OK
import RiseLoader from "react-spinners/RiseLoader"; // OK

const WineApp = () => {
  

  const [hiddenForm , setHiddenForm] = useState(false)
  const [existingWine , setExistingWine] = useState([])
  const [existingWineFilter , setExistingWineFilter] = useState([])
  const token = localStorage.getItem('tokenSession')
  const url = useContext(UrlContext)
  const [isSessionTimeOut, setIsSessionTimeOut] = useState(false)
  const [wineType] = useState(["Tout", "Rosé", "Blanc", "Rouge", "Jaune"])  
  const [hasPicture, setHasPicture] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
  z-index: 10000;
  position: absolute;
  left: 30%;
  top: 30%;
`;

  const handleWineForm = event => {
    setHiddenForm(!hiddenForm )
  }

  const handleTypeUpdate = event => {

    if( event.target.value === "Tout"){
      setExistingWineFilter(existingWine)
    } else {
      const newList = existingWine.filter((item) => {
        return item.type == event.target.value
      });
   
      setExistingWineFilter(newList);
    }
  }
  
  const saveWine = (entry) => {

    document.getElementById("content-page-id").setAttribute("style", "filter: blur(5px);");

    setHiddenForm(!hiddenForm)
    console.log("DEBUT LOADING")
    setIsLoading(true)
    fetch( url + "/wines", { 
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
        if(result.status === 401){
          localStorage.clear();
          setIsSessionTimeOut(true)
        } else if (result.status){
          console.log(result)
        } else {
          setExistingWine(existingWine.concat( result ))
          setExistingWineFilter(existingWine.concat( result ))
        }
        setIsLoading(false)
        document.getElementById("content-page-id").setAttribute("style", "");
        console.log("FIN LOADING")
      },
      (error) => {
        console.log(error)
      }
    )

   
  }

  const getWines = () => {
    fetch( url + "/wines", { 
      method: 'get', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.status === 401){
          localStorage.clear();
          setIsSessionTimeOut(true)
        }
        if(result.length > 0){
          setExistingWine(result)
          setExistingWineFilter(result)
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
          onClick: () => deleteWine(id)
        },
        {
          label: 'Annuler',
          onClick: () =>  {}
        }
      ]
    });
  }
  
  const deleteWine = (id) => {

    fetch(url + `/wines/${id}`, { 
      method: 'delete', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`
      })
    })
    .then(
      (result) => {
        if(result.status === 401){
          localStorage.clear();
          setIsSessionTimeOut(true)
        }
      },
      (error) => {
        console.log(error)
      }
    )
    const newList = existingWine.filter((item) => item.id !== id)
    setExistingWineFilter(newList)
    return setExistingWine(newList)
}

  useEffect(() => {
    getWines()
  }, [])


  return (
    <div>
      {isSessionTimeOut && <Redirect to ="/"/>}
      <Header/>
      <Footer/>

      <RiseLoader
          css={override}
          size={100}
          color={"#3b8686"}
          loading={isLoading}
        />


      {token &&
      <div id="content-page-id" className="container marketing content-page">
        <div className="row">
          <h1 className="title-win">Vin</h1>
          <button className="fa-2x wine-button" type="button" onClick={handleWineForm} >
            <i className="fa fa-plus-circle"></i>
          </button>
        </div>
        {existingWine.length < 1 && <h2 className="text-center font-weight-light font-italic mt-2">Ajoutez votre premier vin !</h2>}
        {hiddenForm && <WineAppForm saveWine={saveWine} handleWineForm={handleWineForm}/>}
        <div className="col-md-2 ml-5">
            <select  className="form-control" onChange={handleTypeUpdate}>
              {wineType.map((type, index) => <option key={index} value={type}>{type}</option>)}
            </select>
          </div>
        <div className="row">
          {existingWine.map ((wine) => {
            return (
              <div key={wine.id} className="col-md-3 mt-4 mr-4 ml-5 list-items">
              <div className="content-item">
                    <div className="title-item"><h2>{wine.name}</h2></div>
                    <button className="delete-recipe" onClick={() => confirmDelete(wine.id, wine.name)}  >
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
                     
                {wine.type !== null && wine.type !== "" && <p className="wine-type">Type : {wine.type}</p>}
                <p className="wine-desc">{wine.description}</p>
                </div>
                { wine.picture != null && <img className="img-item img-wine" src={`${url}/picture/${wine.picture.name}`} alt="wine" width="100%"/>}
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