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
          <TextInput style={styles.itemInput}/>
          <Text style={styles.heading}>Image</Text> 
          <TextInput style={styles.itemInput}/>
          <Text style={styles.heading}>Text</Text> 
          <TextInput style={styles.itemInput}/>
          <TouchableHighlight
            style={styles.button}
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
      fontSize: 23,
      textAlign: 'center'
    },
    heading: {
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center'
      },
    itemInput: {
      height: 50,
      padding: 4,
      marginLeft: 50,
      marginRight: 50,
      marginBottom: 10,
      fontSize: 18,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black'
    },
    buttonText: {
      fontSize: 18,
      color: '#111',
      alignSelf: 'center'
    },
    button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor: 'grey',
      borderColor: 'black',
      borderWidth: 1,
      marginLeft: 50,
      marginRight: 50,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 20,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
  });