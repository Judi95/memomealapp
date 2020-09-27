import React from 'react'
import Wine from './Wine.js'
import BubbleHome from './BubbleHome'

function App() {
  return (
    <div class="container marketing">
      <div class="row">
        <BubbleHome title="Salé" comment="bla bla bla" color_bubble="#cff09e" />
        <BubbleHome title="Sucré" comment="bla bla bla" color_bubble="#a8dba8" />
        <BubbleHome title="Vins" comment="bla bla bla" color_bubble="#79bd9a" />
        <Wine title="Bordeau" indice="1" />
        <Wine title="Chardonay" indice="5" />
        <Wine title="Côte du Rhone" indice="3" />
        <Wine title="Jurançon" indice="4" />
        <Wine title="Beaujolais" indice="0" />
        </div>
    </div>
  );
}

export default App;
