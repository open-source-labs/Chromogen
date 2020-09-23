<div align="center">

<a href="https://www.npmjs.com/package/Chromogen">
  <img
    height="145"
    width="625"
    alt="Chromogen logo"
    src="./assets/logo/chromogen-banner.png"
  />
</a>

<h3>A UI-driven test-generation package for <a href="https://github.com/facebookexperimental/Recoil">Recoil</a> selectors.</h3>

<br />

<!--- Update coverage badge to main repo once Coveralls permission is granted --->
[![npm version](https://img.shields.io/npm/v/chromogen)](https://www.npmjs.com/package/chromogen)
[![Build Status](https://travis-ci.com/open-source-labs/Chromogen.svg?branch=master)](https://travis-ci.org/oslabs-beta/Chromogen)
[![Coverage Status](https://coveralls.io/repos/github/open-source-labs/Chromogen/badge.svg?branch=master)](https://coveralls.io/github/oslabs-beta/Chromogen?branch=master)
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oslabs-beta/Chromogen/blob/master/LICENSE)

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=CHROMOGEN%20-%20A%20UI-driven%20Jest%20test%20generator%20for%20Recoil%20apps%0A&url=https://www.npmjs.com/package/Chromogen&hashtags=React,Recoil,Jest,testing)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![npm downloads](https://img.shields.io/npm/dm/chromogen)](https://www.npmjs.com/package/chromogen)
[![Github stars](https://img.shields.io/github/stars/oslabs-beta/Chromogen?style=social)](https://github.com/oslabs-beta/Chromogen)

</div>

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Core Team](#core-team)
- [License](#license)

## Overview

You're an independent developer or part of a lean team. You want reliable unit tests for your new React-Recoil app, but you need to move fast and time is major constraint. More importantly, you want your tests to reflect how your users interact with the application, rather than testing implementation details.

[Enter Chromogen](https://www.npmjs.com/package/chromogen). Chromogen is a Jest unit-test generation tool for Recoil selectors. It captures state changes during user interaction and auto-generates corresponding test suites. Simply launch your application (after following the installation instructions below), interact as a user normally would, and with one click you'll download a ready-to-run Jest test file.

### Don't have a Recoil app handy?
Chromogen's [official demo app](demo-todo/README.md) provides a ready-to-run Recoil frontend with a number of different selector implementations to test against. It's available in the `demo-todo` folder of this repository and comes with Chromogen pre-installed; just run `npm install && npm start` to launch.

### Chromogen is currently in active Beta
Chromogen supports three main types of test:
  1. **Initial selector values** on page load
  2. **Selector return values** for a given state, using snapshots captured after each state transaction.
  3. **Selector _set_ logic** asserting on resulting atom values for a given `newValue` argument and starting state.

These test suites will be captured for _synchronous_ selectors and selectorFamilies only. However, the presence of asyncronous selectors in your app should not cause any issues with the generated tests. Chromogen can identify such selectors at run-time and exclude them from capture.

At this time, we have no plans to introduce testing for async selectors; the mocking requirements are too opaque and fragile to accurately capture at runtime. However, we are always open to suggestions to meet the needs of our userbase. Want to see this or any other feature added to the package? [Let us know!](#contributing)

By default, Chromogen uses atom and selector keys to populate the import & hook statements in the test file. If your source code does _not_ use matching variable and key names, you will need to pass the imported atoms and selectors to the ChromogenObserver component as a `store` prop. The installation instructions below contain further details.

_(09/15/20)_ **WARNING:** _Chromogen_ v1.3.x is only compatible with Recoil v0.0.10 currently. We are working on an update to enable compatibility with Recoil's new v0.0.11 release.

## Installation

Before running Chromogen, you'll need to make two changes to your application:
  1. Import the `<ChromogenObserver />` component as a child of `<RecoilRoot />`
  1. Import the `atom` and `selector` functions from Chromogen instead of Recoil

These changes do have a small performance cost, so they should be reverted before deploying to production.

### Download the Chromogen package from npm.

```
npm install chromogen
```

### Import the ChromogenObserver component
ChromogenObserver should be included as a direct child of RecoilRoot. It does not need to wrap any other components, and it takes no mandatory props. It utilizes Recoil's TransactionObserver hook to record snapshots on state change.

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

If you are using pseudo-random key names, such as with _UUID_, you'll need to pass all of your store exports to the ChromogenObserver component as a `store` prop. This will allow Chromogen to use source code variable names in the output file, instead of relying on keys. When all atoms and selectors are exported from a single file, you can pass the imported module directly:
```jsx
import * as store from './store';
  // ...
  <ChromogenObserver store={store} />
```

If your store utilizes seprate files for various pieces of state, you can pass all of the imports in an array:
```jsx
import * as atoms from './store/atoms';
import * as selectors from './store/selectors';
import * as misc from './store/arbitraryRecoilState';
  // ...
  <ChromogenObserver store={[atoms, selectors, misc]} />
```

### Import atom & selector functions from Chromogen
Wherever you import `atom` and/or `selector` functions from Recoil (typically in your `store` file), import them from Chromogen instead. The arguments passed in do **not** need to change in any away, and the return value will still be a normal RecoilAtom or RecoilSelector.  Chromogen wraps the native Recoil functions to track which pieces of state have been created, as well as when various selectors are called and what values they return.

```js
import { atom, selector } from 'chromogen';

export const fooState = atom({
  key: 'fooState',
  default: {},
});

export const barState = selector({
  key: 'barState',
  get: ({ get }) => {
    const derivedState = get(fooState);
    return derivedState.baz || 'value does not exist';
  }
})
```

## Usage
After following the installation steps above, launch your application as normal. You should see two buttons in the bottom left corner.

<div align="center">

![Buttons](./assets/README-root/buttons.png)

</div>

The green button, on the left, is the **download** button. Clicking it will download a new test file that includes _all_ tests generated since the app was last launched or refreshed.

The red button, on the right, is the **recording toggle**. Clicking it will pause recording, so that no tests are generated during subsequent state changes. Red indicates "recording in progress" and yellow means the recording is paused. Pausing is useful for setting up a complex initial state with repetitive actions, where you don't want to test every step of the process.

For example, if we want to test our to-do app's filter and sort buttons, we may want to have 10 or so different items with various priority levels and completion states. However, we don't necessarily want 10 separate tests just for adding items. We can instead add one or two items to generate tests for that functionality, then pause recording while we add the other 8 items. Once everything is added, we can resume recording to generate filter & sort tests with all 10 items present.

Once you've recorded all the interactions you want to test, click the green button to download the test file. You can now drag-and-drop the downloaded file into your app's test directory.

<div align="center">


![Download](./assets/README-root/download.png)&nbsp;&nbsp;&nbsp;&nbsp;![File](./assets/README-root/test-directory.png)

</div>

Before running the test file, you'll need to specify the import path for your store by replacing `<ADD STORE FILEPATH>`. The default output assumes that all atoms and selectors are imported from a single path; if that's not possible, you'll need to separately import each set of atoms and/or selectors from their appropriate path.

| **BEFORE** | **AFTER** |
|:----------:|:---------:|
|![Default Filepath](./assets/README-root/filepath-before.png)|![Updated Filepath](./assets/README-root/filepath-after.png)|

You're now ready to run your tests! Upon running your normal Jest test command, you should see three suites for `chromogen.test.js`:

<div align="center">

![Test Output](./assets/README-root/test-output.png)

</div>

**Initial Render** tests whether each selector returns the correct value at launch. There is one test per selector.

**Selectors** tests the return value of various selectors for a given state. Each test represents the app state after a transaction has occured, generally triggered by some user interaction. For each selector that ran after that transaction, the test asserts on the selector's return value for the given state.

**Setters** tests the state that results from setting a writeable selector with a given value and starting state. There is one test per set call, asserting on each atom's value in the resulting state.

### Chrome DevTool (Optional)
If the injected buttons interfere with the functioning or layout of your application, you can also control Chromogen through an optional DevTool panel. As soon as Chromogen detects that the panel has been opened and loaded, the injected buttons will disappear from the application view. The recording and download buttons on the panel work exactly the same as outlined above.

<div align="center">

![DevTool Panel](./assets/README-root/devtool-panel.png)

</div>

_Please Note:_ Chromogen's DevTool is currently under review with the Chrome Web Store. In the interim, the DevTool can be added as an unpacked extension by running `npm install && npm run build` in the `dev-tool` subdirectory and loading the resulting `build` folder.

## Contributing
**We expect all contributors to abide by the standards of behavior outlined in the [Code of Conduct](CODE_OF_CONDUCT.md).**

We welcome community contributions, including new developers who've never [made an open source Pull Request before](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github). If you'd like to start a new PR, we recommend [creating an issue](https://docs.github.com/en/github/managing-your-work-on-github/creating-an-issue) for discussion first. This lets us open a conversation, ensuring work is not duplicated unnecessarily and that the proposed PR is a fix or feature we're actively looking to add.

### Bugs

Please [file an issue](https://docs.github.com/en/github/managing-your-work-on-github/creating-an-issue) for bugs, missing documentation, or unexpected behavior.

### Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps us prioritize what to work on.

### Questions

For questions related to using the package, you may either file an issue or _gmail_ us: `chromogen.app`.

## Core Team
<table>
  <tr>
    <td align="center"><a href="https://github.com/michellebholland"><img src="https://avatars3.githubusercontent.com/u/64747593" width="150px;" alt=""/><br /><sub><b>Michelle Holland</b></sub></a></td>
    <!-- SPACE -->
    <td align="center"><a href="https://github.com/andywang23"><img src="https://avatars1.githubusercontent.com/u/64433815" width="150px;" alt=""/><br /><sub><b>Andy Wang</b></sub></a></td>
    <!-- SPACE -->
    <td align="center"><a href="https://github.com/connorrose"><img src="https://avatars1.githubusercontent.com/u/42079810" width="150px;" alt=""/><br /><sub><b>Connor Rose Delisle</b></sub></a></td>
    <!-- SPACE -->
    <td align="center"><a href="https://github.com/chenchingk"><img src="https://avatars0.githubusercontent.com/u/40308081" width="150px;" alt=""/><br /><sub><b>Jim Chen</b></sub></a></td>
  </tr>
  </table>

## LICENSE
Logo remixed from [ReactJS](https://github.com/reactjs/reactjs.org) under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and [Smashicons](https://www.flaticon.com/authors/smashicons) via [www.flaticon.com](https://www.flaticon.com/)

README format adapted from [react-testing-library](https://github.com/testing-library/react-testing-library/blob/master/README.md) under [MIT license](https://github.com/testing-library/react-testing-library/blob/master/LICENSE).

All Chromogen source code is [MIT](./LICENSE) licensed.

Lastly, shoutout to [this repo](https://github.com/conorhastings/redux-test-recorder) for the original inspiration.
