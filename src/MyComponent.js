import React, { Component } from 'react'

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      countryCode: ''
    };
  }

  
  componentDidMount() {
    fetch("https://api.foobot.io/v2/device/2507466750700CC0/geoloc/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJncmFudGVlIjoiZmxvcmlhbi5sb3JlbmNlQGdtYWlsLmNvbSIsImlhdCI6MTU5NDM4NTk3NywidmFsaWRpdHkiOi0xLCJqdGkiOiJlNDYxNjk3YS03ZTg5LTQxNDUtOWYzZS0zYWExY2ZjODZiZDkiLCJwZXJtaXNzaW9ucyI6WyJ1c2VyOnJlYWQiLCJkZXZpY2U6cmVhZCJdLCJxdW90YSI6MjAwLCJyYXRlTGltaXQiOjV9.hrSElyavikxqU8fqHvm_PEiHyorkLc88ronfMdlfkIU", { 
        method: 'get',
        
      })
      .then(res => res.json()
      )
      .then(
        (result) => {
            alert('AHHHHH')
            console.log(result.countryCode)
          this.setState({
            isLoaded: true,
            countryCode: result.countryCode
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
            alert('OOHHHHH')
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, countryCode } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <ul>
          {countryCode}
        </ul>
      );
    }
  }
  
}

export default MyComponent;