// /* eslint-disable */
// import type { useState } from 'react';
// /* eslint-enable */

// // Recording toggle
// export const hooksRecordingState: useState<boolean> = {
//   key: 'recordingState',
//   default: true,
// };

import React, { Reducer } from "react"
import { Store } from "redux"

type UnsubscribeFn = () => void

export type EnhancedStore = Store & {
  registerHookedReducer: (
    reducer: Reducer<any, any>,
    initialState: any,
    reducerId: string | number
  ) => UnsubscribeFn
}

export const StateInspectorContext = React.createContext<
  EnhancedStore | undefined
>(undefined)