import React, { Component } from 'react';

export default class Rbnb extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
    }
  };

  state = {
    rbnb: {
      name: '',
      description: '',
    }
  }

  render() {
    return (
        <View style={styles.container}>
        <TextInput
          value={props.values.name}
          placeholder='Name'
          onChangeText={text => { props.setFieldValue('name', text) }}
        />
        <TextInput
          value={props.values.category}
          placeholder='Description'
          onChangeText={text => { props.setFieldValue('description', text) }}
        />
        <Button
          title='Submit'
          onPress={() => props.handleSubmit()}
        />
      </View>
    );
  }
}