import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { black, white } from "../utils/colors";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { addEntry } from '../actions/deck'
import { Actions } from 'react-native-router-flux';
 
import Icon from "react-native-vector-icons/FontAwesome";
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

class DeckForm extends Component {
  state = {
    show: false,
    titleDeck: '',
    deckCreated: ''
  }

  handleOpen = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
    Actions.card(this.state.deckCreated);
    
  //  Actions.replace('card', {id:this.state.deckCreated.id, deck:this.state.deckCreated});
  }


   handlerSubmit = async () => {
    const key = this.createTimestamp();
    const deck = { id: key, titleDeck: this.state.titleDeck,  questions: [] };
    this.props.dispatch(addEntry({
      [key]: deck
    }))


    this.setState(state => {
        return {
            ...state,
            deckCreated: deck
        }
    })

    this.handleOpen(); 
    
  };

  handlerText = (text) => {
    this.setState((state) => {
    return { 
       ...state,
      titleDeck: text
    }
    })
  }

  createTimestamp = () => {
    var date = new Date();
    
    return (
      date.getTime()
    );
  }

  render() {
    const {show, titleDeck} = this.state;
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>What is the title of your new deck?</Text>
          <Input
            placeholder="Deck title"
            inputStyle={styles.input}
            shake={true}
            value={titleDeck}
            onChangeText={text => this.handlerText(text)}
          />
        </View>
        <View style={styles.viewButton}>
          <Button
            title="Submit"
            TouchableComponent={TouchableHighlight}
            underlayColor="transparent"
            buttonStyle={styles.button}
            onPress={this.handlerSubmit}
            disabled={this.state.titleDeck === ''}
          />
        </View>

        <SCLAlert
          theme="success"
          show={this.state.show}
          title="Deck"
          subtitle="Deck saved with sucess!"
          onRequestClose={() => {}}
        >
        <SCLAlertButton theme="success" onPress={this.handleClose}>OK</SCLAlertButton>
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
  input: {
    borderWidth: 1,
    borderRadius: 10
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

function mapStateToProps(state, dispatch) {
  return {
    ...state
  };
}

export default connect(
  mapStateToProps
)(DeckForm);