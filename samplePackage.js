// import {selector, atom} from 'recoil'
/* APi refs to shadow:
  selector()
  get()?
  set()?
*/
// export {
  let selectorkey;
  let priorState = [];
  let updatedValue;

  let inSelector = false;

  ourSelector(obj) {
    inSelector = true;
    const selectorkey = obj.key;
    const selectorget = obj.get;
    // if there is no setter, the selector.get return value will be our 
    // test result


    // store the values of get(value) for test purposes in an array
    const selectorset = obj.set;
    // if there is a set, that return value will be our test result
    // store the selector key and selector object to include in the test
    inSelector = false;
    // return the recoil version of selecor(obj)
  } 

  ourGet(atom) {
    if (inSelector) {
      const value = get(atom)
      const valueItem = {
        recoilValue: atomValue.key,
        initialValue: value
      }
      priorState.append(valueItem)
    }
    return get(atomValue)
  }
// }