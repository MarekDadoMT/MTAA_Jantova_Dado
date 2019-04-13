import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';  
import firebase from 'firebase';
import 'firebase/functions';

import Home from './screens/Home';
import AddItem from './screens/AddItem';  
import List from './screens/List';
import Login from './screens/Login';
import Article from './screens/Article';
import UpdateItem from './screens/UpdateItem';
//import { Http2ServerRequest } from 'http2';
//import console = require('console');

const AppNavigator = createStackNavigator(  
    {
        Home,
        AddItem,
        List,
        Login,
        Article,
        UpdateItem
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

    componentWillMount() {
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
        var functions = firebase.functions();
        //var addArticle = functions.httpsCallable('addArticle');
        /*addArticle({author: "author",
            category: "category",
            title: "title",
            image: "image",
            text: "text"}).then(function(result) {
                // Read result of the Cloud Function.
                var sanitizedMessage = result.text;
               // console.log(sanitizedMessage);
                // ...
              }).catch(function(error) {
                // Getting the Error details.
                var code = error.code;
                var message = error.message;
                var details = error.details;
                // [START_EXCLUDE]
                //console.error('There was an error when calling the Cloud Function', error);
                window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
                    + code + '\nError Message:' + message + '\nError Details:' + details);
                //addMessageButton.disabled = false;
                // [END_EXCLUDE]
                // [END_EXCLUDE]
              });*/
             /* const express = require('express');
              const cors = require('cors');
              
              const app = express();
              app.post('https://us-central1-mtaa-f5627.cloudfunctions.net/addArticle', );*/

              

    }

    render() {

        return <AppContainer />;
    }
}
