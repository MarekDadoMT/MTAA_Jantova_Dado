import React, { Component } from 'react';  
import { Button, View, Text , FlatList, Image, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import fb from '../firebase';
import IOSPicker from 'react-native-ios-picker';

const data = [{category: 'Football', code: '1'},{category: 'Hockey', code: '2'}]

export default class List extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: [],
        selectedValue: ''
      };
    }

  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
      const pole = await fb.instance.showData("user").catch((error) => {
          alert(error.message);
      });
      this.setState({data: pole})
  }

  async fetchDataCategory() {
    const pole = await fb.instance.showArticleCategory(this.state.selectedValue, "user").catch((error) => {
      alert(error.message);
    });
    this.setState({data: pole})
  }

  change(d, i) {
    this.setState({selectedValue: data[i].category});
    this.fetchDataCategory();
  }

  _keyExtractor = (item, index) => item.id;
  _flatListSeparator = () => <View style={styles.line} />;

    _renderItem = ({ item }) => {
        return(
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('ArticleUser', {id: item.id})}
            >
            <Image
              source={{ uri: item.image }}
              style={{ width: 60, height: 60, marginLeft: 30, marginTop: 30, marginBottom: 30 }}
            />
                <Text style={styles.heading}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

  render() {
    return (
        <View>

          <Text style={styles.heading}>Filter by category:</Text>
          
          <View style={styles.combobox}>
          <IOSPicker 
          selectedValue={this.state.selectedValue}
          onValueChange={(d, i)=> this.change(d, i)}
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
  combobox: {
    //flex: 1,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    //backgroundColor: 'grey',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 0.5,
    overflow: 'hidden'
    //color: 'grey'
  },
  heading: {
      color: 'black',
      fontWeight: '700',
      paddingTop: 25,
      fontSize: 15,
      marginLeft: 30
    },
    title: {
      margin: 40,
      fontSize: 20,
      textAlign: 'center',
      color: 'grey',
      fontWeight: '700'
    },
  buttonFilter:{
      marginTop: 65,
      paddingTop: 10,
      marginLeft: 30,
      marginRight: 30,
      width: 180,
      height: 40,
      //backgroundColor: 'lightblue',
      paddingVertical: 15,
  },
  buttonUnfilter:{
      marginTop: 20,
      paddingTop: 10,
      marginLeft: 30,
      marginRight: 30,
      width: 180,
      height: 40,
      backgroundColor: 'lightblue',
      paddingVertical: 15,   
  },
  buttonContainerAdd:{
      marginTop: 20,
      paddingTop: 10,
      marginLeft: 30,
      marginRight: 30,
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
