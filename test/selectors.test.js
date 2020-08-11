import { renderRecoilHook } from 'react-recoil-hooks-testing-library';
import { todoListState, todoListFilterState, filteredTodoListState } from '../src/store/store';


test('filteredTodoListState should correctly derive state', () => {
  // first arg is callback function (the hook to be tested)
  const { result } = renderRecoilHook(() => filteredTodoListState, {
    states: [
      {
        recoilState: todoListFilterState,
        initialValue: 'Show Completed',
      },
      {
        recoilState: todoListState,
        initialValue: [{id: 0, test: 'make hamburgers', priority: 'high', isComplete: true}],
      },
    ],
  });

  expect([result.current]).toBe(0);
});
