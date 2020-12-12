import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid} from 'react-native';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pass: '',
      passConfirm: '',
      registerDisabled: false,
    };
    this.checkPassword = this.checkPassword.bind();
  }
  checkPassword = () => {
    if (this.state.passConfirm.toString()!== this.state.pass.toString()) {
        ToastAndroid.show('Password must match with confirmation password,', ToastAndroid.SHORT);
      if (!this.state.registerDisabled) {
        this.setState({registerDisabled: true});
      }
    } else {
      if (this.state.registerDisabled) {
        this.setState({registerDisabled: false});
      }
    }

  };
  render() {
    const buttonOpacity = this.state.registerDisabled ? 0.4 : 1;


    return (
        <View style={styles.main}>
          <Text style={styles.appName}>Quizzer</Text>
          <View style={styles.input}>
            <TextInput
                style={styles.inputText}
                placeholder="Username..."
                placeholderTextColor="#3c2d2d"
                onChangeText={(val) => this.setState({username: val})}
            />
          </View>
          <View style={styles.input}>
            <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Password..."
                placeholderTextColor="#3c2d2d"
                onChangeText={(val) => this.setState({pass: val})}
            />
          </View>
          <View style={styles.input}>
            <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Confirm Password..."
                placeholderTextColor="#3c2d2d"
                onChangeText={(val) => this.setState({passConfirm: val})}
                onEndEditing={this.checkPassword()}

            />
          </View>
          <TouchableOpacity
              onPress={() => this.login()}
              style={{...styles.register, opacity: buttonOpacity}}
              disabled={this.state.registerDisabled}>
            <Text style={styles.SignUpText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.login}>Already signed up? Log in</Text>
          </TouchableOpacity>
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
  appName: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#3c2d2d',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    backgroundColor: '#8d8d8d',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  login: {
    color: 'white',
    fontSize: 11,
  },

  register: {
    width: '30%',
    backgroundColor: '#3c2d2d',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  SignUpText: {
    color: 'white',
  },
});

export default Register;
