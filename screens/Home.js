import React, { Component } from 'react';  
import { Button, View, Text, TouchableOpacity } from 'react-native';
import IOSIcon from "react-native-vector-icons/Ionicons";

export default class Home extends Component {  

    static navigationOptions = {
        title: 'Home',
      };

    render() {
      return (
        <View>
          <Button
            title="Login"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      );
    }
  }