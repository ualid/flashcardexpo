import { RECEIVE_DECK, ADD_ENTRY, UPDATE_DECK } from '../actions/deck'
import cloneDeep from 'lodash/cloneDeep';

const INITIAL_STATE = {
  decks: {}
}

function decks (state = {}, action) {
  const {payload, type} = action;
  console.log('action ', action,  ' payload ', payload)
  switch (type) {
    case RECEIVE_DECK :
      return {
        ...state,
        ...payload,
      }
      case ADD_ENTRY :
        return {
          ...state,
          ...payload,
        }
        
      case UPDATE_DECK :
      let decks = cloneDeep(state)
      delete decks[payload.id]
      decks[payload.id] = payload
      return {
          ...decks
        }
    default :
      return state
  }
}

export default decks