import React, { useContext, useState } from 'react'
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
import AccountApp from './AccountApp'
import CreateAccountApp from './CreateAccountApp'

const  NavApp = ({isLogin, getTokenAuth}) => {

    const theToken = useContext(TokenContext)

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
            <PrivateRoute path="/account">
                <AccountApp />
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
