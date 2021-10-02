import './App.scss';
import BabylonCanvas from './BabylonCanvas';

if (window.location.href.includes('debug')) {
  import("@babylonjs/core/Debug/debugLayer").then(() => {
    import('@babylonjs/inspector').then(() => {
      console.log("inspector loaded")
    });
  })
}


function App() {
  return (
    <div className="App">
      <BabylonCanvas/>
    </div>
  );
}

export default App;
