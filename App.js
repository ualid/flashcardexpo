import React, { Component } from "react";
import {  View, StatusBar, AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { black } from "./utils/colors";
import AppRouter from "./utils/routers";
import reducer from "./reducers/index";
import { Constants } from 'expo'

import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'flashCard:notifications'
function StatusBarApp({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight  }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends Component {
  componentDidMount() {
    this.setLocalNotification();
  }

  createNotification = () => {
    return {
      title: "Let's study!",
      body: "👋 Let's study!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
   setLocalNotification  = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMintutes(0)
             
                Notifications.scheduleLocalNotificationAsync(
                  this.createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
    }

  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={{ flex: 1 }}>
          <StatusBarApp backgroundColor={black} barStyle="light-content" />
          <AppRouter />
        </View>
      </Provider>
    );
  }
}
