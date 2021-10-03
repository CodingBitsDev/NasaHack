import { useEffect, useState } from 'react';
import './scss/App.scss';
import BabylonCanvas from './BabylonCanvas';
import TimeSettingsContainer from './reactComponents/TimeSettingsContainer';
import SettingsToolBar from './reactComponents/SettingsToolBar';

import("@babylonjs/core/Debug/debugLayer")
import('@babylonjs/inspector')


function App() {
  let [ scene, setScene ] = useState(null)

  return (
    <div className="App">
      <BabylonCanvas onSceneReady={setScene}/>
      {scene && <SettingsToolBar scene={scene} />}
    </div>
  );
}

export default App;
