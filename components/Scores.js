import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';

class Scores extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: navigation.getParam('quizName'),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      scores: props.navigation.getParam('scores'),
    };
  }

  render() {
    return (
      <View style={styles.main}>
        <Text>{JSON.stringify(this.state.scores)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(31,178,204,1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Scores;
