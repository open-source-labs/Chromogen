/* eslint-disable */
// import type {

// } from '../types';
/* eslint-enable */

/* ----- HELPER FUNCTIONS ----- */

export function importZustandStore(): string {
  return `import\tuseStore\t`;
}

export function testInitialState(initialRender: {}): string {
  return Object.entries(initialRender).reduce((acc, [k, v]) => {
    return acc + `\tit('${k} should initialize correctly', () => {\n\t\texpect(result.current.${k}).toStrictEqual(${JSON.stringify(v)});\t});\n\n`
  }, '')
}