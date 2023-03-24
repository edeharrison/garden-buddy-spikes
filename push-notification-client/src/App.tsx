import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const handleSubscribe = () => {
    return Notification.requestPermission()
      .then(result => {
        if (result === 'denied') {
          return;
        }

        navigator.serviceWorker.ready
          .then(registration => {
            return Promise.all([registration?.pushManager.getSubscription(), registration])
          })
          .then(([subscribed, registration]) => {
            console.log(subscribed);
            if (subscribed) {
              return;
            }

            return registration?.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: 'BIFyiCtSvFZnXB2WnYRSxzRP34gbz_MZ19KDPwRTHvzZr1YGusH2XHdSWkpaSO9CJwHrpB7f9Yt8-k-WV3BAxoQ'
            })
          })
          .then(subscription => {
            if (subscription === undefined) {
              return;
            }
            //Post to add-subscription endpoint
            return fetch('http://localhost:9000/add-subscription', {
              method: 'POST',
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(subscription)
            })
          })
          .then(console.log)
          .catch(console.error)


      })
  }

  const handleUnsubscribe = () => {
    return navigator.serviceWorker.ready
      .then(registration => {
        return registration.pushManager.getSubscription()
      })
      .then(subscription => {
        // Post to remove-subscription endpoint
        fetch('http://localhost:9000/remove-subscription', {
          method: 'POST',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(subscription)
        })

        return subscription?.unsubscribe();
      })
  }

  const handleNotification = () => {
    return navigator.serviceWorker.ready
      .then(registration => {
        return registration.pushManager.getSubscription()
      })
      .then(subscription => {
        fetch('http://localhost:9000/give-me-notification', {
          method: 'POST',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(subscription)
        })
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleSubscribe}>Subscribe to notifications</button>
        <button onClick={handleUnsubscribe}>Unsubscribe to notifications</button>
        <button onClick={handleNotification}>Notify Me</button>
      </header>
    </div>
  );
}

export default App;
