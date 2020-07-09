// screens/rbnb.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import * as firebase from 'firebase';

class rbnb extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeRbnb() {
    if(this.state.name === ''){
     alert('Remplissez le nom de votre RBNB!')
    }else if(this.state.description === ''){
        alert('Remplissez la description de votre RBNB!')
       } else {
      this.setState({
        isLoading: true,
      });      
      firebase.firestore().collection('rbnbs').add({
        name: this.state.name,
        description: this.state.description,
      }).then((res) => {
        this.setState({
          name: '',
          description: '',
          isLoading: false,
        });
        this.props.navigation.navigate('Home')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    let {navigation} = this.props;
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Description'}
              value={this.state.description}
              onChangeText={(val) => this.inputValueUpdate(val, 'description')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Add RBNB'
            onPress={() => this.storeRbnb()} 
            color="#19AC52"
          />
        </View>
        <Button
            title='Liste des RBNB'
            onPress={() => this.props.navigation.navigate('UpdateRbnb')}
            color="#19AC52"
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 10
  }
})

export default rbnb;