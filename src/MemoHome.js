import React, { useContext, useEffect, useState } from 'react'
import Footer from './Footer';
import Header from './Header';
import {
  Redirect,
  Link
} from "react-router-dom";
import { UrlContext } from './UrlContext';

const MemoHead = () => {

    const theTokenSession = localStorage.getItem('tokenSession')
    const url = useContext(UrlContext)
    const [isSessionTimeOut, setIsSessionTimeOut] = useState(false)

    const isAuthenticated = () => {
        setTimeout(() => {   
        fetch(url + "/authenticate", { 
          method: 'get', 
          headers: new Headers({
            'Authorization': `Bearer ${theTokenSession}`,
            'Content-Type': 'application/json'
          })
        })
        .then(res => res.json())
        .then(
          (result) => {
            if( ! result.login){
                localStorage.clear();
                setIsSessionTimeOut(true)
            }
            
          },
          (error) => {
            console.log("ERROR : ", error)
          }
        ) }, 200);
      }
    
      useEffect(() => {
        
        isAuthenticated()
      }, [])

    return ( 
        <div className="row home-page content-page-home">
            <Header/>
            <Footer/>
            { !isSessionTimeOut ?
            <div className="col-md-12">
            <div className="jumbotron">
                    <div className="container text-center">

                        <h1 className="logo-home">MemoMeal</h1>

                        <div className="home-desc">
                            <p>Bienvenue sur MemoMeal ! Ce site  va vous permettre de noter toutes les recettes que vous aimez en passant du salé au sucré en un clic ! Vous pouvez également renseigner les vins que vous avez apprécié (ou non !) afin de vous en souvenir et de les évaluer.</p>
                            <p>MemoMeal est un carnet de recette personnalisé qui vous suit partout !</p>
                        </div>
                    </div>
                </div>
            <div className="container marketing">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="salt-icon"><i className="fa fa-hamburger"></i></div>
                        <Link to="/salt"><h2>Mes recettes salées</h2></Link>
                    </div>
                    <div className="col-lg-4">
                        <div className="sugar-icon"><i className="fa fa-ice-cream"></i></div>
                        <Link to="/sugar"><h2>Mes recettes sucrées</h2></Link>
                    </div>
                    <div className="col-lg-4">
                        <div className="wine-icon"><i className="fa fa-wine-bottle"></i></div>
                        <Link to="/wine"><h2>Ma cave à vins</h2></Link>
                    </div>
                </div> 
            </div>
        </div>
        : <Redirect to="/"/>}
    </div>
        
    );
}

export default  MemoHead