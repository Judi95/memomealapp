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
  import Details from './Details.js'
  import App from './App.js'
  import AccountApp from './AccountApp'
  import CreateAccountApp from './CreateAccountApp'

function Header() {
    return ( 
        <header>
            <Router>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bar-green">
                <Link to="/" className="home-logo"><img src="/HomeIcone.png" alt="Accueil MemoMeal" width="35%"/></Link>                
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
                        <Link to="/account" className="nav-link"><div className="user-account"><i class="fa fa-user"></i></div></Link>
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
                    <Route path="/account">
                        <AccountApp />
                    </Route>
                    <Route path="/createAccount">
                        <CreateAccountApp />
                    </Route>            
                    <Route path="/details/:id">
                        <Details/>
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