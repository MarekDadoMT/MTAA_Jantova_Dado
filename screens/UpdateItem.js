import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, View, Button, Alert, Image } from 'react-native';
import { Permissions, ImagePicker } from 'expo';

import fb from '../firebase';


export default class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }


    _updateArticle = () => {
        const id = this.props.navigation.state.params.id;
        fb.instance.updateData(id, this.state);
    };

    render() {
        const { params } = this.props.navigation.state;
        const id = params ? params.id : null;
        const title = params ? params.title : null;
        const author = params ? params.author : null;
        const category = params ? params.category: null;

        return (
            <KeyboardAvoidingView behavior="position">

                <Text style={styles.title}>{title}</Text>

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.heading}>Id: </Text>
                    <Text style={{color: '#585858'}}>{JSON.stringify(id)}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.heading}>Author: </Text>
                    <Text style={{color: '#585858'}}>{author}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.heading}>Category: </Text>
                    <Text style={{color: '#585858'}}>{category}</Text>
                </View>

                <View>
                    <Text style={styles.heading}>Text: </Text>
                </View>

                <TextInput style={styles.inputText}
                           multiline = {true}
                           blurOnSubmit = {true}
                           //placeholder={params.text}
                           //defaultValue = {params.text}
                           onChangeText={(text) => this.setState({text})}
                           //value={this.state.text}
                           //value={params.text}
                />


                <TouchableOpacity style={styles.buttonContainerAdd}
                                  onPress={() => this._updateArticle(id)}
                >
                    <Text style={styles.buttonText}>UPDATE</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
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
        height: 270,
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
        paddingVertical: 15,
        top: '5%',
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
