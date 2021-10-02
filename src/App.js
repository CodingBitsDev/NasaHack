import { useEffect } from 'react';
import './scss/App.scss';
import BabylonCanvas from './BabylonCanvas';
import TimeSettingsContainer from './reactComponents/TimeSettingsContainer';
import("@babylonjs/core/Debug/debugLayer")
import('@babylonjs/inspector')


function App() {
  return (
    <div className="App">
      <BabylonCanvas/>
      <TimeSettingsContainer />
    </div>
  );
}

export default App;
