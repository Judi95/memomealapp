import React from 'react'
import {
    Link
  } from "react-router-dom";

const Header = () => {

    const theToken = localStorage.getItem('tokenSession')

    return ( 
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bar-green">
                <Link to="/" className="home-logo"><img src="/HomeIcon.png" alt="home" width="35%"/></Link> 
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav navbar-memo">
                        <li className="nav-item mr-2">
                            <Link to="/salt" className="nav-link text-light">Salé</Link>
                        </li>
                        <li className="nav-item mr-2">
                            <Link to="/sugar" className="nav-link text-light" >Sucré</Link>
                        </li>
                        <li className="nav-item mr-2">
                            <Link to="/wine" className="nav-link text-light" >Vin</Link>
                        </li>
                        <li className="nav-item mr-2 nav-item-account">
                            <Link to="/myAccount" className=" nav-link text-light"><i className="fa fa-user"></i> Mon compte</Link>    
                        </li>
                        <li className="nav-item nav-item-deco">
                            <Link to="/logout" className="nav-link text-light"> Déconnexion</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            
        </header>
        
    );
}

export default  Header