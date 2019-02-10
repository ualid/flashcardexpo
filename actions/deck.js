export const RECEIVE_DECK = 'RECEIVE_DECK'
export const ADD_ENTRY = 'ADD_ENTRY'
export const UPDATE_DECK = 'UPDATE_DECK'

export  function receiveDecks (decks) {
    return {
      type: RECEIVE_DECK,
      decks,
    }
}
export function addEntry (deck) {
  return {
    type: ADD_ENTRY,
    deck,
  }
}
export  function updateDeck (deck, decks) {
  return {
    type: UPDATE_DECK,
    deck
  }
}
