//potentially a component to track state changes of user App

//define a function that records previous and current state using useEffect and useRef
//export the function & import into HooksChromogenObserver.ts

/*Flow of Chromgen 2.0

- Use regex to determine whether user is using Recoil or React hooks (can only be one or the other, not testing for both, for now)

1. user imports Chromogen useState and useReducer
2. user performs state changing events
 a)hooks obersver stores every change of state
 b)tracking state changes to make sure their hooks are updating state
3. user stops recording
  a)on-click generate tests for useState and useReducer
    i) user current state should not equal previous state
    ii) user current state should not equal undefined or null
4. export the generated test file in output
5. import test file into modal.ts
6. In Modal.ts, render a modal with test file
7. User decides whether to keep the file or not
  a) on-click of download button, send the file to the user
  b) on-click of cancel button, close modal
8. Make sure Chrome dev tool is reading from package correctly as well

Look into React.createContext and useContext for hook obersver logic */
