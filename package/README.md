<div align="center">
<h1>Chromogen</h1>
<a href="https://github.com/oslabs-beta/Chromogen">
  <img
    height="120"
    width="120"
    alt="chromogen logo"
    src="https://raw.githubusercontent.com/oslabs-beta/Chromogen/master/assets/logo/chromogen-logo.png"
  />
</a>

<h3>A UI-driven Jest test-generation package for <a href="https://www.npmjs.com/package/recoil">Recoil.js</a> selectors and <a href="https://www.npmjs.com/package/react">React.js</a> useState Hooks.</h3>

<br />

[![npm version](https://img.shields.io/npm/v/chromogen)](https://www.npmjs.com/package/chromogen)
[![Build Status](https://travis-ci.org/oslabs-beta/Chromogen.svg?branch=master)](https://travis-ci.org/oslabs-beta/Chromogen)
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oslabs-beta/Chromogen/blob/master/LICENSE)
<br />

</div>
<br />

Chromogen is a Jest unit-test generation tool for Recoil selectors and React useState Hooks. It captures state changes during user interaction and auto-generates corresponding test suites. Simply launch your app after following the installation instructions below, interact as a user normally would, and with one click you can download a ready-to-run Jest test file.
<br /><br /><br />

## Installation

Start by installing the <a href="https://www.npmjs.com/package/chromogen">Chromogen</a> package from npm:

```
npm i chromogen
```

Scroll down if you are looking to test Hooks.
<br /><br /><br />

## ChromogenObserver (Recoil)

Before using Chromogen, you'll need to make two changes to your application:

1. Import the `<ChromogenObserver />` component as a child of `<RecoilRoot />`
1. Import `atom` and `selector` functions from Chromogen instead of Recoil. Chromogen has engineered `atom` and `selector` to track state changes.

<i>Note: These changes do have a small performance cost, so they should be reverted before deploying to production.</i>
<br /><Br/>

### React Component

```jsx
import React from 'react';
import { RecoilRoot } from 'recoil';
import { ChromogenObserver } from 'chromogen';
import MyComponent from './components/MyComponent.jsx';

const App = (props) => (
  <RecoilRoot>
    <ChromogenObserver />
    <MyComponent {...props} />
  </RecoilRoot>
);

export default App;
```

By default, Chromogen uses atom & selector keys to generate import statements in the test file. If your source code variable names don't match their assigned keys (such as when using _UUID_), you can optionally pass a `store` prop containing all your import atoms & selectors.
<br>

```jsx
import * as store from './store';
// ...
<ChromogenObserver store={store} />;
```

OR

```jsx
import * as atoms from './store/atoms';
import * as selectors from './store/selectors';
import * as misc from './store/arbitraryRecoilState';
// ...
<ChromogenObserver store={[atoms, selectors, misc]} />;
```

<Br/>

### Imports

```js
import { atom, selector } from 'chromogen';

export myAtom = atom({key: 'myAtom', default: true});
export mySelector = selector({key: 'mySelector', get: ({ get }) => !get(myAtom)});
```

<br />

## Usage

![usage demo](./assets/README-gifs/recoilToDo_Demo.gif)
<Br>

1. After installing Chromogen and following the above directionsa accordingly, launch your application as you normally would.

2. Two buttons will appear in the lower left corner. The play (left) button toggles test recording on and off. It will always start automatically by default. The download (right) button generates and downloads the test file containing all cumulative recorded tests.

3. After completing all the interactions you'd like to test, click the download button and drag-and-drop the resulting file into your application's test folder.

4. Before running any tests, you'll need to update the line `<ADD STORE FILEPATH>` with the correct filepath to your Recoil store.

<br /><br /><br />

## HooksChromogenObserver (React Hooks)

Before using Chromogen, you'll need to make two changes to your application:

1. Import the `<HooksChromogenObserver />` component and wrap it around the parent most `<App />`
2. Import `useState` function from Chromogen instead of React. Chromogen has engineered `useState` to track state changes.

### React Component

To track state changes in your application's useState Hooks, import HooksChromogenObserver in index.js (or the file your application's uppermost parent component is stored) and wrap it around your App. Now Chromogen's useState will become available throughout your app.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HooksChromogenObserver } from 'chromogen';

ReactDOM.render(
    <HooksChromogenObserver name="App">
      <App />
    </HooksChromogenObserver>
  document.getElementById('root'),
);
```

By default, Chromogen requires a second parameter in the useState hooks as `id` to generate a test suite for the user's application.

Wherever you import useState from React in your file, import useState from Chromogen instead. To have Chromogen track your application's state changes and generate a test suite, import Chromogen's `useState`:

```jsx
import React from 'react';
import { useState as hooksUseState } from 'chromogen';

const App: React.FC = () => {
  const [elements, setElements] = hooksUseState<number[]>([0], "id");
  return (...)
};
```

<i>Note: Only track one useState Hook at a time for accurate test suite generation.</i>
<br><Br>

### Coverage

Chromogen produces unit tests for the useState Hook and synchronous Recoil
selectors, including readonly selectors, writeable selectors, and
selectorFamilies (_coming soon_). Currently, it does _not_ generate tests for any other Hooks or asynchronous selectors due to their unique mocking requirements; Chromogen
identifies and excludes these cases at runtime without issue.
<Br><Br>

### DevTool

![devtool test](./assets/README-gifs/devTool_test.gif)

If the injected control buttons interfere with your application, you can optionally download [Chromogen's DevTool](https://chrome.google.com/webstore/detail/chromogen/cciblhdjhpdbpeenlnnhccooheamamnd?hl=en-US) extension. This will move the control buttons into a DevTool panel with no change in functionality.
<Br><br>

## Chromogen is currently in active Beta

Please visit our [main repo](https://github.com/oslabs-beta/Chromogen) for more detailed instructions, as well as any bug reports, support issues, or feature requests.
