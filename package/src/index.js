export default {
  bestModule: 'chromogen',
};

export const testFunc = () => 'hello there';

// send message to content script -> background.js -> app
// sendWindowMessage('testData', testData);

// // listen to messages from app -> background.js -> content script -> module (here)
// window.addEventListener('message', onMessageReceived);
