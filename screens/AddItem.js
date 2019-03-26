import React, { Component } from 'react';  
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert, Image } from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import getPermission from '../utils/permissions'

export default class AddItem extends Component {  

    constructor(props) {
      super(props);
      this.state = {
        author: '',
        category: '',
        image: '',
        text: '',
        title: ''
      }
    }

    state = {
        image: null
    };

    /*_onChangeText = (text) => {
      this.setState({text})
    }*/

    handleChoosePhoto = async () => {
        const status = await getPermission(Permissions.CAMERA_ROLL);
        if (status) {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
            });
            if(!result.cancelled) {
                console.log(result);
                this.setState({image: result.url});
            }
        }

    };

    _onPress = () => {
        var obj = { author: "weWANTtoPass", category: this.state.category, image: this.state.image,  text: this.state.textovePole, title: this.state.title};
        var myJSON = JSON.stringify(obj);
        //console.log(myJSON);

        return fetch(
            'https://us-central1-mtaa-f5627.cloudfunctions.net/addArticle', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: myJSON
        }).then((response) => {
            if(response.status !== 200) {
                Alert.alert("Záznam sa nepridal do databázy!", "Nezadal si všetky parametre");
            }

            else {
                Alert.alert("ZO SRDIEČKA GRATULUJEM", "Záznam bol pridaný")
            }
        });




    }

    static navigationOptions = {
        title: 'New article'
      };

    render() {
      return (
        <KeyboardAvoidingView behavior="position">
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

            <Button
                style={styles.buttonContainer}
                title="Choose photo"
                onPress={this.handleChoosePhoto}
            />
        </KeyboardAvoidingView>
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
        color: '#323232',
        textAlign: 'center',
        fontWeight: '700'
    }
});