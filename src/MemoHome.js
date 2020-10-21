import React from 'react'
import Footer from './Footer';
import Header from './Header';
import {
  Redirect
} from "react-router-dom";

const MemoHead = () => {

    const theTokenSession = localStorage.getItem('tokenSession')

    return ( 
        <div className="row home-page content-page-home">
            <Header/>
            <Footer/>
            { theTokenSession ?
            <div className="col-md-12">
            <div className="jumbotron">
                    <div className="container">
                    <img className="memo-logo" src="logo.png" alt="Logo MemoMeal" width="80%"/>
                    <div className="home-desc">
                        <p>Bienvenu sur MemoMeal ! Ce site  va vous permettre de noté toutes les recettes que vous aimez en passant du salé au sucré en un clique ! Vous pouvez également renseigner des vins que vous avez apprécier (ou non !) afin de vous en souvenir et de les évaluer.</p>
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
        : <Redirect to="/"/>}
    </div>
        
    );
}

export default  MemoHead