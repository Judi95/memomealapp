import React from 'react'
import Wine from './Wine.js'
import BubbleHome from './BubbleHome'
import MemoHead from './MemoHead';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <MemoHead />
      <div class="container marketing">
            <div class="row">  
              <BubbleHome title="Salé" comment="bla bla bla" color_bubble="#cff09e" />
              <BubbleHome title="Sucré" comment="bla bla bla" color_bubble="#a8dba8" />
              <BubbleHome title="Vins" comment="bla bla bla" color_bubble="#79bd9a" />
          </div> 
      </div>
    </div>
  );
}

export default App;
