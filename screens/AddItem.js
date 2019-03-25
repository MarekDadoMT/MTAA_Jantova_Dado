import React, { Component } from 'react';  
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';

export default class AddItem extends Component {  

    static navigationOptions = {
        title: 'New article'
      };

    render() {
      return (
        <View>
          <Text style={styles.title}>Adding new article</Text>
          <Text style={styles.heading}>Title</Text> 
          <TextInput style={styles.input}/>
          <Text style={styles.heading}>Image</Text> 
          <TextInput style={styles.input}/>
          <Text style={styles.heading}>Text</Text> 
          <TextInput style={styles.inputText}
          multiline = {true} />
          <TouchableHighlight
            style={styles.buttonContainer}
            underlayColor="grey"
            //onPress={this.handleSubmit}
          >
          <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    title: {
      margin: 50,
      fontSize: 20,
      textAlign: 'center',
      color: 'grey',
      fontWeight: '700'
    },
    heading: {
        marginBottom: 10,
        marginLeft: 30,
        color: 'grey',
        fontWeight: '700'
      },
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
    inputText:{
      marginLeft: 30,
      marginRight: 30,
      height: 120,
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