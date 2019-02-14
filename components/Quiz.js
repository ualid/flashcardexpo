import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import { black } from "../utils/colors";
import { connect } from "react-redux";
import { Button, Text } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { red, green } from "../utils/colors";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
const initialState = {
    actionTitle: "Answer",
    question: "",
    answer: "",
    textViewUser: "",
    textAction: "",
    totalQuestions: 0,
    currentQuestion: 0,
    questionCorrect: 0,
    questionIncorrect: 0,
    showSucess: false,
    showError: false,
    percent: 0
}
class Quiz extends PureComponent {
  state = initialState;

  handleClose = () => {
    Actions.pop();
  }
  handleRestart = () => {
    const deck = this.props.deck;
    const newState = {
      question: deck.questions[0].ask,
      textViewUser: deck.questions[0].ask,
      answer: deck.questions[0].answer,
      totalQuestions: deck.questions.length,
      currentQuestion: 1,
      textAction: "Answer"
    };
    this.setState(state => {
      return {
      ...state,
        ...newState,
        showSucess: false,
        questionCorrect: 0,
        questionIncorrect: 0
      }

    })
  }
  handlerCorrect = () => {
    const { currentQuestion, totalQuestions } = this.state;
    if (currentQuestion < totalQuestions) {
      const deck = this.props.deck;
      const newState = {
        question: deck.questions[currentQuestion].ask,
        answer: deck.questions[currentQuestion].answer,
        textViewUser: deck.questions[currentQuestion].ask,
        totalQuestions: deck.questions.length,
        currentQuestion: currentQuestion + 1,
        questionCorrect: this.state.questionCorrect + 1,
        questionIncorrect: this.state.questionIncorrect + 1,
        textAction: "Answer"
      };
      this.setState(state => {
        return {
          ...state,
          ...newState
        };
      });
    } else{
      const newState = {
        questionCorrect: this.state.questionCorrect + 1,
      };
      this.setState(state => {
        return {
          ...state,
          ...newState
        };
      });
      this.handlerShowTotal();
    }
  };
  handlerShowTotal = () => {
    
    this.setState(state => {
      let percent = (state.questionCorrect * 100)/state.totalQuestions
      const newState = {
        ...state,
        ...{showSucess: true},
        ...{percent}
      }
      return {
        ...newState
      };
    });

  };
  handlerIncorrect = () => {
    const { currentQuestion, totalQuestions } = this.state;
    if (currentQuestion < totalQuestions) {
      const deck = this.props.deck;
      const newState = {
        question: deck.questions[this.state.currentQuestion].ask,
        answer: deck.questions[this.state.currentQuestion].answer,
        totalQuestions: deck.questions.length,
        currentQuestion: this.state.currentQuestion + 1,
        textViewUser: deck.questions[currentQuestion].answer,
        questionIncorrect: this.state.questionIncorrect + 1,
        textAction: "Answer"
      };
      this.setState(state => {
        return {
          ...state,
          ...newState
        };
      });
    }else{
      const newState = {
        questionIncorrect: this.state.questionIncorrect + 1,
      };
      this.setState(state => {
        return {
          ...state,
          ...newState
        };
      });
      this.handlerShowTotal();
    }
  };

  componentWillMount() {
    const deck = this.props.deck;
    const newState = {
      question: deck.questions[0].ask,
      textViewUser: deck.questions[0].ask,
      answer: deck.questions[0].answer,
      totalQuestions: deck.questions.length,
      currentQuestion: 1,
      textAction: "Answer"
    };
    this.setState(state => {
      return {
        ...state,
        ...newState
      };
    });
  }
  viewAnswer = answer => {
    let newState = {};
    if (this.state.textAction === "Answer") {
      newState = {
        textViewUser: this.state.answer,
        textAction: "Question"
      };
    } else {
      newState = {
        textViewUser: this.state.question,
        textAction: "Answer"
      };
    }
    this.setState(state => {
      return {
        ...state,
        ...newState
      };
    });
  };
  render() {
    let { decks } = this.props;
    const {
      textViewUser,
      textAction,
      answer,
      currentQuestion,
      totalQuestions,
      percent,
      showSucess
    } = this.state;
    decks = Object.values(decks)[0];

    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.textCount}>
            {currentQuestion}/{totalQuestions}
          </Text>
        </View>
        <View style={styles.viewButton}>
          <Text style={styles.textQuestion}>{textViewUser}</Text>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.tchAnswer}
            onPress={() => this.viewAnswer(answer)}
          >
            <Text style={styles.textAnswer}>{textAction}</Text>
          </TouchableHighlight>

          <Button
            title="Correct"
            TouchableComponent={TouchableHighlight}
            underlayColor="transparent"
            buttonStyle={styles.buttonCorrect}
            onPress={() => this.handlerCorrect()}
          />

          <Button
            title="Incorrect"
            TouchableComponent={TouchableHighlight}
            underlayColor="transparent"
            buttonStyle={styles.buttonIncorrect}
            onPress={() => this.handlerIncorrect()}
          />
         
          <SCLAlert
            theme="success"
            show={showSucess}
            title="Quiz"
            subtitle={`You got ${percent}% of the questions`}
            onRequestClose={() => {}}
          >
          
            <SCLAlertButton theme="success" onPress={this.handleClose}>
              OK
            </SCLAlertButton>
            <SCLAlertButton theme="success" onPress={this.handleRestart}>Restart</SCLAlertButton>

          </SCLAlert>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  buttonCorrect: {
    backgroundColor: green,
    marginTop: 15,
    width: 150,
    marginBottom: 10
  },
  buttonIncorrect: {
    backgroundColor: red,
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
  textAnswer: {
    fontSize: 15,
    color: red
  },
  tchAnswer: {
    marginBottom: 30
  },
  textQuestion: {
    fontSize: 45,
    marginTop: 30,
    fontWeight: "bold"
  },
  textCount: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10
  }
});

function mapStateToProps(props) {
  return {
    ...props
  };
}

export default connect(mapStateToProps)(Quiz);
