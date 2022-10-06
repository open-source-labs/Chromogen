import { ledger } from '../src/utils/ledger';
import { chromogen } from '../src/api/api';
import { renderHook, act } from '@testing-library/react';
import create from 'zustand';

// testing chromogen middleware
describe('chromogen', () => {
    // destructuring atoms from ledger interface in utils folder
    it('is a function', () => {
        expect(typeof chromogen).toBe('function');
    });

    it('should update ledger upon invocation', () => {
        // creating a mock store
        const useStore = create(chromogen(
            (set) => ({
                count: 0,
                increment: () => {
                    set(state => ({ count: count + 1 }), false, 'increment')
                }
            })
        ));
        //rendering the useStore Hook
        const { result } = renderHook(useStore);

        // verifying atoms property (array) on ledger has been updated with input atom
        expect(ledger.initialRender).toStrictEqual({ count: 0 });
    });
});