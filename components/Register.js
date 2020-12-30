import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pass: '',
      passConfirm: '',
      registerDisabled: false,
    };
  }

  render() {
    const buttonOpacity = this.state.registerDisabled ? 0.4 : 1;

    return (
      <View style={styles.main}>
        <Text style={styles.appName}>Quizzer</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor='white'
            onChangeText={(val) => this.setState({username: val})}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor='white'
            onChangeText={(val) => this.setState({pass: val})}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm Password"
            placeholderTextColor='white'
            onChangeText={(val) => this.setState({passConfirm: val})}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.register()}
          style={{...styles.register, opacity: buttonOpacity}}
          disabled={this.state.registerDisabled}>
          <Text style={styles.SignUpText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.login}>Already signed up? Log in</Text>
        </TouchableOpacity>
      </View>
    );
  }

  register = async () => {
    this.setState({loginDisabled: true});
    const data = await fetch('https://se380api.herokuapp.com/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username.trim(),
        password: this.state.pass.trim(),
        rePassword: this.state.passConfirm.trim(),
      }),
    });
    const resp = await data.json();
    if (resp.success) {
      ToastAndroid.show('User Created', ToastAndroid.LONG);
      this.props.navigation.navigate('Login');
    } else {
      ToastAndroid.show(resp.message, ToastAndroid.SHORT);
      this.setState({registerDisabled: false});
    }
  };
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(31,178,204,1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'rgba(255,255,255,1)',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    backgroundColor: 'rgba(251,247,247,0.25)',
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
    backgroundColor: 'rgba(21,31,40,1)',
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
