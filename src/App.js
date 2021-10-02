import { useEffect } from 'react';
import './App.scss';
import BabylonCanvas from './BabylonCanvas';
import("@babylonjs/core/Debug/debugLayer")
import('@babylonjs/inspector')


function App() {
  return (
    <div className="App">
      <BabylonCanvas/>
    </div>
  );
}

export default App;
