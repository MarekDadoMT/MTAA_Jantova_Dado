import React, { Component } from 'react';  
import { Button, View, Text , FlatList, Image, StyleSheet, TouchableOpacity, Picker, ScrollView, Switch} from 'react-native';
import fb from '../firebase';
import IOSPicker from 'react-native-ios-picker';

const data = [{category: 'Football', code: '1'},{category: 'Hockey', code: '2'}]

export default class List extends Component {


    constructor(props) {
      super(props);
      this.state = {
        data: [],
        marek: '',
        switchValue: false
      };
    }

   componentDidMount() {
    this.fetchData();
  }

   async fetchData () {
      const pole = await fb.instance.showData(fb.instance.token).catch((error) => {
          alert(error.message);
      });
      this.setState({data: pole})
  }

   fetchDataCategory () {
        console.log("Ahoj" + this.state.selectedValue);
    const pole =  fb.instance.showArticleCategory(this.state.selectedValue, fb.instance.token).catch((error) => {
      alert(error.message);
    });
    this.setState({data: pole})
  }

   change(d, i) {
        //console.log(d);
        //console.log(i);
        //console.log(data[i].category);
    //this.setState({selectedValue: data[i].category});

       this.setState({ marek: data[i].category });
       console.log(this.state.marek)

       //console.log("Ahoj" + this.state.selectedValue);
       const pole =  fb.instance.showArticleCategory(this.state.marek).catch((error) => {
           alert(error.message);
       });
       this.setState({data: pole})


    //console.log(this.state.selectedValue);

       //this.fetchDataCategory();
  }

    toggleSwitch = (value) => {
        //onValueChange of the switch this function will be called
        this.setState({switchValue: value})
        //state changes according to switch
        //which will result in re-render the text

        if(value == true)
        {

            //Perform any task here which you want to execute on Switch ON event.
            this.fetchDataCategory();
        }
        else{

            //Perform any task here which you want to execute on Switch OFF event.
            this.fetchData();
        }
    }

  _keyExtractor = (item, index) => item.id;
  _flatListSeparator = () => <View style={styles.line} />;

    _renderItem = ({ item }) => {
        return(
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('Article', {id: item.id})}
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
            <ScrollView>

              <TouchableOpacity style={styles.buttonContainerAdd}
                                onPress={() => this.props.navigation.navigate('AddItem')}
              >
              <Text style={styles.buttonText}>ADD ARTICLE</Text>
              </TouchableOpacity>

              <Text style={styles.heading}>Filter by category:</Text>

                <View style={{padding: 30}}>
                  <Picker
                      selectedValue={this.state.marek}
                      style={{height: 50, width: 200, marginLeft: 90}}
                      onValueChange={(itemValue, itemIndex) =>
                          this.setState({marek: itemValue})
                      }>
                      <Picker.Item label="Hockey" value="Hockey" />
                      <Picker.Item label="Football" value="Football" />
                  </Picker>

                  <Switch
                      style={{}}
                      onValueChange = {this.toggleSwitch}
                      value = {this.state.switchValue}/>
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

            </ScrollView>
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
    backgroundColor: 'black'
  }
});
