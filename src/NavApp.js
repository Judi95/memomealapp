import React from 'react'
import MemoHome from './MemoHome'
import MemoHomeLogin from './Account/MemoHomeLogin'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import WineApp from './Wine/WineApp.js'
import SaltMealApp from './Salt/SaltMealApp.js'
import SugarMealApp from './Sugar/SugarMealApp.js'
import Details from './Details/Details.js'
import LogoutApp from './Account/LogoutApp'
import MemoHomeCreate from './Account/MemoHomeCreate'
import MyAccount from './Account/MyAccount';

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
            <Route path="/createAccount">
                <MemoHomeCreate />
            </Route>            
            <PrivateRoute path="/details/:id">
                <Details/>
            </PrivateRoute>
            <PrivateRoute path="/myAccount">
                <MyAccount/>
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
