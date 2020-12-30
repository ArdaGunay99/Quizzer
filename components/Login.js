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
      username: '',
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
            placeholder="Username"
            placeholderTextColor='white'
            onFocus= {() => this.setState({placeholder : 'a'})}
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
  register: {
    color: 'white',
    fontSize: 11,
  },
  login: {
    width: '30%',
    backgroundColor: 'rgba(21,31,40,1)',
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
