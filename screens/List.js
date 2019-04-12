import React, { Component } from 'react';  
import { Button, View, Text , FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import fb from '../firebase';

export default class List extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: [],
      };
    }


  async componentDidMount() {
    const pole = await fb.instance.showData().catch((error) => {
      alert(error.message);
    });
    this.setState({data: pole})
  }

  _keyExtractor = (item, index) => item.id;
  _flatListSeparator = () => <View style={styles.line} />;

    _renderItem = ({ item }) => {
        return(
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('Article', {id: item.id})}
            >
            <Image
              source={{ uri: item.image }}
              style={{ width: 60, height: 60, margin: 20 }}
            />
                <Text style={styles.heading}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

  render() {
    return (
        <View>
          
          <TouchableOpacity style={styles.buttonContainerAdd} 
              onPress={() => this.props.navigation.navigate('AddItem')}
              >
              <Text style={styles.buttonText}>ADD ARTICLE</Text>
          </TouchableOpacity> 

          <View>
              <FlatList
                data ={this.state.data}
                ItemSeparatorComponent={this._flatListSeparator}
                renderItem ={this._renderItem}
                keyExtractor={this._keyExtractor}
              />
          </View>      
            
        </View>

    );
  }
}

const styles = StyleSheet.create({
  heading: {
      color: 'grey',
      fontWeight: '700',
      paddingTop: 25,
      fontSize: 17
    },
  buttonContainerAdd:{
      marginTop: 20,
      paddingTop: 10,
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 10,
      backgroundColor: 'grey',
      paddingVertical: 15,
  },
  buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'grey'
  }
});
