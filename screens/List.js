import React, { Component } from 'react';  
import { Button, View, Text } from 'react-native';

export default class List extends Component {  
  render() {
    return (
      <View>
        <Button
            title="Add an Item"
            //onPress={() => this.props.navigation.navigate('AddItem')}
            onPress={() => this.props.navigation.navigate('AddItem')}
          />
      </View>
    );
  }
}