import React, {Component} from 'react';
import {
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

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

  constructor(props) {
    super(props);

    this.state = {
      token: null,
      quizes: null,
    };
  }

  componentDidMount() {
    this.getToken();

    this.props.navigation.setParams({logout: this.logout});
  }

  render() {
    console.log('Rendered', this.state);

    if (!this.state.token) {
      this.getToken();
      return <View style={styles.main} />;
    }

    if (!this.state.quizes) {
      this.getQuizes();
      return <View style={styles.main} />;
    }

    console.log(this.state.quizes);

    return (
      <View style={styles.main}>
        <Text style={styles.upperText}>Select a category</Text>
        <SafeAreaView style={styles.scroll_container}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {this.state.quizes.map((quiz) => {
              return (
                <TouchableOpacity
                  key={quiz.id}
                  onPress={() =>
                    this.props.navigation.navigate('QuizStarter', {
                      quizId: quiz.id,
                      quizName: quiz.name,
                    })
                  }
                  style={styles.topic}>
                  <Text style={styles.categoryText}>{quiz.name}</Text>
                  <Icon name={quiz.icon_name} size={35} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  getToken = async () => {
    console.log('Getting token');
    try {
      const token = await AsyncStorage.getItem('token');
      if (token == null) {
        this.props.navigation.navigate('Login');
      } else {
        this.setState({token});
      }
    } catch (e) {
      // Exception handling
    }
  };

  getQuizes = async () => {
    console.log('Getting quizes');
    const token = await AsyncStorage.getItem('token');
    const data = await fetch('https://se380api.herokuapp.com/quiz', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    const resp = await data.json();
    if (resp.success) {
      this.setState({quizes: resp.quizes, token});
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
  upperText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 20,
    marginLeft: 110,
  },

  categoryText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 5,
  },

  main: {
    flex: 1,
    backgroundColor: '#e3b579',
    justifyContent: 'center',
  },

  scroll_container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },

  topic: {
    width: '75%',
    backgroundColor: 'grey',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
});

export default Home;
