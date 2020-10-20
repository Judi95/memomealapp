import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from './TokenContext';
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

const  NavApp = ({isLogin, getTokenAuth, resetTokenAuth}) => {

    const theToken = useContext(TokenContext)
    const theTokenSession = sessionStorage.getItem('tokenSession')

    function PrivateRoute({ children, ...rest }) {
        return (
          <Route
            {...rest}
            render={({ location }) =>
                theToken ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
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
            <PrivateRoute path="/logout">
                <LogoutApp resetTokenAuth={resetTokenAuth}/>
            </PrivateRoute>
            <PrivateRoute path="/createAccount">
                <CreateAccountApp />
            </PrivateRoute>            
            <PrivateRoute path="/details/:id">
                <Details/>
            </PrivateRoute>
            <Route path="/">
                {isLogin ? <MemoHome/> : <MemoHomeLogin getTokenAuth={getTokenAuth}/>}
            </Route>
        </Switch>
    </Router>   
        
      
  );
}

export default NavApp;
