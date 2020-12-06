import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Register extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>Register page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#e3b579',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Register;
