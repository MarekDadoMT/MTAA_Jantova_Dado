import React, { Component } from 'react';  
import { Button, View, Text , FlatList, Image, StyleSheet, TouchableOpacity, Picker, ScrollView, RefreshControl} from 'react-native';
import fb from '../firebase';
import IOSPicker from 'react-native-ios-picker';

const data = [{category: 'No filter', code: '1'},{category: 'Football', code: '2'},{category: 'Hockey', code: '3'}];

export default class List extends Component {


    constructor(props) {
      super(props);
      this.state = {
        data: [],
        selectedValue: '',
        refreshing: false

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

   fetchDataCategory = async (itemValue) => {

        if(this.state.selectedValue === "No filter") {
            const pole =  await fb.instance.showData(fb.instance.token).catch((error) => {
                alert(error.message);
            });
            this.setState({data: pole});
        }

        else {
            const pole =  await fb.instance.showArticleCategory(this.state.selectedValue, fb.instance.token).catch((error) => {
                alert(error.message);
            });
            this.setState({data: pole});
        }
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchData().then(() => {
            this.setState({refreshing: false});
        });
    };

    _change = async (d, i) => {
        await this.setState({selectedValue: data[i].category});
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
              style={{ width: 60, height: 60, marginLeft: 30, marginTop: 30, marginBottom: 30 }}
            />
                <Text style={styles.heading}>{item.title}</Text>
            </TouchableOpacity>
        )
};

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>

                <TouchableOpacity style={styles.buttonContainerAdd}
                                  onPress={() => this.props.navigation.navigate('AddItem')}
                >
                    <Text style={styles.buttonText}>ADD ARTICLE</Text>
                </TouchableOpacity>

                <Text style={styles.heading}>Filter by category:</Text>

                <View style={styles.combobox}>
                    <IOSPicker
                        selectedValue={this.state.selectedValue}
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


                {/*<View>*/}
                {/*  <Picker*/}
                {/*      selectedValue={this.state.kategoria}*/}
                {/*      style={{width: 200, marginLeft: 90}}*/}
                {/*      onValueChange={(itemValue, itemIndex) =>*/}
                {/*          this.fetchDataCategory(itemValue)*/}
                {/*      }*/}
                {/*  >*/}
                {/*      <Picker.Item key = "No filter" label="No filter" value="No filter" />*/}
                {/*      <Picker.Item key = "Hockey" label="Hockey" value="Hockey" />*/}
                {/*      <Picker.Item key = "Football" label="Football" value="Football" />*/}
                {/*  </Picker>*/}

                {/*</View>*/}



                <View>
                    <FlatList
                        data ={this.state.data}
                        ItemSeparatorComponent={this._flatListSeparator}
                        renderItem ={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View>

            </ScrollView>

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
    //borderRadius: 20,
    borderWidth: 0.5,
    //overflow: 'hidden'
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
