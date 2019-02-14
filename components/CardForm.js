import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import { black } from "../utils/colors";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { updateDeck } from "../actions/deck";
import cloneDeep from 'lodash/cloneDeep';
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
import { Actions } from 'react-native-router-flux';

class CardForm extends Component {
  state = {
    show: false,
    ask: "",
    answer: ""
  };

  handleOpen = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    Actions.pop();
  };


  handlerSubmit = () => {
    let deck = cloneDeep(this.props.deck);
    let decks = cloneDeep(this.props.decks);
    
    deck.questions.push({ask: this.state.ask, answer: this.state.answer})

    this.props.dispatch(
      updateDeck({
        ...deck
      })
    );
    delete decks[deck.id];

    this.handleOpen();
  };

  handlerText = (name, text)  => {
    this.setState({
        [name]: text
    });
  };

  createTimestamp = () => {
    var date = new Date();

    return date.getTime();
  };

  render() {
    const { ask, answer } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <Input
            placeholder="Ask"
            inputStyle={styles.inputAsk}
            shake={true}
            value={ask}
            onChangeText={text => this.handlerText('ask', text)}
          />
          <Input
            placeholder="Answer"
            inputStyle={styles.inputAnswer}
            shake={true}
            value={answer}
            onChangeText={text => this.handlerText('answer', text)}
          />
        </View>
        <View style={styles.viewButton}>
          <Button
            title="Submit"
            TouchableComponent={TouchableHighlight}
            underlayColor="transparent"
            buttonStyle={styles.button}
            onPress={this.handlerSubmit}
            disabled={ask === '' || answer === '' }
          />
        </View>

        <SCLAlert
          theme="success"
          show={this.state.show}
          title="Card"
          subtitle="Card saved with sucess!"
          onRequestClose={() => {}}
        >
          <SCLAlertButton theme="success" onPress={this.handleClose}>
            OK
          </SCLAlertButton>
        </SCLAlert> 
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 30
  },
  inputAsk: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  inputAnswer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15
  },
  button: {
    backgroundColor: black
  },
  viewButton: {
    marginTop: 25,

    justifyContent: "center",
    alignItems: "center"
  }
});

function mapStateToProps(state, props) {
  return {
    ...state,
    ...props
  };
}

export default connect(mapStateToProps)(CardForm);
