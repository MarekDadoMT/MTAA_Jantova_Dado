import React, { Component } from 'react';  
import { Button, View, Text } from 'react-native';
import IOSIcon from "react-native-vector-icons/Ionicons";

export default class Home extends Component {  

    static navigationOptions = {
        title: 'Home',
        headerLeft:( <IOSIcon name="ios-menu" size={30} /> ),
        headerRight:( <IOSIcon name="ios-contact" size={30} /> ),
      };

    render() {
      return (
        <View>
          <Text>Home Screen</Text>
          <Button
            title="List of Items"
            color="green"
            onPress={() => this.props.navigation.navigate('List')}
          />
        </View>
      );
    }
  }