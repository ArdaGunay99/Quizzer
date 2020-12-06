import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './components/Login';
import RegisterScreen from './components/Register';
import HomeScreen from './components/Home';
import {Text, TouchableOpacity} from 'react-native';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerLeft: () => {
          return null;
        },
        headerTitle: 'Login',
      },
    },
    Register: {screen: RegisterScreen},
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerLeft: () => {
          return null;
        },
        headerTitle: 'Home',
        // headerRight: () => {
        //   return (
        //     <TouchableOpacity
        //       onPress={() => {
        //         console.log('pressed');
        //         navigate('Login');
        //       }}>
        //       <Text
        //         style={{
        //           color: '#056096',
        //           fontWeight: 'bold',
        //           margin: 10,
        //         }}>
        //         Logout
        //       </Text>
        //     </TouchableOpacity>
        //   );
        // },
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;
