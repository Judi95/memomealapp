import React from 'react'
import {
    Link
  } from "react-router-dom";

const Header = () => {

    const theToken = localStorage.getItem('tokenSession')

    return ( 
        <header>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bar-green">
                <Link to="/" className="home-logo"><img src="/HomeIcon.png" alt="home" width="35%"/></Link> 
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav navbar-memo">
                        <li class="nav-item mr-2">
                            <Link to="/salt" className="nav-link text-light">Salé</Link>
                        </li>
                        <li class="nav-item mr-2">
                            <Link to="/sugar" className="nav-link text-light" >Sucré</Link>
                        </li>
                        <li class="nav-item mr-2">
                            <Link to="/wine" className="nav-link text-light" >Vin</Link>
                        </li>
                        <li class="nav-item mr-2 nav-item-account">
                            <Link to="/myAccount" className=" nav-link text-light"><i classN="fa fa-user"></i> Mon compte</Link>    
                        </li>
                        <li class="nav-item nav-item-deco">
                            <Link to="/logout" className="nav-link text-light"> Déconnexion</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            
        </header>
        
    );
}

export default  Header