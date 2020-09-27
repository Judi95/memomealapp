import React from 'react'
import Wine from './Wine.js'
import BubbleHome from './BubbleHome'

function WineApp() {
  return (
    <div class="container marketing">
      <div class="row">
        <Wine title="Bordeau" indice="1" />
        <Wine title="Chardonay" indice="5" />
        <Wine title="Côte du Rhone" indice="3" />
        <Wine title="Jurançon" indice="4" />
        <Wine title="Beaujolais" indice="0" />
        </div>
    </div>
  );
}

export default WineApp;
