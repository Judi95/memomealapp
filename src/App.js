import React, { useEffect, useState } from 'react'
import { TokenContext } from './TokenContext';
import MemoHome from './MemoHome'
import MemoHomeLogin from './MemoHomeLogin'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NavApp from './NavApp';

const  App = () => {

  const [isLogin, setIsLogin] = useState(false)
  const [token, setToken] = useState('')
  const [idAuthent, setIdAuthent] = useState('')
  const theTokenSession = localStorage.getItem('tokenSession')

  const getTokenAuth = (idToken) => {
    setToken(idToken)
    setIsLogin(true)
    localStorage.setItem('tokenSession', idToken);
    
  }

  const resetTokenAuth = () => {
    setToken('')
    setIsLogin(false)
    localStorage.clear();
  }

  useEffect(() => {

    if(theTokenSession){
      setToken(theTokenSession)
      setIsLogin(true)
    }
  }, [idAuthent])

  return (

      <TokenContext.Provider value={token}>
         <NavApp isLogin={isLogin} getTokenAuth={getTokenAuth} resetTokenAuth={resetTokenAuth}></NavApp>
      </TokenContext.Provider>
        
  );
}

export default App;
