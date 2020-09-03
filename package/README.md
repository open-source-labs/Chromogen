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

<h3>A UI-driven Jest test-generation package for <a href="https://www.npmjs.com/package/recoil">Recoil</a> selectors.</h3>

<br />

[![npm version](https://img.shields.io/npm/v/chromogen)](https://www.npmjs.com/package/chromogen)
[![Build Status](https://travis-ci.org/oslabs-beta/Chromogen.svg?branch=master)](https://travis-ci.org/oslabs-beta/Chromogen)
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oslabs-beta/Chromogen/blob/master/LICENSE)

</div>

Chromogen is a Jest unit-test generation tool for Recoil selectors. It captures state changes during user interaction and auto-generates corresponding test suites. Simply launch your app after following the installation instructions below, interact as a user normally would, and with one click you'll download a ready-to-run Jest test file.

## Installation

Start by installing the **chromogen** package from npm:
```
npm i chromogen
```

Before using Chromogen, you'll need to make two changes to your application:
  1. Import the `<ChromogenObserver />` component as a child of `<RecoilRoot />`
  1. Import `atom` and `selector` functions from Chromogen instead of Recoil

These changes do have a small performance cost, so they should be reverted before deploying to production.

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
)

export default App;
```

By default, Chromogen uses atom & selector keys to generate import statements in the test file. If your source code variable names don't match their assigned keys (such as when using _UUID_), you can optionally pass a `store` prop containing all your import atoms & selectors.
```jsx
import * as store from './store';
  // ...
  <ChromogenObserver store={store} />
```
OR
```jsx
import * as atoms from './store/atoms';
import * as selectors from './store/selectors';
import * as misc from './store/arbitraryRecoilState';
  // ...
  <ChromogenObserver store={[atoms, selectors, misc]} />
```

### Imports
```js
import { atom, selector } from 'chromogen';

export myAtom = atom({key: 'myAtom', default: true});
export mySelector = selector({key: 'mySelector', get: ({ get }) => !get(myAtom)});
```

## Usage
  1. After installing Chromogen, launch your application as you normally would.
  2. Two buttons will appear in the lower left corner. The red (right) button toggles test recording on and off. It will always start on by default. The green (left) button downloads the test file containing all cumulative recorded tests.
  3. After completing all the interactions you'd like to test, click the download button and drag-and-drop the resulting file into your application's test folder.
  4. Before running any tests, you'll need to update the line `<ADD STORE FILEPATH>` with the correct filepath to your Recoil store.

### Coverage
  Chromogen produces unit tests for synchronous Recoil selectors, including readonly selectors, writeable selectors, and selectorFamilies. It does _not_ generate tests for any asynchronous selectors due to their unique mocking requirements; it is able to identify and exclude these cases at runtime without issue.

### DevTool
If the injected control buttons interfere with your application, you can optionally download Chromogen's DevTool extension (_pending approval by Chrome Web Store_). This will move the control buttons into a DevTool panel with no change in functionality.

## Chromogen is currently in active Beta
Please visit our [main repo](https://github.com/oslabs-beta/Chromogen) for more detailed instructions, as well as any bug reports, support issues, or feature requests.
