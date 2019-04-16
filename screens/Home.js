import React, { Component } from 'react';  
import { Button, View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import IOSIcon from "react-native-vector-icons/Ionicons";
import im from '../images/168567.jpg';

export default class Home extends Component {  

    static navigationOptions = {
        title: 'Home',
      };

    render() {
      return (
        <View>
      <ImageBackground source={require('../images/baseball.jpg')} style={{width: '100%', height: '100%'}}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.buttonContainer}>
         <Text style={styles.button}>Login as administrator</Text>
        </TouchableOpacity>
       </ImageBackground>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    title: {
      marginTop: 250,
      margin: 40,
      fontSize: 30,
      justifyContent: 'center', 
      color: 'grey',
      fontWeight: '800'
    },
    heading: {
        marginBottom: 10,
        marginLeft: 30,
        color: '#585858',
        fontWeight: '700'
      },
    button: {
      //justifyContent: 'center',
      //marginTop: 100,
      //margin: 40,
      
      fontSize: 23,
      textAlign: 'center',
      color: 'white',
      fontWeight: '500',
    },
    buttonContainer: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 100,
        backgroundColor: 'lightgrey',
        borderColor: 'white',
        paddingVertical: 15,
        borderWidth: 0.5
    }
});