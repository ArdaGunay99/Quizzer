import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import QuizStarter from './components/QuizStarter';
import LoginScreen from './components/Login';
import RegisterScreen from './components/Register';
import HomeScreen from './components/Home';
import Quiz from './components/Quiz';

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
    Register: {
        screen: RegisterScreen
    },
    QuizStarter: {
      screen: QuizStarter,
    },
    Quiz:{
        screen: Quiz,
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerLeft: () => {
          return null;
        },
        headerTitle: 'Home',
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
