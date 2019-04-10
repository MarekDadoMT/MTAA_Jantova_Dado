import React, { Component } from 'react';  
import { Button, View, Text , FlatList} from 'react-native';
import fb from '../firebase';
import ListItem from "react-native/local-cli/templates/HelloNavigation/components/ListItem";

export default class List extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: [],
      };
    }


  async componentDidMount() {
    const pole = await fb.instance.showData();
    this.setState({data: pole})
    console.log(this.state.data);
  }

  _keyExtractor = (item, index) => item.id;

    _renderItem({ item }) {
        return(
            <View>
                <Text>{item.id}</Text>
            </View>
        )
    }





  render() {
    return (
        <View>
            <View>
              <Button
                  title="Add an Item"
                  //onPress={() => this.props.navigation.navigate('AddItem')}
                  onPress={() => this.props.navigation.navigate('AddItem')}
              />
            </View>

            <View>
              <FlatList
                data ={this.state.data}
                renderItem ={this._renderItem}
                keyExtractor={this._keyExtractor}
              />
            </View>
        </View>

    );
  }
}
