import { AsyncStorage } from 'react-native'
import { FLASHCARD_STORAGE_KEY } from './flashcard'

export function fetchDecks () {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(data => {
    })
}

export async function submitEntry ({ deck, key }) {

  return await AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function removeEntry (key) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
    })
}