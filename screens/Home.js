import React, { Component } from 'react';  
import { Button, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import IOSIcon from "react-native-vector-icons/Ionicons";
import im from '../images/168567.jpg';

export default class Home extends Component {  

    static navigationOptions = {
        title: 'Home',
      };

    render() {
      return (
        <View >
          <Button
            title="Login"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      );
    }
  }