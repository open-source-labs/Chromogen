/* Listens for events from DevTools panel and content.js (package intermediary)
 */
interface Connections {
  [tabId: string]: any;
}

interface Message {
  tabId: string;
  action: string;
}

const connections: Connections = {};

chrome.runtime.onConnect.addListener((port) => {
  // Listen for messages from DevTools panel
  const extensionListener = (message: Message, port) => {
    const { tabId, action } = message;
    // Initial connection – store current instance of DevTools page
    if (action === 'connectChromogen') {
      connections[tabId] = port;
    }
    // Relay message to content.ts -> package
    chrome.tabs.sendMessage(Number(tabId), message);
  };

  // Add event listener defined above to current DevTools panel instance
  port.onMessage.addListener(extensionListener);

  // Handle disconnect
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

// Listen for messages from Chromogen package (sent via content.js)
chrome.runtime.onMessage.addListener((message: Message, sender) => {
  const { tab } = sender;

  if (tab) {
    const tabId = `${tab.id}`;
    // Relay message to devTool instance
    if (connections[tabId]) {
      connections[tabId].postMessage({
        action: message.action,
      });
    }
  }
});
