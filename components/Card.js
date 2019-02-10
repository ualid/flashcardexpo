import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import { white, black } from "../utils/colors";
import { connect } from "react-redux";
import { Button, Text } from "react-native-elements";
import { Actions } from 'react-native-router-flux';

class Card extends Component {
 
  handlerAdd = (deck) => {
    Actions.cardForm({deck})
  };
  handlerQuiz = (deck) => {
    Actions.quiz({deck})
  };

  render() {
    let { id } = this.props;
    const deck = this.props.decks[id];
   
    return (
      <View style={styles.viewButton}>
        <Text style={styles.textTitle}>{deck.titleDeck}</Text>
        <Text style={styles.textSubtitle}>{deck.questions.length} cards</Text>
        <Button
          title="Add Card"
          TouchableComponent={TouchableHighlight}
          underlayColor="black"
          type="outline"
          buttonStyle={styles.buttonAdd}
          onPress={() => this.handlerAdd(deck)}
          titleStyle={styles.titleStyleButtonAdd}
        />

        <Button
          title="Start Quiz"
          TouchableComponent={TouchableHighlight}
          underlayColor="transparent"
          buttonStyle={styles.buttonQuiz}
          onPress={() => this.handlerQuiz(deck)}
          disabled={!(deck.questions.length > 0)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonQuiz: {
    backgroundColor: black,
    marginTop: 15,
    width: 150
  },
  buttonAdd: {
    backgroundColor: white,
    borderColor: black,
    width: 150
  },
  viewButton: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  titleStyleButtonAdd: {
    color: black
  },
  textSubtitle: {
    fontSize: 15,
    marginBottom: 50
  },
  textTitle: {
    fontSize: 25
  }
});

function mapStateToProps(state, {deck}) {
  return {
    ...state,
    deck
  };
}

export default connect(mapStateToProps)(Card);
