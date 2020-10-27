import React, { Component, useContext, useEffect, useState } from 'react'
import {
  Link, Redirect
} from "react-router-dom";
import { UrlContext } from '../UrlContext';

const CreateAccountApp = () => {
  
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

    fetch( url + "api/create-user", { 
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


  return(
    <div>
      {isCreated && <Redirect to="/account"/>}
      <div class="container h-100 login-container">
        <div class="d-flex justify-content-center h-100">
          <div class="user_card">
            <div class="d-flex justify-content-center">
              <div class="brand_logo_container">
                <img src="/HomeIcone.png" class="brand_logo" alt="Logo"/>
              </div>
            </div>
            <h2 className="wellcome">Bienvenue ! </h2>
            <div class="d-flex justify-content-center form_container">
              <form>
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                  </div>
                    <input type="email" 
                    className="form-control input_user" 
                    value ={username}
                    onChange={handleUsernameUpdate}
                    placeholder="exemple@gmail.com"/>
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
                <div class="input-group mb-2">
                  <div class="input-group-append">
                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                  </div>
                    <input type="password" 
                    className="form-control input_pass" 
                    value ={passwordConfirmed}
                    onChange={handlePasswordConfirmedUpdate}
                    placeholder="Confirmation"/>
                </div>
                { !isSamePassword && <p className="wrong-password">Les mots de passe doivent être identiques</p>}
              <button type="button" name="button" onClick={createUser} class="btn login_btn">Créer</button>
              </form>
            </div>
      
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAccountApp;