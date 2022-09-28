import { renderHook, act } from '@testing-library/react';
import useStore from '../src/store/store';

describe('Updating state', () => {

  it('addTodoListItem should properly derive state when todoListState updates', () => {
    const { result } = renderHook(useStore);
    const { todoListState } = result.current;
    console.log({ todoListState })

    act(() => {
      result.current.addTodoListItem({ id: 1000, text: 'test 123', priority: 'low', isComplete: false });
    });

    console.log('just did act');

    console.log({ 'result.current.todoListState': result.current.todoListState })

    expect(result.current.todoListState).not.toStrictEqual(todoListState);

  });
});

const transactionSchema = {
  action: 'functionName',
  arguments: [],
  changed: {
    sliceOfState: {
      before: 'any',
      after: 'any'
    }
  }
}