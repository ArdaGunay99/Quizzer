import React, {Component} from 'react';
import {
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import CountDown from 'react-native-countdown-component';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAnswer: '',
      questionIndex: 0,
      isAnswered: false,
      points: 0,
      finished: false,
      questions: props.navigation.getParam('questions'),
    };

    this.QuestionAnswered = this.QuestionAnswered.bind(this);
    this.PickColor = this.PickColor.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.finished) {
      // Send score to server
      this.saveScore();
    }

    // not sure if the below code should be here or inside QuestionAnswered()
    // it is basically aimed to show the right answer for 3 seconds and then increment the question index by 1 so we move to the next question
    if (this.state.isAnswered === true) {
      if (this.state.questionIndex + 1 === this.state.questions.length) {
        setTimeout(
          () => this.setState({finished: true, isAnswered: false}),
          3000,
        );
      } else {
        setTimeout(
          () =>
            this.setState((previousState) => ({
              questionIndex: previousState.questionIndex + 1,
              isAnswered: false,
              currentAnswer: '',
            })),
          3000,
        );
      }
    }
  }

  // this function will be called inside the OnPress prop of the TouchableOpacities like onPress={this.QuestionAnswered("A")}.
  // Currently when I try this, component crashes without rendering and says infinite loop happened...
  QuestionAnswered(answer) {
    if (this.state.isAnswered) {
      // Skip if already answered
      return;
    }

    if (
      answer === this.state.questions[this.state.questionIndex].correct_answer
    ) {
      // increase score and set isAnswered to True so the right answer will be shown for 3 seconds
      this.setState((previousState) => ({
        isAnswered: true,
        currentAnswer: answer,
        points:
          previousState.points +
          10 * this.state.questions[this.state.questionIndex].difficulty,
      }));
    } else {
      this.setState({isAnswered: true, currentAnswer: answer,});
    }
  }

  // this function changes the colors of the answers if the isAnswered is set to true
  // This function works as intended
  PickColor(answer) {
    if (this.state.isAnswered === true) {
      if (answer === this.state.currentAnswer) {
        if (
            answer === this.state.questions[this.state.questionIndex].correct_answer
        ) {
          return styles.pressedRightAnswer;
        } else {
          return styles.pressedWrongAnswer;
        }
      } else{
        if (
            answer === this.state.questions[this.state.questionIndex].correct_answer
        ) {
          return styles.rightAnswer;
        } else {
          return styles.wrongAnswer;
        }
      }
    }
    return styles.answer;
  }

  render() {
    //this will be returned if the finished is true to indicate the end of the quiz
    if (this.state.finished === true) {
      return (
        <View style={styles.resultsMain}>
          <Text style={styles.resultsText}>QUIZ FINISHED</Text>
          <Text style={styles.resultsText}>Score: {this.state.points}</Text>
          <TouchableOpacity
            style={styles.resultsButton}
            onPress={() => this.props.navigation.navigate('QuizStarter')}>
            <Text style={styles.resultsText}>TRY AGAIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.resultsButton}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.resultsText}>RETURN HOME</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.main}>
        <View style={styles.UpperRow}>
          <CountDown
            id={`${this.state.questionIndex}`}
            onFinish={() => this.QuestionAnswered(null)}
            running={!this.state.isAnswered}
            style={styles.countdown}
            until={15}
            size={12}
            timeToShow={['S']}
            timeLabels={{s: ''}}
          />
          <Text style={styles.questionCount}>
            {this.state.questionIndex + 1}/{this.state.questions.length}
          </Text>
          <Text style={styles.points}>score: {this.state.points}</Text>
        </View>

        <SafeAreaView style={styles.scroll_container}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.question}>
              {this.state.questions[this.state.questionIndex].text}
            </Text>
            {Object.keys(
              this.state.questions[this.state.questionIndex].answers,
            ).map((ansKey) => {
              return (
                <TouchableOpacity
                  key={ansKey}
                  onPress={() => this.QuestionAnswered(ansKey)}
                  style={this.PickColor(ansKey)}>
                  <Text style={styles.answerText}>
                    {
                      this.state.questions[this.state.questionIndex].answers[
                        ansKey
                      ]
                    }
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  saveScore = async () => {
    console.log('Saving score');
    const token = await AsyncStorage.getItem('token');
    const quizId = this.props.navigation.getParam('quizId');

    const data = await fetch(
      `https://se380api.herokuapp.com/quiz/${quizId}/score`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: this.state.points,
        }),
      },
    );
    const resp = await data.json();
    if (resp.success) {
      ToastAndroid.show('Score saved', ToastAndroid.SHORT);
    } else {
      console.log(resp.message);
    }
  };
}

const styles = StyleSheet.create({
  questionCount: {
    flex: 1,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 70,
  },
  countdown: {
    flex: 1,
    backgroundColor: 'rgba(21,31,40,1)',
  },
  points: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  UpperRow: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'rgba(21,31,40,1)',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(31,178,204,1)',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  question: {
    width: '75%',
    color: 'white',
    fontSize: 20,
    backgroundColor: 'rgba(31,178,204,1)',
    fontWeight: 'bold',
    height: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  answer: {
    fontWeight: 'bold',
    color: 'white',
    width: '75%',
    backgroundColor: 'rgba(21,31,40,0.30)',
    height: 100,
    borderRadius: 10,
    borderColor: 'rgba(21,31,40,1)',
    borderWidth: 3,
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  answerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightAnswer: {
    width: '75%',
    backgroundColor: 'green',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  wrongAnswer: {
    width: '75%',
    backgroundColor: 'red',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  pressedRightAnswer: {
    width: '75%',
    backgroundColor: 'green',
    height: 100,
    borderRadius: 10,
    borderColor: 'rgba(21,31,40,1)',
    borderWidth: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  pressedWrongAnswer: {
    width: '75%',
    backgroundColor: 'red',
    height: 100,
    borderRadius: 10,
    borderColor: 'rgba(21,31,40,1)',
    borderWidth: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  resultsMain: {
    flex: 1,
    backgroundColor: 'rgba(31,178,204,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsButton: {
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
  resultsText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  scroll_container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },
});

export default Quiz;
