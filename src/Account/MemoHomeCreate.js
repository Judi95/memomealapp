import React, { useContext, useState } from 'react'
import './Account.css';
import {
    Link,
    Redirect
  } from "react-router-dom";
  import { UrlContext } from '../UrlContext';

const MemoHomeCreate = ({getTokenAuth}) => {

    const [isCreated, setIsCreated] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmed, setPasswordConfirmed] = useState("")
    const [isSamePassword, setIsSamePassword] = useState(true)
    const url = useContext(UrlContext)
  
    const handleUsernameUpdate = event => {
      setUsername(event.target.value)
    }
  
    const handlePasswordUpdate = event => {
      if(passwordConfirmed !== "" && passwordConfirmed !== event.target.value){
        setIsSamePassword(false)
      }else{
        setIsSamePassword(true)
      }
      setPassword(event.target.value)
    }
  
    const handlePasswordConfirmedUpdate = event => {
      if(password !== "" && password !== event.target.value){
        setIsSamePassword(false)
      }else{
        setIsSamePassword(true)
      }
      setPasswordConfirmed(event.target.value)
    }
  
    const createUser = () => {
  
      const entry = {login: username, email: username, password:password, authorities:["ROLE_USER"]}
  
      fetch(url + "api/create-user", { 
        method: 'post', 
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(entry)
      })
      .then(res => res.json())
      .then(
        (result) => {
          if(result.status){
            console.log(result)
          }
          setIsCreated(true)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  

  return ( 

    <div className="row home-page">
            <div className="col-md-8">
            <div className="jumbotron">
                    <div className="container text-center">
                      <div className="row">
                          <img className="memo-logo" src="logo-icon.png" alt="logo" width="80%"/>
                          <h1 className="logo pl-3 ml-3">MemoMeal</h1>
                      </div>
                      <div className="home-desc">
                          <p>Bienvenue sur MemoMeal ! Ce site  va vous permettre de noter toutes les recettes que vous aimez en passant du salé au sucré en un clic ! Vous pouvez également renseigner les vins que vous avez apprécié (ou non !) afin de vous en souvenir et de les évaluer.</p>
                          <p>MemoMeal est un carnet de recette personnalisé qui vous suit partout ! Vous pouvez commencer votre carnet de recette en vous inscrivant  <Link to="/createAccount" className="col-ms-5"> ici </Link>. Vous pouvez créer un compte de façon individuel ou partager avec toute la famille si vous le souhaitez.</p>
                      </div>
                    </div>
                </div>
            <div className="container marketing">
                <div className="row">
                <div className="col-lg-4">
                    <div className="salt-icon"><i className="fa fa-hamburger"></i></div>
                    <h2>Mes recettes salées</h2>
                </div>
                <div className="col-lg-4">
                <div className="sugar-icon"><i className="fa fa-ice-cream"></i></div>
                    <h2>Mes recettes sucrées</h2>
                </div>
                <div className="col-lg-4">
                <div className="wine-icon"><i className="fa fa-wine-bottle"></i></div>
                    <h2>Ma cave à vins</h2>
                </div>
                </div> 
            </div>
        </div>
        <div className="col-md-4">
      <div>
      {isCreated && <Redirect to="/login"/>}
      <div className="container h-100 login-container">
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src="/HomeIcon.png" className="brand_logo" alt="logo"/>
              </div>
              </div>
              <h2 className="wellcome">Bienvenue ! </h2>
              <div className="d-flex justify-content-center form_container">
                <form>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fas fa-user"></i></span>
                    </div>
                      <input type="email" 
                      className="form-control input_user" 
                      value ={username}
                      onChange={handleUsernameUpdate}
                      placeholder="exemple@gmail.com"/>
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fas fa-key"></i></span>
                    </div>

                      <input type="password" 
                      className="form-control input_pass" 
                      value ={password}
                      onChange={handlePasswordUpdate}
                      placeholder="Mot de passe"/>
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fas fa-key"></i></span>
                    </div>
                      <input type="password" 
                      className="form-control input_pass" 
                      value ={passwordConfirmed}
                      onChange={handlePasswordConfirmedUpdate}
                      placeholder="Confirmation"/>
                  </div>
                  { !isSamePassword && <p className="wrong-password">Les mots de passe doivent être identiques</p>}
                <button type="button" name="button" onClick={createUser} className="btn login_btn">Créer</button>
                </form>
              </div>
              <div className="d-flex justify-content-center come-in">
                <small>
                  <p className="col-ms-8 no-account mr-1 ">Déjà un compte ? 
                  <Link to="/login" className="col-ms-5"> Connectez-vous ! </Link></p>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default  MemoHomeCreate