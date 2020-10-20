import React, { useContext, useState } from 'react'
import {
    Link
  } from "react-router-dom";
import {TokenContext} from './TokenContext'

const Header = () => {

    const theToken = useContext(TokenContext)

    return ( 
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bar-green">
                <Link to="/" className="home-logo"><img src="/HomeIcone.png" alt="Accueil MemoMeal" width="35%"/></Link> 
                    { theToken &&              
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                            <Link to="/salt" className="nav-link">Salé</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/sugar" className="nav-link">Sucré</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/wine" className="nav-link">Vin</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/account" className="nav-link"><div className="user-account"><i className="fa fa-user"></i></div></Link>
                            </li>
                        </ul>
                    </div>
                }
                </nav>  
        </header>
        
    );
}

export default  Header