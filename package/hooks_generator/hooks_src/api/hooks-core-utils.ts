// similar function logic as wrapSetter (recoil)
// If transactions length === 0, use closure to reset boolean
// If we are recording state, and our transactions length > 0, create flag for promise check, debounce, setTimeout to pass in new state value (curr state), return setState function with the user passed in values
// v
//returnedPromise, settimeout, return closure function: promise check and debounce, return setState function with the user passed in values
