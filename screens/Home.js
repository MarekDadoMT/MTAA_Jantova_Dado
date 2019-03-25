import React, { Component } from 'react';  
import { Button, View, Text, TouchableOpacity } from 'react-native';
import IOSIcon from "react-native-vector-icons/Ionicons";

export default class Home extends Component {  

    static navigationOptions = {
        title: 'Home',
        /*headerRight:(<TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <IOSIcon name="ios-contact" size={30} />
                  </TouchableOpacity>
      ),
        headerLeft:( <IOSIcon name="ios-menu" size={30} /> ),*/
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