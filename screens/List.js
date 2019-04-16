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
      const pole = await fb.instance.showData().catch((error) => {
          alert(error.message);
      });
      this.setState({data: pole})
  }

  async fetchDataCategory() {
    const pole = await fb.instance.showArticleCategory(this.state.selectedValue).catch((error) => {
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
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('Article', {id: item.id})}
            >
            <Image
              source={{ uri: item.image }}
              style={{ width: 60, height: 60, margin: 30 }}
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

          {/* <View style = {{flexDirection: 'row'}}>
          <Picker
                selectedValue={this.state.category}
                style={{ marginLeft: 30, width: 100}}
                onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}
          >
            <Picker.Item label="Football" value="Fotball" />
            <Picker.Item label="Hockey" value="Hockey" />
          </Picker>

          <View>
          <TouchableOpacity style={styles.buttonFilter}
                            onPress={() => this.fetchDataCategory()}
          >
          <Text style={styles.buttonText}>FILTER</Text>
          </TouchableOpacity> 

          <TouchableOpacity style={styles.buttonUnfilter}
                            onPress={() => this.fetchDataCategory}
          >
          <Text style={styles.buttonText}>UNFILTER</Text>
          </TouchableOpacity> 
          </View>
          </View> */}

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
    backgroundColor: 'grey',
    borderColor: '#d6d7da',
    //borderRadius: 4,
    borderWidth: 0.5,
    //color: 'grey'
  },
  heading: {
      color: 'grey',
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
      backgroundColor: 'lightblue',
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
