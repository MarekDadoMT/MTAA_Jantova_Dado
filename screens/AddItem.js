import React, { Component } from 'react';  
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
//mport console = require('console');

export default class AddItem extends Component {  

    constructor(props) {
      super(props)
      this.state = {
        author: '',
        category: '',
        image: '',
        text: '',
        title: '' 
      }
    }

    _onChangeText = (text) => {
      this.setState({text})
    }

    _onPress = () => {
      //console.log(this.state.title);
      //sconsole.log(this.state.image);
      var obj = { author: "weWANTtoPass", category: this.state.category, image: this.state.image,  text: this.state.textovePole, title: this.state.title};
      var myJSON = JSON.stringify(obj);
      console.log(myJSON);
    }

    static navigationOptions = {
        title: 'New article'
      };

    render() {
      return (
        <View>
          <Text style={styles.title}>Adding new article</Text>
          <Text style={styles.heading}>Title</Text> 
          <TextInput style={styles.input}
                    onChangeText={(text) => this.setState({title: text})}
                    />

          <Text style={styles.heading}>Category</Text> 
          <TextInput style={styles.input}
                    onChangeText={(text) => this.setState({category: text})}
                    />
         
          <Text style={styles.heading}>Image</Text> 
          <TextInput style={styles.input}
                    onChangeText={(text) => this.setState({image: text})}
                    />
          
          <Text style={styles.heading}>Text</Text> 
          <TextInput style={styles.inputText}
                        multiline = {true} 
                        onChangeText={(text) => this.setState({textovePole: text})}
                        />
          <TouchableOpacity
            style={styles.buttonContainer}
            underlayColor="grey"
            onPress={this._onPress}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
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