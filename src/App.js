import React, { useState } from 'react'
import { TokenContext } from './TokenContext';
import MemoHome from './MemoHome'
import MemoHomeLogin from './MemoHomeLogin'
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
import AccountApp from './AccountApp'
import CreateAccountApp from './CreateAccountApp'
import NavApp from './NavApp';

const  App = () => {

  const [isLogin, setIsLogin] = useState(false)
  const [token, setToken] = useState('')

  const getTokenAuth = (idToken) => {
    setToken(idToken)
    setIsLogin(true)
  }


  return (
    
      <TokenContext.Provider value={token}>
         <NavApp isLogin={isLogin} getTokenAuth={getTokenAuth}></NavApp>
      </TokenContext.Provider>
        
      
  );
}

export default App;
