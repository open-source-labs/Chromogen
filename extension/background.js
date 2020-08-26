/* 1. listens for events emitted by inspected page (including Chromogen module) 
    2. communicates w content.js
     3. communicates w devtools page (app)
      */
const connections = {};

chrome.runtime.onConnect.addListener((port) => {
  const extensionListener = (message, sender, sendResponse) => {
    const { action, tabId } = message;
    // Initial connection – store current instance of DevTools page
    if (action === 'init') {
      connections[tabId] = port;
      // Handle click of download button
    } else {
      // relay message to content.js
      chrome.tabs.sendMessage(Number(tabId), message);
    }
  };

  // Add event listener defined above to DevTools panel
  port.onMessage.addListener(extensionListener);

  // handle disconnect
  port.onDisconnect.addListener((port) => {
    port.onMessage.removeListener(extensionListener);
    // remove current DevTool instance from connections
    // eslint-disable-next-line no-restricted-syntax
    for (const key in connections) {
      if (connections[key] === port) {
        delete connections[key];
        break;
      }
    }
  });
});

// Listener for messages from Chromogen module (sent via content.js)
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
