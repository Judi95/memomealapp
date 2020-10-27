import React from 'react'
import {
    Link
  } from "react-router-dom";

const Header = () => {

    const theToken = localStorage.getItem('tokenSession')

    return ( 
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bar-green">
                <Link to="/" className="home-logo"><image src="/HomeIcon.png" alt="Accueil MemoMeal" width="35%"/></Link> 
                    { theToken &&              
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item mr-3">
                            <Link to="/salt" className="nav-link text-light">Salé</Link>
                            </li>
                            <li className="nav-item mr-3">
                            <Link to="/sugar" className="nav-link text-light" >Sucré</Link>
                            </li>
                            <li className="nav-item mr-3">
                            <Link to="/wine" className="nav-link text-light" >Vin</Link>
                            </li>
                        </ul>
                        <div className="mt-2 mt-md-0">
                            <div className="row">
                                <Link to="/myAccount" className=" nav-link text-light account"><i class="fa fa-user"></i> Mon compte</Link>
                                <small><Link to="/logout" className="nav-link"><button className="btn my-2 my-sm-0 mr-4 btn-dark btn-sm"> Déconnexion </button></Link></small>
                            </div>
                        </div>
                    </div>
                }
                </nav>  
        </header>
        
    );
}

export default  Header