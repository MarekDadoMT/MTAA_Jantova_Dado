import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';  
import firebase from 'firebase';
import 'firebase/functions';

import Home from './screens/Home';
import AddItem from './screens/AddItem';  
import List from './screens/List';
import Login from './screens/Login';

const AppNavigator = createStackNavigator(  
    {
      Home,
      AddItem,
      List,
      Login
    },
    {
      initialRouteName: 'Home'
    }
);
  
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

    /*constructor() {
        super();
        this.state = {
            
        }
    }*/

    /*componentWillMount() {
        var config = {
            apiKey: "AIzaSyBEHe75cZir7nmNtpQzTk4Sf6YduYvxi-k",
            authDomain: "mtaa-f5627.firebaseapp.com",
            databaseURL: "https://mtaa-f5627.firebaseio.com",
            projectId: "mtaa-f5627",
            storageBucket: "mtaa-f5627.appspot.com",
            messagingSenderId: "148516151496"
        };
        firebase.initializeApp(config);

        //const myf = firebase.functions().httpsCallable('getArticles')
    }*/

    render() {

        return <AppContainer />;
    }
}
