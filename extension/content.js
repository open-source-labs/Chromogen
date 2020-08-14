/* This file serves as an intermediary between the Chromogen module
    and background.js.  (background.js can communicate to DevTools page)
*/

// send message to window/module when content script is connected
window.postMessage({ name: 'contentScript' }, '*');

// listen for messages from Chromogen package; relay to background.js
// (background.js will relay to devtool)
window.addEventListener('message', (message) => chrome.runtime.sendMessage(message));

// listen for messages from background.js to relay to module
chrome.runtime.onMessage.addListener((message) => window.postMessage(message, '*'));
