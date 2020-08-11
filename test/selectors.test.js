import { renderRecoilHook } from 'react-recoil-hooks-testing-library';
import { todoListState, todoListFilterState, filteredTodoListState } from '../src/store/store';

// using react testing library alone might make more sense
test('filteredTodoListState should correctly derive state', () => {
  // first arg needs to be custom hook
  const { result } = renderRecoilHook(() => filteredTodoListState, {
    states: [
      {
        recoilState: todoListFilterState,
        initialValue: 'Show Completed',
      },
      {
        recoilState: todoListState,
        initialValue: [{ id: 0, test: 'make hamburgers', priority: 'high', isComplete: true }],
      },
    ],
  });

  expect(result.current).toBe(0);
});
