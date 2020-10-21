import React from 'react'
import {
    Link
  } from "react-router-dom";

const Header = () => {

    const theToken = localStorage.getItem('tokenSession')

    return ( 
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bar-green">
                <Link to="/" className="home-logo"><img src="/HomeIcon.png" alt="Accueil MemoMeal" width="35%"/></Link> 
                    { theToken &&              
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item mr-3">
                            <Link to="/salt" className="nav-link">Salé</Link>
                            </li>
                            <li className="nav-item mr-3">
                            <Link to="/sugar" className="nav-link">Sucré</Link>
                            </li>
                            <li className="nav-item mr-3">
                            <Link to="/wine" className="nav-link">Vin</Link>
                            </li>
                        </ul>
                        <div className="mt-2 mt-md-0">
                            <small><Link to="/logout" className="nav-link"><button className="btn my-2 my-sm-0 mr-4 btn-dark btn-sm"> Déconnexion </button></Link></small>
                        </div>
                    </div>
                }
                </nav>  
        </header>
        
    );
}

export default  Header