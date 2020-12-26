import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class QuizStarter extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: navigation.getParam('quizName'),
    };
  };

  render() {
    console.log(this.props.navigation.getParam('quizId'));
    return (
      <View style={styles.main}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>See Leaderboard</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#e3b579',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 200,
    backgroundColor: '#3c2d2d',
    borderRadius: 25,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default QuizStarter;
