/* Reset CSS section */
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html,
body,
#root // for create-react-app  
{
  height: 100%;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

h2 {
  font-size: 36px;
}

#root,
#__next {
  isolation: isolate;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-default: #222;
    --background-body: #161616;
    --background-button: #dbdbdb;
    --background-button-hover: #fafafa;
    --card-background: #323232;
    --card-border: #000;
    --input-background: #333;
    --input-border: #222;
    --input-border-hover: #222;
    --font-default: #ffffff;
    --font-secondary: #8e8e8e;
    --font-tertiary: #666;
    --font-button: #161616;
    --font-link: rgb(0, 149, 246);
    --font-error: rgba(220, 70, 70, .6);
    --background-error: rgba(220, 70, 70, .3);
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --background-default: #fff;
    --background-body: #fafafa;
    --background-button: #323232;
    --background-button-hover: #161616;
    --card-background: #fff;
    --card-border: #dbdbdb;
    --input-background: #eee;
    --input-border: #dbdbdb;
    --input-border-hover: #191919c2;
    --font-default: #191919;
    --font-secondary: #8e8e8e;
    --font-tertiary: #8e8e8e;
    --font-button: #fafafa;
    --font-link: rgb(0, 149, 246);
    --font-error: rgba(220, 70, 70, .6);
    --background-error: rgba(220, 70, 70, .3);
  }
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  box-sizing: border-box;
}

#app {
  height: 100%;
  width: 100%;
}
`;

export default GlobalStyle;
