import React, { Component } from 'react';  
import {
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    View,
    Button,
    Alert,
    Image,
    Picker
} from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import getPermission from '../utils/permissions'

import fb from '../firebase';

import IOSPicker from 'react-native-ios-picker';

const data = [{category: 'Football', code: '1'},{category: 'Hockey', code: '2'}];

export default class AddItem extends Component { 
  
  static navigationOptions = {
    title: 'New article'
  };
  
  constructor(props) {   
    super(props);
    this.state = {
        author: 'WeWant',
        category: '',
        title: '',
        image: '',
        text: '',
        selectedValue: ''
    }
  }

  handleChoosePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
      });
      
      if(!result.cancelled) {
        this.setState({image: result.uri});
      }
    }
  };

  _onPress = async () => {

       await fb.instance.uploadImageAsync(this.state.image).then((url) => {
           fb.instance.addToDatabase(url, this.state, fb.instance.token, fb.instance.author)
      }).catch(error => {
          console.log('Something is wrong')
      });

      //this.props.navigation.navigate("List");

  };

    _change = async (d, i) => {
        await this.setState({category: data[i].category});
        //this.fetchDataCategory();
    }

  render() {
    return (
      <KeyboardAvoidingView behavior="position">
        
        <Text style={styles.title}>Adding new article</Text>
        
        <Text style={styles.heading}>Title</Text> 
        <TextInput style={styles.input}
                  onChangeText={(text) => this.setState({title: text})}
        />

          <Text style={styles.heading}>Category</Text>
          <View style={styles.combobox}>
              <IOSPicker
                  selectedValue={this.state.category}
                  onValueChange={(d, i)=> this._change(d, i)}
                  mode='modal'
                  textStyle={{color: 'grey'}}
              >
                  {
                      data.map((item, index)=>
                          <Picker.Item key={index} label={item.category} value={item.code} />
                      )
                  }
              </IOSPicker>
          </View>

        {/*<Text style={styles.heading}>Category</Text> */}
        {/*<TextInput style={styles.input}*/}
        {/*          onChangeText={(text) => this.setState({category: text})}*/}
        {/*/>*/}
        
        <Text style={styles.heading}>Image</Text> 
        <TouchableOpacity
          style={styles.buttonContainerImage}
          onPress={this.handleChoosePhoto}
        >
          <Text style={styles.buttonText}>CHOOSE IMAGE</Text>
        </TouchableOpacity>
        
        <Text style={styles.heading}>Text</Text> 
        <TextInput style={styles.inputText}
                      multiline = {true} 
                      blurOnSubmit = {true}
                      onChangeText={(text) => this.setState({text: text})}
        />
        
        <TouchableOpacity
          style= {styles.buttonContainerAdd}
          onPress={this._onPress}
        >
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

  const styles = StyleSheet.create({
      combobox: {
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 10,
          backgroundColor: 'grey',
          borderColor: '#d6d7da',
          borderWidth: 0.5,

      },
    title: {
      margin: 40,
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
    buttonContainerAdd:{
        paddingTop: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        backgroundColor: 'grey',
        paddingVertical: 15
    },
    buttonContainerImage:{
      paddingTop: 10,
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 10,
      backgroundColor: 'lightblue',
      paddingVertical: 15
  },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});
