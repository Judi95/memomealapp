import React, { Component, useEffect, useState } from 'react'
import './Account.css';
import {
  Link, Redirect
} from "react-router-dom";

const AccountApp = () => {

  const [isLogin, setIsLogin] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")

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

    fetch("http://localhost:8080/api/authenticate", { 
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
        if(result.status){
          console.log(result)
        }
        setToken(result.id_token)
        setIsLogin(true)
      },
      (error) => {
        console.log(error)
      }
    )

    }
  
  return(
    <div>
      {isLogin && <Redirect to="/salt"/>}
      <div class="container h-100 login-container">
        <div class="d-flex justify-content-center h-100">
          <div class="user_card">
            <div class="d-flex justify-content-center">
              <div class="brand_logo_container">
                <img src="/HomeIcone.png" class="brand_logo" alt="Logo"/>
              </div>
            </div>
            <h2 className="connexion">Connexion</h2>
            <div class="d-flex justify-content-center form_container">
              <form>
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                  </div>
                  <input type="Text" 
                  className="form-control input_user" 
                  value ={username}
                  onChange={handleUsernameUpdate}
                  placeholder="Login"/>

                </div>
                <div class="input-group mb-2">
                  <div class="input-group-append">
                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                  </div>

                  <input type="password" 
                  className="form-control input_pass" 
                  value ={password}
                  onChange={handlePasswordUpdate}
                  placeholder="Mot de passe"/>

                </div>
                  <div class="d-flex justify-content-center mt-3 login_container">
              <button type="button" name="button" class="btn login_btn" onClick={postLogin}>Connexion</button>
              </div>
              </form>
            </div>
        
            <div class="mt-2">
              <div class="d-flex justify-content-center links-connexion">
                <div className="row">
                  <p className="no-account">Pas encore de compte ? </p>
                  <Link to="/createAccount" className="ml-2"> Venez vite ! </Link>
                </div>
              </div>
              <div class="d-flex justify-content-center links-connexion">
                <a href="#">Mot de passe oublié ?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountApp;