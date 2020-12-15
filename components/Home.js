import React, {Component} from 'react';
import {
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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

  componentDidMount() {
    this.getToken();

    this.props.navigation.setParams({logout: this.logout});
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.upperText}>Select a category</Text>
        <View style={styles.boxContainer}>
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('QuizStarter')}  style={styles.music}>
            <Text style={styles.categoryText}>Music</Text>
            <Icon name="music" size={35}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizStarter')}  style={styles.sports}>
            <Text style={styles.categoryText}>Sports</Text>
            <Icon name="football-ball" size={35}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizStarter')}  style={styles.science}>
            <Text style={styles.categoryText}>Science</Text>
            <Icon name="radiation" size={35}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizStarter')}  style={styles.art}>
            <Text style={styles.categoryText}>Art</Text>
            <Icon name="paint-brush" size={35}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizStarter')}  style={styles.movies}>
            <Text style={styles.categoryText}>Movies</Text>
            <Icon name="video" size={35}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizStarter')}  style={styles.history}>
            <Text style={styles.categoryText}>History</Text>
            <Icon name="book" size={35}/>
          </TouchableOpacity>
        </View>
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
  upperText:{
    fontSize:24,
    fontWeight: 'bold',
    marginTop:70,
    marginBottom:20,
    marginLeft:110,
  },

  categoryText:{
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

  boxContainer: {
    flex:2,
    flexWrap: 'wrap',
    backgroundColor: '#e3b579',
    justifyContent: 'space-around',
    alignContent: 'space-around',
  },

  music:{
    width: 100,
    backgroundColor: 'crimson',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:10,
  },

  sports:{
    width: 100,
    backgroundColor: 'dodgerblue',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:10,
  },

  movies:{
    width: 100,
    backgroundColor: 'gold',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:10,
  },

  science:{
    width: 100,
    backgroundColor: 'lawngreen',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:10,
  },

  history:{
    width: 100,
    backgroundColor: 'blueviolet',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:10,
  },

  art:{
    width: 100,
    backgroundColor: 'chocolate',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:10,
  },

});

export default Home;
