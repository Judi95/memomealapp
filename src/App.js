import React, { useState } from 'react'

import NavApp from './NavApp';

const  App = () => {

  const theTokenSession = localStorage.getItem('tokenSession')

  const getTokenAuth = (idToken) => {
    localStorage.setItem('tokenSession', idToken);
  }

  const resetTokenAuth = () => {
    localStorage.clear();
  }

  return (

      <NavApp getTokenAuth={getTokenAuth} resetTokenAuth={resetTokenAuth}></NavApp>

        
  );
}

export default App;
