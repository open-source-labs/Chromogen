import { renderHook, act } from '@testing-library/react';
import useStore from '../src/store/store';

describe('INITIAL RENDER', () => { 
  const { result } = renderHook(useStore); 
  
  	it('todoListState should initialize correctly', () => {
		expect(result.current.todoListState).toStrictEqual([]);
	});

	it('todoListFilterState should initialize correctly', () => {
		expect(result.current.todoListFilterState).toStrictEqual("Show All");
	});

	it('todoListSortState should initialize correctly', () => {
		expect(result.current.todoListSortState).toStrictEqual(false);
	});

	it('quoteText should initialize correctly', () => {
		expect(result.current.quoteText).toStrictEqual("");
	});

	it('quoteNumber should initialize correctly', () => {
		expect(result.current.quoteNumber).toStrictEqual(0);
	});

	it('checkBox should initialize correctly', () => {
		expect(result.current.checkBox).toStrictEqual(false);
	});

	it('searchResultState should initialize correctly', () => {
		expect(result.current.searchResultState).toStrictEqual({"all":{"searchTerm":"","results":[]},"high":{"searchTerm":"","results":[]},"medium":{"searchTerm":"","results":[]},"low":{"searchTerm":"","results":[]}});
	});


});


describe('STATE CHANGES', () => { 
  const { result } = renderHook(useStore);
 
  
	it('checkBox & quoteText & todoListState should update correctly', () => {
      const { result } = renderHook(useStore);
  
      act(() => {
	result.current.setCheckBox();
	result.current.setCheckBox();
	result.current.changeQuoteText("\"Imagination is the highest kite one can fly.\"\n\t- Lauren Bacall");
	result.current.addTodoListItem({"id":2,"text":"soccer","priority":"low","isComplete":false});

});
  
      
expect(result.current.checkBox).toStrictEqual(true);
expect(result.current.quoteText).toStrictEqual("\"Imagination is the highest kite one can fly.\"\n\t- Lauren Bacall");
expect(result.current.todoListState).toStrictEqual([{"id":2,"text":"soccer","priority":"low","isComplete":false}]);  
    });
	it('checkBox & todoListState should update correctly', () => {
      const { result } = renderHook(useStore);
  
      act(() => {
	result.current.setCheckBox();
	result.current.setCheckBox();
	result.current.addTodoListItem({"id":3,"text":"tennis","priority":"low","isComplete":false});
	result.current.setCheckBox();

});
  
      
expect(result.current.checkBox).toStrictEqual(false);
expect(result.current.todoListState).toStrictEqual([{"id":2,"text":"soccer","priority":"low","isComplete":false},{"id":3,"text":"tennis","priority":"low","isComplete":false}]);  
    });
	it('todoListState & quoteText & searchResultState should update correctly', () => {
      const { result } = renderHook(useStore);
  
      act(() => {
	result.current.addTodoListItem({"id":4,"text":"basketball","priority":"low","isComplete":false});
	result.current.setCheckBox();
	result.current.changeQuoteText("\"Luck is what happens when preparation meets opportunity.\"\n\t- Seneca");
	result.current.setSearchState("b", "all");

});
  
      
expect(result.current.todoListState).toStrictEqual([{"id":2,"text":"soccer","priority":"low","isComplete":false},{"id":3,"text":"tennis","priority":"low","isComplete":false},{"id":4,"text":"basketball","priority":"low","isComplete":false}]);
expect(result.current.quoteText).toStrictEqual("\"Luck is what happens when preparation meets opportunity.\"\n\t- Seneca");
expect(result.current.searchResultState).toStrictEqual({"all":{"searchTerm":"b","results":[{"id":4,"text":"basketball","priority":"low","isComplete":false}]},"high":{"searchTerm":"","results":[]},"medium":{"searchTerm":"","results":[]},"low":{"searchTerm":"","results":[]}});  
    });
	it('searchResultState should update correctly', () => {
      const { result } = renderHook(useStore);
  
      act(() => {
	result.current.setSearchState("ba", "all");

});
  
      
expect(result.current.searchResultState).toStrictEqual({"all":{"searchTerm":"ba","results":[{"id":4,"text":"basketball","priority":"low","isComplete":false}]},"high":{"searchTerm":"","results":[]},"medium":{"searchTerm":"","results":[]},"low":{"searchTerm":"","results":[]}});  
    });
	it('searchResultState should update correctly', () => {
      const { result } = renderHook(useStore);
  
      act(() => {
	result.current.setSearchState("bas", "all");

});
  
      
expect(result.current.searchResultState).toStrictEqual({"all":{"searchTerm":"bas","results":[{"id":4,"text":"basketball","priority":"low","isComplete":false}]},"high":{"searchTerm":"","results":[]},"medium":{"searchTerm":"","results":[]},"low":{"searchTerm":"","results":[]}});  
    });
	it('searchResultState should update correctly', () => {
      const { result } = renderHook(useStore);
  
      act(() => {
	result.current.setSearchState("bask", "all");

});
  
      
expect(result.current.searchResultState).toStrictEqual({"all":{"searchTerm":"bask","results":[{"id":4,"text":"basketball","priority":"low","isComplete":false}]},"high":{"searchTerm":"","results":[]},"medium":{"searchTerm":"","results":[]},"low":{"searchTerm":"","results":[]}});  
    });
	it('searchResultState & todoListState should update correctly', () => {
      const { result } = renderHook(useStore);
  
      act(() => {
	result.current.setSearchState("baske", "all");
	result.current.toggleItemCompletion(4);
	result.current.setCheckBox();

});
  
      
expect(result.current.searchResultState).toStrictEqual({"all":{"searchTerm":"baske","results":[{"id":4,"text":"basketball","priority":"low","isComplete":false}]},"high":{"searchTerm":"","results":[]},"medium":{"searchTerm":"","results":[]},"low":{"searchTerm":"","results":[]}});
expect(result.current.todoListState).toStrictEqual([{"id":2,"text":"soccer","priority":"low","isComplete":false},{"id":3,"text":"tennis","priority":"low","isComplete":false},{"id":4,"text":"basketball","priority":"low","isComplete":true}]);  
    });
});