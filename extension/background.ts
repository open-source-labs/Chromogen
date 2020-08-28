/* Listens for events from content.js and DevTools panel
      Communicates with package via content.js
      */
interface Connections {
  [tabId: string]: object;
}

interface Message {
  tabId: string;
  action: string;
}

const connections: Connections = {};

chrome.runtime.onConnect.addListener((port) => {
  const extensionListener = (message: Message) => {
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

// NOT IN USE: Listener for messages from Chromogen module (sent via content.js)
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
