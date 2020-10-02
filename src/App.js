import React from 'react'
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
              <BubbleHome title="Salé" comment="bla bla bla" color_bubble="#cff09e" url="/salt"/>
              <BubbleHome title="Sucré" comment="bla bla bla" color_bubble="#a8dba8" url="/sugar"/>
              <BubbleHome title="Vins" comment="bla bla bla" color_bubble="#79bd9a" url="/wine"/>
          </div> 
      </div>
    </div>
  );
}

export default App;
