import { SettingsEthernetTwoTone } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';

// function useForceUpdate() {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => value + 1); // update the state to force render
// }

const TextBox: React.FC<{test: any}> = ({test}) => {
  // const [fileReceived, setFileReceived] = useState(false);
  // const [test, setTest] = useState('');
  
  useEffect(() => {

    const editBox = document.getElementById('editBox');
    console.log('WE IN TEXTBOX.TSX THIS IS EDITBOX', editBox);
    // leave below error as it doesn't break anything :-) this allows editable test
    editBox.value = test;

    // // Connect to background.js
    // const backgroundConnection = chrome.runtime.connect();

    // backgroundConnection.onMessage.addListener((message) => {
    //   console.log('inside TEXTBOX, message received from background', message)

    //   if (message.action === 'editFileReceived') {
    //     if (message.data) {
    //       console.log('INSIDE TEXTBOX, MESSAGE IS', message)
    //       setFileReceived(true);
    //       const testAsArray = message.data;
    //       const blob = new Blob(testAsArray);
    //       // const blob = new Blob([JSON.stringify(testAsArray)]);
    //       console.log('WHAT DOES BLOB LOOK LIKE', blob);
    //       //console.log('we are now in devtool app.tsx and our blob is:', fileBlob)
    //       const blobreader = new FileReader();
    //       blobreader.readAsText(blob);
    //       // load event fires when a file has been read successfully
    //       const readFile = blobreader.addEventListener('loadend', function () {
    //         console.log('FILE I WANT TO RENDER', blobreader.result)
    //         setTest(String(blobreader.result));
    //         return blobreader.result;
    //       })
    //     }
    //   }
    // });
    // const sendMessage = (action: string) => {
    //   backgroundConnection.postMessage({
    //     action,
    //     tabId: chrome.devtools.inspectedWindow.tabId,
    //   });
    // };
    


  }, [test]);

  console.log('test in textbox', test);
  console.log('test leNGTH', test.length);
  console.log('type OF TEST', typeof test);
  let text = 'here is where we need to read file'
  
  // const [switch, setSwitch] = useState(false);


  return (
    <div id="textBox">
      <div id="label">Tests</div>
      <div id="textBoxEdit">
        {test.length ? (
          <textarea id='editBox' defaultValue='doopydoop'>
          </textarea>
        ) : (
            <textarea id='editBox' defaultValue={text}>
          {/* {test} */}
        </textarea>
      )}
      </div>
    </div>
  );
};




export default TextBox;