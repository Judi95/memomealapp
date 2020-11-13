import React, { useContext, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { UrlContext } from '../UrlContext';
import { Button } from 'react-bootstrap'
import './Account.css';
import {
    Redirect
  } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const MyAccount = () => {

    const token = localStorage.getItem('tokenSession')
    const [isSessionTimeOut, setIsSessionTimeOut] = useState(false)
    const url = useContext(UrlContext)

    const [currentEmail, setCurrentEmail] = useState("")
    const [newEmail1, setNewEmail1] = useState("")
    const [email, setEmail] = useState("")
    const [isSameEmail, setIsSameEmail] = useState(true)

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [isSamePassword, setIsSamePassword] = useState(true)

    const handleCurrentEmailUpdate = event => {
        setCurrentEmail(event.target.value)
    }

    const handleNewEmail1Update = event => {
        if(email !== "" && email !== event.target.value){
            setIsSameEmail(false)
        }else{
            setIsSameEmail(true)
        }
        setNewEmail1(event.target.value)
    }

    const handleEmailUpdate = event => {
        if(newEmail1 !== "" && newEmail1 !== event.target.value){
            setIsSameEmail(false)
        }else{
            setIsSameEmail(true)
        }
        setEmail(event.target.value)
    }

    const handleCurrentPasswordUpdate = event => {
        setCurrentPassword(event.target.value)
    }

    const handleNewPassword1Update = event => {
        if(newPassword2 !== "" && newPassword2 !== event.target.value){
            setIsSamePassword(false)
        }else{
            setIsSamePassword(true)
        }
        setNewPassword1(event.target.value)
    }

    const handleNewPassword2Update = event => {
        if(newPassword1 !== "" && newPassword1 !== event.target.value){
            setIsSamePassword(false)
        }else{
            setIsSamePassword(true)
        }
        setNewPassword2(event.target.value)
    }

  const saveNewEmail = () => {
    if(isSameEmail && email){
      fetch(url + "/api/account/change-email", { 
        method: 'post', 
        headers: new Headers({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({email: email})
      })        
      .then(
        (result) => {
          console.log("RESULT : ", result)
          if(result.status === 401){
            localStorage.clear();
            setIsSessionTimeOut(true)
          } if(result.status === 200){
            confirmInfos()
          }
          
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  const saveNewPassword = () => { 
    if(isSamePassword && newPassword2){
        const newEntry = {currentPassword: currentPassword, newPassword: newPassword2}
        fetch(url + "/api/account/change-password", { 
          method: 'post', 
          headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(newEntry)
        })
        .then(
          (result) => {
            if(result.status === 401){
              localStorage.clear();
              setIsSessionTimeOut(true)
            } if(result.status === 200){
              confirmInfos()
            }
            
          },
          (error) => {
            console.log(error)
          }
        )
      }
    }

  const confirmInfos = () => {
    confirmAlert({
      message: 'Vous avez changé vos informations de connexion. Veuillez-vous reconnecter. ',
      buttons: [
        {
          label: 'Valider',
          onClick: () => {
            localStorage.clear();
            setIsSessionTimeOut(true)
          }
        }
      ],
      onClickOutside: () => {
        localStorage.clear();
        setIsSessionTimeOut(true)
      }
    });
  }

  const confirmDeleteAccount = () => {
    confirmAlert({
      message: 'Êtes-vous sûr de vouloir supprimer votre compte ? Toutes vos recettes et vins seront supprimés.',
      buttons: [
        {
          label: 'Supprimer',
          onClick: () => {
            console.log("Suppression compte") 
            deleteUser()
          }
        },
        {
          label: 'Annuler',
          onClick: () => {}
        }
      ],
      onClickOutside: () => {}
    });
  }

  const deleteUser = () => {
    console.log("Suppression user") 

    fetch(url + `/api/users`, { 
      method: 'delete', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
      })
    })
    .then(
      (result) => {
        if(result.status === 401){
          localStorage.clear();
          setIsSessionTimeOut(true)
        }if(result.status === 204){
          localStorage.clear();
          setIsSessionTimeOut(true)
        }else{
          console.log("KO : " ,result)
        }
        
      },
      (error) => {
        console.log(error)
      }
    ) 
  }
    

    return (

        <div className="container marketing content-page my-account-page">
            <Header/>
            <Footer/>
            {isSessionTimeOut && <Redirect to ="/"/>}
            <div className="row">
              <div className="col-md-8">
                <h1> Mon compte </h1>
              </div>
              <div className="col-md-4">
                <Button className="btn-danger float-right" onClick={confirmDeleteAccount}>Supprimer mon compte</Button>
              </div>
            </div>
            <h2>Changer mon email</h2>
            <div className="form-group">
              <form>
                <input type="email" 
                    className="form-control m-2" 
                    value ={currentEmail}
                    onChange={handleCurrentEmailUpdate}
                    placeholder="Email actuel"
                    required/>

                <input type="email"  
                    className="form-control m-2" 
                    value ={newEmail1}
                    onChange={handleNewEmail1Update}
                    placeholder="Nouvel email"
                    required/>
                
                <input type="email"  
                    className="form-control m-2" 
                    value ={email}
                    onChange={handleEmailUpdate}
                    placeholder="Confirmez email"
                    required/>

                { !isSameEmail && <p className="wrong-password">Les emails  doivent être identiques</p>}
                <div className="d-flex justify-content-center"><Button className="btn-secondary btn-my-account" onClick={saveNewEmail}>Valider</Button></div>
              </form>
            </div>

            <h2>Changer mon mot de passe</h2>
            <div className="form-group">
              <form>
                <input type="password" 
                    className="form-control m-2" 
                    value ={currentPassword}
                    onChange={handleCurrentPasswordUpdate}
                    placeholder="Mot de passe actuel"
                    required/>

                <input type="password"  
                    className="form-control m-2" 
                    value ={newPassword1}
                    onChange={handleNewPassword1Update}
                    placeholder="Nouveau mot de passe"
                    required/>
                
                <input type="password"  
                    className="form-control m-2" 
                    value ={newPassword2}
                    onChange={handleNewPassword2Update}
                    placeholder="Confirmez mot de passe"
                    required/>

                 { !isSamePassword && <p className="wrong-password">Les mots de passe doivent être identiques</p>}

                <div className="d-flex justify-content-center"><Button className="btn-secondary btn-my-account" onClick={saveNewPassword}>Valider</Button></div>
              </form>

              
            </div>

        </div>
    )
}

export default MyAccount