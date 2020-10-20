import React, { useContext } from 'react'
import Footer from './Footer';
import Header from './Header';
import { TokenContext } from './TokenContext';

const NotAuthorizeApp = () => {

    const theToken = useContext(TokenContext)

    return ( 
        <div className="row home-page content-page-home">
            <Header/>
            <Footer/>
            <div className="col-md-12">
                <h1 className="text-danger mt-5 not-authorize"> Vous n'êtes pas autorisé à aller sur cette page ! <br/> Veuillez vous connecter.</h1>
                
        </div>
    </div>
        
    );
}

export default  NotAuthorizeApp