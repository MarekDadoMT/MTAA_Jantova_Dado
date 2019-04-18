import React, { Component } from 'react';  
import { Button, View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import fb from '../firebase';
import UpdateItem from "./UpdateItem";

export default class Article extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      author: '',
      category: '',
      image: 'http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png',
      text: '',
      title: ''
    };
  }
  
  async componentDidMount() {
    const id = this.props.navigation.state.params.id;
    const article = await fb.instance.showArticle(id, "user");
    this.setState({author: article.author, category: article.category, image: article.image, text: article.text, title: article.title})
  }

    render() {
      const id = this.props.navigation.state.params.id;
      return (
        <View>

          <Text style={styles.title}>{this.state.title}</Text>

          <View style={{
              justifyContent: 'center',
              alignItems: 'center'}}>
            <Image source={{ uri: this.state.image }}
                   style={{ width: 250,
                       height: 300
                       }}
            />
          </View>

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Text style={styles.heading}>Author: </Text>
            <Text style={{color: 'black'}}>{this.state.author}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.heading}>Category: </Text>
            <Text style={{color: 'black'}}>{this.state.category}</Text>
          </View>

          <View>
            <Text style={{color: 'black', marginLeft: 30, marginTop: 10}} >{this.state.text}</Text>
          </View>

        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    title: {
      margin: 40,
      fontSize: 32,
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold'
    },
    heading: {
        marginBottom: 10,
        marginLeft: 30,
        color: 'black',
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
        marginTop: 10,
        backgroundColor: 'grey',
        paddingVertical: 15,
        top: '95%',
        position: 'relative'
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
