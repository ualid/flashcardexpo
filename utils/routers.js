import React, { Component } from "react";
import { Router, Scene, Actions } from "react-native-router-flux";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from "react-native";
import DeckForm from "../components/DeckForm";
import Deck from "./../components/Deck";
import Card from "./../components/Card";
import CardForm from "./../components/CardForm";
import Quiz from "./../components/Quiz";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Icon } from "react-native-elements";
import { white } from "../utils/colors";

const iconPlus = () => {
  return (
    Platform.OS  === 'ios' 
    ?
      <Icon
      size={20}
      onPress={() => Actions.deckForm()}
      name="ios-add"
      type="ionicon"
      raised={true}
    />
    :
      <Icon
      size={20}
      onPress={() => Actions.deckForm()}
      name="plus"
      type="font-awesome"
      raised={true}
    />
  
  );
};
const AppRouter = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="deckForm"
          component={DeckForm}
          title="Deck Form"
          headerPressColorAndroid={white}
          titleStyle={{ color: "white" }}
          navigationBarStyle={{ backgroundColor: "black" }}
          headerTintColor={white}
        />
        <Scene
          key="deck"
          component={Deck}
          title="Decks"
          initial
          name="user-o"
          renderRightButton={iconPlus}
          headerPressColorAndroid={white}
        />
        <Scene
          key="card"
          component={Card}
          title="Cards"
          titleStyle={{ color: "white" }}
          navigationBarStyle={{ backgroundColor: "black" }}
          headerTintColor={white}
          headerPressColorAndroid={white}
        />
        <Scene
          key="quiz"
          component={Quiz}
          title="Quiz"
          navigationBarStyle={{ backgroundColor: "black" }}
          titleStyle={{ color: "white" }}
          headerTintColor={white}
          headerPressColorAndroid={white}
        />
        <Scene
          key="cardForm"
          component={CardForm}
          title="Cards Form"
          navigationBarStyle={{ backgroundColor: "black" }}
          titleStyle={{ color: "white" }}
          headerTintColor={white}
          headerPressColorAndroid={white}
        />
      </Scene>
    </Router>
  );
};

export default AppRouter;
