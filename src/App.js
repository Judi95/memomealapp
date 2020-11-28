import React, { useEffect, useState } from 'react'

import NavApp from './NavApp';
import { UrlContext } from './UrlContext';

const  App = () => {

  const [url, setUrl] = useState("http://localhost:8080/api")

  const getTokenAuth = (idToken) => {
    localStorage.setItem('tokenSession', idToken);
  }

  const resetTokenAuth = () => {
    localStorage.clear();
  }

  useEffect(() => {
    if (process.env.NODE_ENV === 'production'){
      setUrl("http://163.172.184.101/api")
    }
  }, [url])

  return (
    <UrlContext.Provider value={url}>
      <NavApp getTokenAuth={getTokenAuth} resetTokenAuth={resetTokenAuth}></NavApp>
    </UrlContext.Provider>

        
  );
}

export default App;
