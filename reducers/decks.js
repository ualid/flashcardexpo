import { RECEIVE_DECK, ADD_ENTRY, UPDATE_DECK } from '../actions/deck'
import cloneDeep from 'lodash/cloneDeep';

const INITIAL_STATE = {
  decks: {}
}

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECK :
      return {
        ...state,
        ...action.decks,
      }
      case ADD_ENTRY :
        return {
          ...state,
          ...action.deck,
        }
        
      case UPDATE_DECK :
      let decks = cloneDeep(state)
      delete decks[action.deck.id]
      decks[action.deck.id] = action.deck
      return {
          ...decks
        }
    default :
      return state
  }
}

export default decks