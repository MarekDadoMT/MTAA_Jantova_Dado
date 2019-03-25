import { View, Text, TextInput, TouchableOpacity,StyleSheet} from 'react-native';
import React, { Component } from 'react';

export default class Login extends Component {
    render() {
      return (
        <View style = {styles.container}>
            <TextInput style = {styles.input} 
               autoCapitalize="none" 
               onSubmitEditing={() => this.passwordInput.focus()} 
               autoCorrect={false} 
               keyboardType='email-address' 
               returnKeyType="next" 
               placeholder='Username' 
               placeholderTextColor='grey'/>
            <TextInput style = {styles.input}   
              returnKeyType="go" 
              ref={(input)=> this.passwordInput = input} 
              placeholder='Password' 
              placeholderTextColor='grey' 
              secureTextEntry/>

            <TouchableOpacity style={styles.buttonContainer} 
                     //onPress={onButtonPress}
                     onPress={() => this.props.navigation.navigate('List')}
                     >
                    <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity> 

        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
     paddingTop: 200
    },
    input:{
        marginLeft: 30,
        marginRight: 30,
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: 'grey'
    },
    buttonContainer:{
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: 'grey',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});
