import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

class QuizStarter extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: navigation.getParam('quizName'),
    };
  };

  constructor() {
    super();

    this.state = {
      questions: null,
      scores: null,
    };
  }

  render() {
    console.log('Rendered', this.props.navigation.getParam('quizId'));
    if (!this.state.questions) {
      this.getQuestions();
    }

    if (!this.state.scores) {
      this.getScores();
    }

    return (
      <View style={styles.main}>
        <TouchableOpacity
          disabled={!this.state.questions}
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('Quiz', {
              questions: this.state.questions,
              quizId: this.props.navigation.getParam('quizId'),
            });
            this.setState({questions: null, scores: null});
          }}>
          <Text style={styles.text}>START QUIZ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          disabled={!this.state.scores}
          onPress={() => {
            this.props.navigation.navigate('Scores', {
              quizName: this.props.navigation.getParam('quizName'),
              scores: this.state.scores,
            });
            this.setState({questions: null, scores: null});
          }}>
          <Text style={styles.text}>LEADERBOARD</Text>
        </TouchableOpacity>
      </View>
    );
  }

  getQuestions = async () => {
    console.log('Getting questions');
    const token = await AsyncStorage.getItem('token');
    const quizId = this.props.navigation.getParam('quizId');

    const data = await fetch(
      `https://se380api.herokuapp.com/quiz/${quizId}/questions`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    const resp = await data.json();
    if (resp.success) {
      this.setState({questions: resp.questions});
    }
  };

  getScores = async () => {
    console.log('Getting scores');
    const token = await AsyncStorage.getItem('token');
    const quizId = this.props.navigation.getParam('quizId');

    const data = await fetch(
      `https://se380api.herokuapp.com/quiz/${quizId}/scores`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    const resp = await data.json();
    if (resp.success) {
      this.setState({scores: resp.scores});
    }
  };
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(31,178,204,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    backgroundColor: 'rgba(21,31,40,0.30)',
    borderRadius: 25,
    borderColor: 'rgba(21,31,40,1)',
    borderWidth: 3,
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
