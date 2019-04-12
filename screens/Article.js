import React, { Component } from 'react';  
import { Button, View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import fb from '../firebase';

export default class Article extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      auth: '',
      categ: '',
      im: 'http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png',
      tex: '',
      tit: ''
    };
  }
  
  async componentDidMount() {
    const id = this.props.navigation.state.params.id;
    const article = await fb.instance.showArticle(id);
    this.setState({auth: article.author, categ: article.category, im: article.image, tex: article.text, tit: article.title})
    console.log(this.state.im)
  }

    render() {
      return (
        <View>
          <Text style={styles.title}>{this.state.tit}</Text>

          <View>
          <Image source={{ uri: this.state.im }}
            //style={{ width: '100%'}}
           />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.heading}>Author: </Text>
            <Text style={{color: '#585858'}}>{this.state.auth}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.heading}>Category: </Text>
            <Text style={{color: '#585858'}}>{this.state.categ}</Text>
          </View>

          <View>
            <Text style={{color: '#585858', marginLeft: 30, marginTop: 10}} >{this.state.tex}</Text>
          </View>

        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    title: {
      margin: 40,
      fontSize: 20,
      textAlign: 'center',
      color: '#585858',
      fontWeight: '700'
    },
    heading: {
        marginBottom: 10,
        marginLeft: 30,
        color: '#585858',
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