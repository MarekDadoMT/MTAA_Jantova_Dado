import { View, Text, TextInput, TouchableOpacity,StyleSheet} from 'react-native';
import React, { Component } from 'react';
import fb from '../firebase';

export default class Login extends Component {
    render() {

        var username = '';
        var password = '';

      return (
        <View style = {styles.container}>
            <TextInput style = {styles.input} 
               autoCapitalize="none" 
               onChangeText = {(text_user) => username = text_user}
               autoCorrect={false}
               placeholder='Username' 
               placeholderTextColor='grey'/>
            <TextInput style = {styles.input}
                       onChangeText = {(passwd_user) => password = passwd_user}
              placeholder='Password' 
              placeholderTextColor='grey' 
              secureTextEntry/>

            <TouchableOpacity style={styles.buttonContainer}
                     onPress={() => fb.instance.login(password.toString(), username.toString()).then(tok => {
                         fb.instance.token = tok
                         this.props.navigation.navigate('List');
                     })}
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
