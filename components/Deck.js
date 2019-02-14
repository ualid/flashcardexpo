import React, { Component } from "react";
import {   FlatList } from "react-native";
import { connect } from "react-redux";
import { ListItem } from "react-native-elements";
import { receiveDecks } from "../actions/deck";
import { FLASHCARD_STORAGE_KEY } from "../utils/flashcard";
import { Actions } from "react-native-router-flux";

class Deck extends Component {

  viewDeck = deck => {
    Actions.card({ deck, id: deck.id, title: deck.titleDeck });
  };

  keyExtractor = (item, index) => item.titleDeck + "_" + index;

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.titleDeck}
        subtitle={`Cards ${item.questions.length}`}
        leftAvatar={{
          title: item.titleDeck[0]
        }}
        onPress={() => this.viewDeck(item)}
      />
    );
  };
  render() {
    let { decks } = this.props;
    decks = Object.values(decks);
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={decks}
        renderItem={this.renderItem}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(Deck);
