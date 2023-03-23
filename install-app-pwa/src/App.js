// Set up instructions
// 
// 1) npx create-react-app . --template cra-template-pwa
// (we will do this via a typescript-specific command when we use typescript. The above command is for just plain JS+React) 
// 2) We need to opt-in to enable service workers. For this, in the index.js: 
// Change:
// serviceWorkerRegistration.unregister();
// To:
// serviceWorkerRegistration.register();
// - In index.js:
// 3) The code we wrote / altered was:
// App.js l24 - 42
// Index.js l18 (serviceWorkerRegistration.register())

// For more instructions, see related Trello > Spike ticket

// To run / test in browser:

// npm run build
// follow npm’s instructions after that (it will be one or two more commands)
// go to browser, install app via button / clicking icon in right of url bar (in Chrome, at least)
// You have to uninstall and build each time if you want to test install more than once. To uninstall app (in Chrome), go on the app > top right 3 dots (more) > click 'uninstall <app name>

// Useful reading:
// React-specific setup of PWAs: https://create-react-app.dev/docs/making-a-progressive-web-app/
// Workbox docs: https://developer.chrome.com/docs/workbox/

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      setDeferredPrompt(e)
    })
  }, [])

  const handleInstall = (e) => {
    deferredPrompt.prompt()
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Click here to <button onClick={handleInstall}>download our app</button>
        </h2>
      </header>
    </div>
  );
}

export default App;
