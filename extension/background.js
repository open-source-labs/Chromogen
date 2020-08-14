/* 1. listens for events emitted by inspected page (including Chromogen module) 
    2. communicates w content.js
     3. communicates w devtools page (app)
      */
const connections = {};

chrome.runtime.onConnect.addListener((port) => {
  const extensionListener = (message, sender, sendResponse) => {
    const { name, tabId } = message;
    // store current instance of DevTools page
    if (name === 'init') {
      connections[tabId] = port;
    }
  };

  // Listen for messages sent from the DevTools page (i.e. our app folder)
  port.onMessage.addListener(extensionListener);
  // handle disconnect
  port.onDisconnect.addListener((port) => {
    port.onMessage.removeListener(extensionListener);
    // remove current instance from connections
    for (const key in connections) {
      if (connections[key] === port) {
        delete connections[key];
        break;
      }
    }
  });
});

// Listen for messages from Chromogen module (sent via contentscript)
// chrome.runtime.onMessage.addListener((msg, sender) => {
//   // error handling
//   if (!sender.tab) return;

//   // relay message to devTool instance
//   if (connections[tabId]) {
//     connections[tabId].postMessage({
//       action: 'hi',
//       payload: 'hey',
//     });
//   }
// });
