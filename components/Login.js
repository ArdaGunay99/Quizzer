import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usename: '',
      pass: '',
      loginDisabled: false,
    };
  }

  render() {
    const buttonOpacity = this.state.loginDisabled ? 0.4 : 1;

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
        <TouchableOpacity
          onPress={() => this.login()}
          style={{...styles.login, opacity: buttonOpacity}}
          disabled={this.state.loginDisabled}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.register}>No account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  login = async () => {
    this.setState({loginDisabled: true});
    const data = await fetch('https://se380api.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.pass,
      }),
    });
    const resp = await data.json();
    if (resp.success) {
      const token = resp.token;
      await AsyncStorage.setItem('token', token);

      this.props.navigation.navigate('Home', {initial: false});
    } else {
      ToastAndroid.show(resp.message, ToastAndroid.SHORT);
      this.setState({loginDisabled: false});
    }
  };
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
  register: {
    color: 'white',
    fontSize: 11,
  },
  login: {
    width: '30%',
    backgroundColor: '#3c2d2d',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default Login;
