import *as types from '../constants/counterTypes';

const initialState = {
  count: 0,
}

export default function counter(state = initialState, action:INormalAction) {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      }
      break;
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      }
      break;
    default:
      return state;
  }
}
