import React, { useContext, useState } from 'react'
import './Account.css';
import {
    Link,
    Redirect
  } from "react-router-dom";
  import { UrlContext } from './UrlContext';

const MemoHomeLogin = ({getTokenAuth}) => {

    const [rememberMe, setRememberMe] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isWrongLogin, setIsWrongLogin] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [connexionError, setConnexionError] = useState(false)
    const url = useContext(UrlContext)
  
    const handleUsernameUpdate = event => {
      setUsername(event.target.value)
    }
  
    const handlePasswordUpdate = event => {
      setPassword(event.target.value)
    }
  
    const handleRememberUpdate = () => {
      setRememberMe(!rememberMe)
    }
  
    const postLogin = () => {
  
      
      const entry = {username: username, password:password, rememberMe:rememberMe}
  
      fetch(url + "api/authenticate", { 
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
            console.log("STATUS : ",result)
            setIsWrongLogin(true)
          }else{
            getTokenAuth(result.id_token)
            setIsLogin(true)
          }
          
        },
        (error) => {
          console.log("ERROR : ", error)
          setConnexionError(true)
        }
      )
    }

    return ( 

        <div className="row home-page">
          {isLogin && <Redirect to="/"/>}
            <div className="col-md-8">
            <div className="jumbotron">
                    <div className="container text-center">
                    <img src="logo.png" alt="Logo MemoMeal" width="80%"/>
                    <div className="home-desc">
                        <p>Bienvenue sur MemoMeal ! Ce site  va vous permettre de noté toutes les recettes que vous aimez en passant du salé au sucré en un clique ! Vous pouvez également renseigner des vins que vous avez apprécier (ou non !) afin de vous en souvenir et de les évaluer.</p>
                        <p>MemoMeal est un carnet de recette personnalisé qui vous suit partout ! Vous pouvez commencer votre carnet de recette en vous inscrivant ICI. Vous pouvez créer un compte de façon individuel ou partager avec toute la famille si vous le souhaitez.</p>
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
                <div className="container h-100 login-container">
                    <div className="d-flex justify-content-center h-100">
                    <div className="user_card">
                        <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src="/HomeIcon.png" className="brand_logo" alt="Logo"/>
                        </div>
                        </div>
                        <h2 className="connexion">Connexion</h2>
                        <div className="d-flex justify-content-center form_container">
                        <form>
                          {isWrongLogin && <p className="text-danger wrong-login"><small> <em>Informations incorrectes</em></small></p>}
                          {connexionError && <p className="text-danger wrong-login"><small> <em>Erreur lors de la connexion. Veuillez réessayer.</em></small></p>}
                            <div className="input-group mb-3">
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <input type="Text" 
                            className="form-control input_user" 
                            value ={username}
                            onChange={handleUsernameUpdate}
                            placeholder="Identifiant"/>

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
                            <div className="d-flex justify-content-center mt-3 login_container">
                        <button type="button" name="button" className="btn login_btn" onClick={postLogin}>Connexion</button>
                        </div>
                        </form>
                        </div>
                    
                        <div className="mt-2 text-">
                        <small>
                          <div className="d-flex justify-content-center come-in">
                              <p className="col-ms-8 no-account mr-1 ">Pas encore de compte ? </p>
                              <Link to="/createAccount" className="col-ms-5"> Venez vite ! </Link>
                          </div>
                          <div className="d-flex justify-content-center mt-1">
                              <a className="forget-password text-muted" href="#">Mot de passe oublié ?</a>
                          </div>
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

export default  MemoHomeLogin