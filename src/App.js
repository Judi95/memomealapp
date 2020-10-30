import React, { useEffect, useState } from 'react'

import NavApp from './NavApp';
import { UrlContext } from './UrlContext';

const  App = () => {

  const [url, setUrl] = useState("http://163.172.184.101:8080/")
  //const [url, setUrl] = useState("https://memomealapi.cleverapps.io/")

  const getTokenAuth = (idToken) => {
    localStorage.setItem('tokenSession', idToken);
  }

  const resetTokenAuth = () => {
    localStorage.clear();
  }

  useEffect(() => {
    console.log("ENV : ", process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'PROD'){
      setUrl("https://memomealapi.cleverapps.io/")
      console.log("PROD : ", url)
    }
    console.log("MON URL : ", url)
  }, [url])

  return (
    <UrlContext.Provider value={url}>
      <NavApp getTokenAuth={getTokenAuth} resetTokenAuth={resetTokenAuth}></NavApp>
    </UrlContext.Provider>

        
  );
}

export default App;
