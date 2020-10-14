import React, { Component, useEffect, useState } from 'react'
import Wine from './Wine.js'
import './Wine.css';
import WineAppForm from './WineAppForm'

const WineApp = () => {

  const [hiddenForm , setHiddenForm] = useState(false)
  const [existingWine , setExistingWine] = useState([])
  const [wineId, setWineId] = useState(0)


  const handleWineForm = event => {
    setHiddenForm(!hiddenForm )
  }
  
  const saveWine = (entry) => {
    setHiddenForm(!hiddenForm)

    fetch("http://localhost:8080/api/wines", { 
      method: 'post', 
      headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwMjg1ODIzNn0.XnjVeerhnlogvHu4Lg_aKP_EqCPn-v6u1UeIAHfIioI8T-ShlHA9FopTq9oduPUd1GQJOmtfe0IsGTsLp43B1Q',
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
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwMjg1ODIzNn0.XnjVeerhnlogvHu4Lg_aKP_EqCPn-v6u1UeIAHfIioI8T-ShlHA9FopTq9oduPUd1GQJOmtfe0IsGTsLp43B1Q'
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

  useEffect(() => {
    getWines()
  }, [wineId])


  return (

    <div>
      <div className="container marketing">
        <div className="row">
          <h1 className="title-win">Vin</h1> 
          <button className="fa-2x wine-button" type="button" onClick={handleWineForm} >
            <i className="fa fa-plus-circle"></i>
          </button>
        </div>
        {hiddenForm && <WineAppForm saveWine={saveWine} handleWineForm={handleWineForm}/>}
        <div className="row">
          {existingWine.map ((wine) =>  <Wine key={wine.id} name={wine.name}  description={wine.description} evaluation={wine.evaluation} image={wine.image}/>)}
        </div>
      </div>
    </div>
  );
  

  
  
}

export default WineApp;