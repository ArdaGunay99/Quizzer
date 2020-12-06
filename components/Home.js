import React, {Component} from 'react';
import {
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class Home extends Component {
  static navigationOptions = ({navigation}) => {
    const {navigate} = navigation;
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            this.logout(navigate);
          }}>
          <Text
            style={{
              color: '#056096',
              fontWeight: 'bold',
              margin: 10,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount() {
    this.getToken();

    this.props.navigation.setParams({logout: this.logout});
  }

  render() {
    return (
      <View style={styles.main}>
        <Text>Home Page</Text>
      </View>
    );
  }

  getToken = async () => {
    console.log('Getting token');
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      if (token == null) {
        this.props.navigation.navigate('Login');
      }
    } catch (e) {
      // Exception handling
    }
  };

  static logout = async (navigate) => {
    try {
      await AsyncStorage.removeItem('token');
      navigate('Login');
    } catch (e) {
      // Exception handling
      console.log(e);
    }
  };
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#e3b579',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
