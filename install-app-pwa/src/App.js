// Set up instructions
// 
// 1) npx create-react-app . --template cra-template-pwa 
// 2) We need to opt-in to enable service workers. For this, in the index.js: 
// Change:
// serviceWorkerRegistration.unregister();
// To:
// serviceWorkerRegistration.register();
// - In index.js:
// 3) declare a deferredPrompt variable (l8)
// 4) add an event listener to window, 


// Useful reading:
// React-specific setup of PWAs: https://create-react-app.dev/docs/making-a-progressive-web-app/
// Workbox docs: https://developer.chrome.com/docs/workbox/

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App({deferredPrompt}) {
  async function handleInstall() {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt()
      const {outcome} = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        deferredPrompt = null
      }
    }
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
