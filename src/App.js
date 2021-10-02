import { useEffect } from 'react';
import './App.scss';
import BabylonCanvas from './BabylonCanvas';
import {handleData} from './handleData';

if (window.location.href.includes('debug')) {
  import("@babylonjs/core/Debug/debugLayer").then(() => {
    import('@babylonjs/inspector').then(() => {
      console.log("inspector loaded")
    });
  })
}


function App() {
  useEffect(() => {
    handleData();
  });

  return (
    <div className="App">
      <BabylonCanvas/>
    </div>
  );
}

export default App;
