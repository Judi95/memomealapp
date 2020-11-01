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
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item mr-2">
                            <Link to="/salt" className="nav-link text-light"><i className="fa fa-hamburger pl-2 pr-2"></i> Salé</Link>
                        </li>
                        <li className="nav-item mr-2">
                            <Link to="/sugar" className="nav-link text-light" > <i className="fa fa-ice-cream pl-2 pr-2"></i> Sucré</Link>
                        </li>
                        <li className="nav-item mr-2">
                            <Link to="/wine" className="nav-link text-light" > <i className="fa fa-wine-bottle pl-2 pr-2"></i> Vin</Link>
                        </li>
                        <li className="nav-item mr-2">
                            <Link to="/myAccount" className=" nav-link text-light"> <i className="fa fa-user pl-2 pr-2"></i> Mon compte </Link>    
                        </li>
                    </ul>
                        <Link to="/logout"> <button class="btn btn-secondary my-2 my-sm-0 mr-2 btn-deco" type="submit">Déconnexion</button></Link>
                    
                </div>
            </nav>
            
        </header>
        
    );
}

export default  Header