 /* This file serves as an intermediary between the Chromogen module
     and background.js.  (background.js can communicate to DevTools page)
 */

// send message to window/module when content script is connected - doesn't do anything yet
window.postMessage({ action: 'contentScript' }, '*');

// listen for messages from Chromogen module; relay to background.js
// (background.js will relay to devtool)
window.addEventListener('message', (message) => chrome.runtime.sendMessage(message));

// listen for messages (e.g. DL file or toggleRecord) from background.js to relay to module
chrome.runtime.onMessage.addListener((message) =>  window.postMessage(message, '*'));
