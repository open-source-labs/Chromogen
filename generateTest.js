// priorState will be an array of objects
export default function generateTest({ selector, priorState, resultState }) {
  return `test('${selector.key} should correctly derive state, () => {
  const { result } = renderRecoilHook(${selector}, {
    states: [{ recoilState: ${priorState[0].recoilState}, initialValue: ${priorState[0].initialValue} }],
  });

  expect(result.current).toBe(${resultState});
})`;
}
