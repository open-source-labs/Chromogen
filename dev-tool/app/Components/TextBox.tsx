import React, { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';

const TextBox: React.FC<{ test: string }> = ({ test }) => {

  // attempt to make height of textbox responsive to test length
  function calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    return newHeight;
  }
  
  useEffect(() => {
    const editBox = document.getElementById('editBoxPost') as HTMLInputElement;
    if (editBox) editBox.value = test;
    editBox.addEventListener("onKeyUp", () => {
      editBox.style.height = calcHeight(editBox.value) + "px";
    });
  }, [test]);

  const backgroundConnection = chrome.runtime.connect();

  // Send messages to background.js
  const sendMessage = (action: string) => {
    backgroundConnection.postMessage({
      action,
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  };

  const hooksButtonStyle: CSSProperties = {
    display: 'inline-block',
    // justifyContent: 'space-evenly',
    justifyContent: 'right',
    margin: '4px',
    marginLeft: '13px',
    padding: '0px',
    height: '25px',
    width: '65px',
    borderRadius: '4px',
    alignItems: 'flex-end',
    border: '1px',
    cursor: 'pointer',
    color: '#90d1f0',
    fontSize: '10px',
  };

  return (
    <div id="textBox">
      <div id="label">Tests</div>
      <div id="textBoxEdit">
        <textarea id='editBoxPost' defaultValue={'here is where we need to read file'}
        ></textarea>
      </div>
    </div>
  );
};




export default TextBox;