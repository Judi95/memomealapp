import React, { useEffect, useState } from 'react'

import NavApp from './NavApp';
import { UrlContext } from './UrlContext';

const  App = () => {

  const [url, setUrl] = useState("http://localhost:8080/")

  const getTokenAuth = (idToken) => {
    localStorage.setItem('tokenSession', idToken);
  }

  const resetTokenAuth = () => {
    localStorage.clear();
  }

  useEffect(() => {
    console.log("ENV : ", process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production'){
      setUrl("https://163.172.184.101:8080/")
      console.log("PROD : ", url)
    }
    console.log("MON URLl : ", url)
  }, [url])

  return (
    <UrlContext.Provider value={url}>
      <NavApp getTokenAuth={getTokenAuth} resetTokenAuth={resetTokenAuth}></NavApp>
    </UrlContext.Provider>

        
  );
}

export default App;
