export const RECEIVE_DECK = 'RECEIVE_DECK'
export const ADD_ENTRY = 'ADD_ENTRY'
export const UPDATE_DECK = 'UPDATE_DECK'

export  function receiveDecks (decks) {
    return {
      type: RECEIVE_DECK,
      payload: decks,
    }
}
export function addEntry (deck) {

  return {
    type: ADD_ENTRY,
    payload: deck,
  }
}
export  function updateDeck (deck, decks) {
  return {
    type: UPDATE_DECK,
    payload: deck
  }
}
