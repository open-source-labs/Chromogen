import React, { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';

const TextBox: React.FC<{ test: string }> = ({ test }) => {
  useEffect(() => {
    const editBox = document.getElementById('editBoxPost') as HTMLInputElement;
    if (editBox) editBox.value = test;
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
        <textarea id="editBoxPost" defaultValue={'here is where we need to read file'}></textarea>
      </div>
    </div>
  );
};

export default TextBox;
