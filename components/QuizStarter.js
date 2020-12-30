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
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Quiz')}>
          <Text style={styles.text}>START QUIZ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>LEADERBOARD</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
    backgroundColor:'rgba(21,31,40,0.30)',
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
