<div align="center">

<a href="https://chromogen.dev">
  <img
    height="200"
    width="450"
    alt="Chromogen logo"
    src="./assets/logo/Chromogen-1 (2).png"
  />
</a>

<h3>A UI-driven test-generation package for <a href= https://github.com/pmndrs/zustand> Zustand</a> Stores and <a href="https://github.com/facebookexperimental/Recoil">Recoil.js</a> selectors.</h3>

<br />

<!--- Update coverage badge to main repo once Coveralls permission is granted --->

[![npm version](https://img.shields.io/npm/v/chromogen)](https://www.npmjs.com/package/chromogen)
[![Build Status](https://travis-ci.com/open-source-labs/Chromogen.svg?branch=master)](https://travis-ci.org/oslabs-beta/Chromogen)
[![Coverage Status](https://coveralls.io/repos/github/open-source-labs/Chromogen/badge.svg?branch=master)](https://coveralls.io/github/oslabs-beta/Chromogen?branch=master)
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oslabs-beta/Chromogen/blob/master/LICENSE)

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=CHROMOGEN%20-%20A%20UI-driven%20Jest%20test%20generator%20for%20Recoil%20apps%0A&url=https://www.npmjs.com/package/Chromogen&hashtags=React,Recoil,Jest,testing)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![npm downloads](https://img.shields.io/npm/dm/chromogen)](https://www.npmjs.com/package/chromogen)
[![Github stars](https://img.shields.io/github/stars/oslabs-beta/Chromogen?style=social)](https://github.com/open-source-labs/Chromogen)
<br />

</div>
<br />

## Table of Contents

- [Overview](#overview)
- [Usage for All Apps](#usage-for-all-apps)
- [Installation for Zustand Apps](#installation-for-zustand-apps)
- [Zustand Test Setup](#zustand-test-setup)
- [Installation for Recoil Apps](#installation-for-recoil-apps)
- [Recoil Test Setup](#recoil-test-setup)
- [Contributing](#contributing)
- [Core Team](#core-team)
- [License](#license)
  <Br><br />


## Overview

You're an independent developer or part of a lean team. You want reliable unit tests for your new Zustand or React-Recoil app, but you need to move fast and time is a major constraint. More importantly, you want your tests to reflect how your users interact with the application, rather than testing implementation details.
<br><Br>


[Enter Chromogen - Now on version 4.0](https://www.npmjs.com/package/chromogen). Chromogen is a Jest unit-test generation tool for Zustand Stores and Recoil selectors. It captures state changes during user interaction and auto-generates corresponding test suites. Simply launch your application after following the installation instructions below, interact as a user normally would, and with one click you can download a ready-to-run Jest test file. Alternatively, you can copy the generated tests straight to your clipboard.

### Chromogen is now compatible with React V18!

<br><Br>

---

<b>FOR ZUSTAND APPS</b>

Chromogen currently supports two types of testing for Zustand applications:

1. **Initial Store State** on page load.
2. **Store State Changes** whenever an action is invoked on the store.

On initial render, Chromogen captures store state as a whole and keeps track of any subsequent state changes.  In order to generate tests, you'll need to make some changes to how your store is created.

Importing ChromogenObserver and rendering it in your App component is necessary in order to download your unit tests

<br><Br>
<hr>
<b>FOR RECOIL APPS</b>

Chromogen currently supports three main types of tests for Recoil apps:

1. **Initial selector values** on page load
2. **Selector return values** for a given state, using snapshots captured after each state transaction.
3. **Selector _set_ logic** asserting on resulting atom values for a given `newValue` argument and starting state.

These test suites will be captured for _synchronous_ selectors and selectorFamilies only. However, the presence of asyncronous selectors in your app should not cause any issues with the generated tests. Chromogen can identify such selectors at run-time and exclude them from capture.

At this time, we have no plans to introduce testing for async selectors; the mocking requirements are too opaque and fragile to accurately capture at runtime.

By default, Chromogen uses atom and selector keys to populate the import & hook statements in the test file. If your source code does _not_ use matching variable and key names, you will need to pass the imported atoms and selectors to the ChromogenObserver component as a `store` prop. The installation instructions below contain further details.

<br><Br>
<hr>

### USAGE FOR ALL APPS
After following the installation steps above, launch your application as normal. You should see two buttons in the bottom left corner.

<div align="center">

![Buttons](./assets/README-root/zustanddemo.gif)

</div>

The pause button on the left is the **pause recording** button. Clicking it will pause recording, so that no tests are generated during subsequent state changes. Pausing is useful for setting up a complex initial state with repetitive actions, where you don't want to test every step of the process.

The button in the middle is the **download** button. Clicking it will download a new test file that includes _all_ tests generated since the app was last launched or refreshed.

The button on the right is the **copy-to-clipboard** button. Clicking it will copy your tests, including _all_ tests generated since the app was last launched or refreshed.

Once you've recorded all the interactions you want to test, click the pause button and then the download button to generate the test file or press copy to copy to your clipboard. You can now drag-and-drop the downloaded file into your app's test directory or paste the code in your new file. **Don't forget to add the source path in your test file**

You're now ready to run your tests! After running your normal Jest test command, you should see a test suite for `chromogen.test.js`.

The current tests check whether state has changed after an interaction and checks whether the resulting state change variables have been updated as expected.


<Br>

---

### Download the Chromogen package from npm

```
npm install chromogen
```

<br>

---

### Installation for Zustand Apps
Before using Chromogen, you'll need to make two changes to your application:

1. Import the `<ChromogenZustandObserver />` component and render it alongside any other components in `<App />`
2. Import `chromogenZustandMiddleware` function from Chromogen. This will be used as middleware when setting up your store.

### Import the ChromogenZustandObserver component

Import `ChromogenZustandObserver`. ChromogenZustandObserver can be rendered alongside any other components in `<App />`.

```jsx
import React from 'react';
import { ChromogenZustandObserver } from 'chromogen';
import TodoList from './TodoList';

const App = () => (
    <>
        <ChromogenZustandObserver />
        <TodoList />
    </>
);

export default App;
```

Import `chromogenZustandMiddleware`. When you call create, wrap your store function with chromogenZustandMiddleware.  **Note**, when using chromogenZustandMiddleware, you'll need to provide some additional arguments into the set function.
1. *Overwrite State* (boolean) - Without middleware, this defaults to `false`, but you'll need to explicitly provide a value when using Chromogen.
2. *Action Name* - Used for test generation
3. *Action Parameters* - If the action requires input parameters, pass these in after the Action Name.

```jsx
import { chromogenZustandMiddleware } from 'chromogen';
import create from 'zustand'

const useStore = create(chromogenZustandMiddleware((set) => {
  counter: 0,
  color: 'black',
  prioritizeTask: ['walking', 5],
  addCounter: () => set(() => {counter: counter += 1}, false, 'addCounter'),
  changeColor: (newColor) => set(() => {color: newColor}, false, 'changeColor', newColor),
  setTaskPriority: (task, priority) => set(() => {prioritizeTask: [task, priority]}, false, 'setTaskPriority', task, priority)
}))

export default useStore;
```

<br>

---

### ZUSTAND TEST SETUP

Before running the test file, you'll need to specify the import path for your store by replacing `<ADD STORE FILEPATH>`. The default output assumes that all stores are imported from a single path; if that's not possible, you'll need to separately import each set of stores from their appropriate path.

|                          **BEFORE**                           |                          **AFTER**                           |
| :-----------------------------------------------------------: | :----------------------------------------------------------: |
| ![Default Filepath](./assets/README-root/zustand-test-filepath-1.png) | ![Updated Filepath](./assets/README-root/zustand-test-filepath-2.png) |


<div align="center">

![Test Output](./assets/README-root/zustand-test-snapshot-2.png)

</div>

<br>

---

### Recoil Demo To-Do App

Chromogen's [official Recoil demo app](demo-todo/README.md) provides a ready-to-run Recoil frontend with a number of different selector implementations to test against. It's available in the `demo-todo` folder of this repository and comes with Chromogen pre-installed; just run `npm install && npm start` to launch.

<br>

---

## Installation for Recoil Apps

Before running Chromogen, you'll need to make two changes to your application:

1. Import the `<ChromogenObserver />` component as a child of `<RecoilRoot />`
1. Import the `atom` and `selector` functions from Chromogen instead of Recoil

<i>Note: These changes do have a small performance cost, so they should be reverted before deploying to production.</i>

<br>

---

### Import the ChromogenObserver component

ChromogenObserver should be included as a direct child of RecoilRoot. It does not need to wrap any other components, and it takes no mandatory props. It utilizes Recoil's TransactionObserver Hook to record snapshots on state change.

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

If you are using pseudo-random key names, such as with _UUID_, you'll need to pass all of your store exports to the ChromogenObserver component as a `store` prop. This will allow Chromogen to use source code variable names in the output file, instead of relying on keys. When all atoms and selectors are exported from a single file, you can pass the imported module directly:

```jsx
import * as store from './store';
// ...
<ChromogenObserver store={store} />;
```

If your store utilizes seprate files for various pieces of state, you can pass all of the imports in an array:

```jsx
import * as atoms from './store/atoms';
import * as selectors from './store/selectors';
import * as misc from './store/arbitraryRecoilState';
// ...
<ChromogenObserver store={[atoms, selectors, misc]} />;
```

<br>

---

### Import atom & selector functions from Chromogen

Wherever you import `atom` and/or `selector` functions from Recoil (typically in your `store` file), import them from Chromogen instead. The arguments passed in do **not** need to change in any away, and the return value will still be a normal RecoilAtom or RecoilSelector. Chromogen wraps the native Recoil functions to track which pieces of state have been created, as well as when various selectors are called and what values they return.

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
  },
});
```

<br>

---

### RECOIL TEST SETUP

Before running the test file, you'll need to specify the import path for your store by replacing `<ADD STORE FILEPATH>`. The default output assumes that all atoms and selectors are imported from a single path; if that's not possible, you'll need to separately import each set of atoms and/or selectors from their appropriate path.

|                          **BEFORE**                           |                          **AFTER**                           |
| :-----------------------------------------------------------: | :----------------------------------------------------------: |
| ![Default Filepath](./assets/README-root/filepath-before.png) | ![Updated Filepath](./assets/README-root/filepath-after.png) |

You're now ready to run your tests! Upon running your normal Jest test command, you should see three suites for `chromogen.test.js`:

<div align="center">

![Test Output](./assets/README-root/test-output.png)

</div>

**Initial Render** tests whether each selector returns the correct value at launch. There is one test per selector.

**Selectors** tests the return value of various selectors for a given state. Each test represents the app state after a transaction has occured, generally triggered by some user interaction. For each selector that ran after that transaction, the test asserts on the selector's return value for the given state.

**Setters** tests the state that results from setting a writeable selector with a given value and starting state. There is one test per set call, asserting on each atom's value in the resulting state.

<br><br>

---

## Contributing

**We expect all contributors to abide by the standards of behavior outlined in the [Code of Conduct](CODE_OF_CONDUCT.md).**

We welcome community contributions, including new developers who've never [made an open source Pull Request before](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github). If you'd like to start a new PR, we recommend [creating an issue](https://docs.github.com/en/github/managing-your-work-on-github/creating-an-issue) for discussion first. This lets us open a conversation, ensuring work is not duplicated unnecessarily and that the proposed PR is a fix or feature we're actively looking to add.

### Bugs

Please [file an issue](https://docs.github.com/en/github/managing-your-work-on-github/creating-an-issue) for bugs, missing documentation, or unexpected behavior.

### Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps us prioritize what to work on.

### Questions

For any questions and concerns related to using the package, feel free to message us via LinkedIn .
<br><Br>

## Core Team

<br>

<table>
  <tr align="center">
    <td align="center"><a href="https://github.com/michellebholland"><img src="https://avatars3.githubusercontent.com/u/64747593" width="100px;" alt=""/><br /><sub><b>Michelle Holland</b></sub></a></td>
    <!-- SPACE -->
    <td align="center"><a href="https://github.com/andywang23"><img src="https://avatars1.githubusercontent.com/u/64433815" width="100px;" alt=""/><br /><sub><b>Andy Wang</b></sub></a></td>
    <!-- SPACE -->
    <td align="center"><a href="https://github.com/connorrose"><img src="https://avatars1.githubusercontent.com/u/42079810" width="100px;" alt=""/><br /><sub><b>Connor Rose Delisle</b></sub></a></td>
    <!-- SPACE -->
    <td align="center"><a href="https://github.com/chenchingk"><img src="https://avatars0.githubusercontent.com/u/40308081" width="100px;" alt=""/><br /><sub><b>Jim Chen</b></sub></a></td>
   <!-- SPACE -->
  <td align="center"><a href="https://github.com/amyy98"><img src="https://avatars.githubusercontent.com/u/68040348?v=4" width="100px;" alt=""/><br /><sub><b>Amy Yee</b></sub></a></td>
     <!-- SPACE -->
      <td align="center"><a href="https://github.com/wlstjs"><img src="https://avatars1.githubusercontent.com/u/68680285?s=400&u=5b89d376d4d27a77442b74dcfe1c9c4025ce6453&v=4" width="100px;" alt=""/><br /><sub><b>Jinseon Shin</b></sub></a></td>
   <!-- SPACE -->
       <td align="center"><a href="https://github.com/rtumel123"><img src="https://i.postimg.cc/MGDTWMhQ/Ryan.jpg" width="100px;" alt=""/><br /><sub><b>Ryan Tumel</b></sub></a></td>
       <!-- SPACE -->
         <td align="center"><a href="https://github.com/cgreer011"><img src="https://i.postimg.cc/qMPgQdsz/cam.jpg" width="100px;" alt=""/><br /><sub><b>Cameron Greer</b></sub></a></td>
          <!-- SPACE -->
         <td align="center"><a href="https://github.com/nicholasjs"><img src="https://avatars.githubusercontent.com/u/59386257?v=4" width="100px;" alt=""/><br /><sub><b>Nicholas Shay</b></sub></a></td>
</tr>
<tr align="center">
              <!-- SPACE -->
         <td align="center"><a href="https://github.com/mp-04"><img src="https://i.postimg.cc/nz6GjXXV/mp.jpg" width="100px;" alt=""/><br /><sub><b>Marcellies Pettiford</b></sub></a></td>
    <!-- SPACE -->
         <td align="center"><a href="https://github.com/smk53664"><img src="https://i.postimg.cc/mrRkfN64/sung.jpg" width="100px;" alt=""/><br /><sub><b>Sung Kim</b></sub></a></td>
    <!-- SPACE -->
         <td align="center"><a href="https://github.com/lina4lee"><img src="https://i.postimg.cc/bJwvdYhF/lina.jpg" width="100px;" alt=""/><br /><sub><b>Lina Lee</b></sub></a></td>
    <!-- SPACE -->
         <td align="center"><a href="https://github.com/ericaysoh"><img src="https://i.postimg.cc/76tZzvPP/erica.jpg" width="100px;" alt=""/><br /><sub><b>Erica Oh</b></sub></a></td>
    <!-- SPACE -->
         <td align="center"><a href="https://github.com/dtalmaraz"><img src="https://avatars.githubusercontent.com/u/94757231?v=4" width="100px;" alt=""/><br /><sub><b>Dani Almaraz</b></sub></a></td>
<tr align="center">
    <!-- SPACE -->
         <td align="center"><a href="https://github.com/crgb0s"><img src="https://i.postimg.cc/BbpvdSJD/craig.jpg" width="100px;" alt=""/><br /><sub><b>Craig Boswell</b></sub></a></td>
    <!-- SPACE -->
         <td align="center"><a href="https://github.com/Hali3030"><img src="https://i.postimg.cc/xTj7Yf0C/hussein.jpg" width="100px;" alt=""/><br /><sub><b>Hussein Ahmed</b></sub></a></td>
    <!-- SPACE -->
         <td align="center"><a href="https://github.com/iannkila"><img src="https://i.postimg.cc/rwcBD1C8/ian.jpg" width="100px;" alt=""/><br /><sub><b>Ian Kila</b></sub></a></td>
    <!-- SPACE -->
         <td align="center"><a href="https://github.com/yuehaowong"><img src="https://i.postimg.cc/T2JqRnwj/yuehao.jpg" width="100px;" alt=""/><br /><sub><b>Yuehao Wong</b></sub></a></td>        
</tr>

<tr align="center">
</tr>
</table>
<br><br>

## LICENSE

Logo crafted with [AdobeExpress](https://www.adobe.com/express/) 

README format adapted from [react-testing-library](https://github.com/testing-library/react-testing-library/blob/master/README.md) under [MIT license](https://github.com/testing-library/react-testing-library/blob/master/LICENSE).

All Chromogen source code is [MIT](./LICENSE) licensed.

Lastly, shoutout to [this repo](https://github.com/conorhastings/redux-test-recorder) for the original inspiration.
