import React from 'react'
import BubbleHome from './BubbleHome'
import MemoHead from './MemoHead';

function App() {
  return (
    <div>
      <MemoHead />
      <div class="container marketing">
            <div class="row">            
              <BubbleHome title="Salé" comment="bla bla bla" color_bubble="#cff09e" url="/salt" className="salt-button-form"/>
              <BubbleHome title="Sucré" comment="bla bla bla" color_bubble="#a8dba8" url="/sugar" className="sugar-button-form"/>
              <BubbleHome title="Vins" comment="bla bla bla" color_bubble="#79bd9a" url="/wine" className="wine-button-form"/>
          </div> 
      </div>
    </div>
  );
}

export default App;
