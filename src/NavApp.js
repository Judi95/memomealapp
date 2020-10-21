import React from 'react'
import MemoHome from './MemoHome'
import MemoHomeLogin from './MemoHomeLogin'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import WineApp from './Wine/WineApp.js'
import SaltMealApp from './Salt/SaltMealApp.js'
import SugarMealApp from './Sugar/SugarMealApp.js'
import Details from './Details.js'
import LogoutApp from './LogoutApp'
import CreateAccountApp from './CreateAccountApp'

const  NavApp = ({getTokenAuth, resetTokenAuth}) => {


    function PrivateRoute({ children, ...rest }) {
      
        return (
          <Route
            {...rest}
            render={({ location }) =>
                localStorage.getItem('tokenSession') ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location }
                  }}
                />
              )
            }
          />
        );
      }

  return (
    
    <Router>
        <Switch>                    
            <PrivateRoute path="/salt">
                <SaltMealApp/>
            </PrivateRoute>
            <PrivateRoute path="/sugar">
                <SugarMealApp />
            </PrivateRoute>
            <PrivateRoute path="/wine">
                <WineApp />
            </PrivateRoute>
            <Route path="/logout">
                <LogoutApp resetTokenAuth={resetTokenAuth}/>
            </Route>
            <PrivateRoute path="/createAccount">
                <CreateAccountApp />
            </PrivateRoute>            
            <PrivateRoute path="/details/:id">
                <Details/>
            </PrivateRoute>
            <Route path="/login">
                 <MemoHomeLogin getTokenAuth={getTokenAuth}/>
            </Route>
            <PrivateRoute path="/">
                <MemoHome/>
            </PrivateRoute>
        </Switch>
    </Router>   
        
      
  );
}

export default NavApp;
