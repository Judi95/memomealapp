import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import WineApp from './Wine/WineApp.js'
  import SaltMealApp from './Salt/SaltMealApp.js'
  import SugarMealApp from './Sugar/SugarMealApp.js'
  import App from './App.js'

function Header() {
    return ( 
        <header>
            <Router>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bar-green">
                <Link to="/"><a class="navbar-brand" href="#">ACCUEIL</a></Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span> ACCUEIL</span>
                </button>
                
                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                        <Link to="/salt"><a class="nav-link" href="#">Salé</a></Link>
                        </li>
                        <li class="nav-item">
                        <Link to="/sugar"><a class="nav-link" href="#">Sucré</a></Link>
                        </li>
                        <li class="nav-item">
                        <Link to="/wine"><a class="nav-link" href="#">Vin</a></Link>
                        </li>
                    </ul>
                </div>
                </nav>  
                <Switch>
                    <Route path="/salt">
                        <SaltMealApp/>
                    </Route>
                    <Route path="/sugar">
                        <SugarMealApp />
                    </Route>
                    <Route path="/wine">
                        <WineApp />
                    </Route>
                    <Route path="/">
                        <App/>
                    </Route>
                </Switch>
                </Router>
            </header>
        
    );
}

export default  Header