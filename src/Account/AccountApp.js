import React, { useContext, useState } from 'react'
import {
  Link
} from "react-router-dom";
import { UrlContext } from '../UrlContext';

const AccountApp = (getTokenAuth) => {

  const [isLogin, setIsLogin] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
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

    fetch( url + "api/authenticate", { 
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
        }else{
          setToken(result.id_token)
          setIsLogin(true)
          console.log("FONC :", getTokenAuth())
        }
        
      },
      (error) => {
        console.log(error)
      }
    )
  }
  
  return(
    
    <div>      
      <div className="container h-100 login-container">
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src="/HomeIcone.png" className="brand_logo" alt="logo"/>
              </div>
            </div>
            <h2 className="connexion">Connexion</h2>
            <div className="d-flex justify-content-center form_container">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                  </div>
                  <input type="Text" 
                  className="form-control input_user" 
                  value ={username}
                  onChange={handleUsernameUpdate}
                  placeholder="Login"/>

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
        
            <div className="mt-2">
              <div className="d-flex justify-content-center come-in">
                  <p className="col-ms-8 no-account mr-1 ">Pas encore de compte ? </p>
                  <Link to="/createAccount" className="col-ms-5"> Venez vite ! </Link>
              </div>
              <div className="d-flex justify-content-center mt-1">
                <a className="forget-password" href="#">Mot de passe oublié ?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountApp;