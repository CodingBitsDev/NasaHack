import { useEffect } from 'react';
import './App.scss';
import BabylonCanvas from './BabylonCanvas';
import {handleData} from './handleData';
import("@babylonjs/core/Debug/debugLayer")
import('@babylonjs/inspector')


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
