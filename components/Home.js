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
          <TouchableOpacity  style={styles.music}>
            <Text style={styles.categoryText}>Music</Text>
            <Icon name="music" size={25}/>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.sports}>
            <Text style={styles.categoryText}>Sports</Text>
            <Icon name="football-ball" size={25}/>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.science}>
            <Text style={styles.categoryText}>Science</Text>
            <Icon name="radiation" size={25}/>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.art}>
            <Text style={styles.categoryText}>Art</Text>
            <Icon name="paint-brush" size={25}/>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.movies}>
            <Text style={styles.categoryText}>Movies</Text>
            <Icon name="video" size={25}/>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.history}>
            <Text style={styles.categoryText}>History</Text>
            <Icon name="book" size={25}/>
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
    marginTop:70,
    marginBottom:20,
  },
  categoryText:{
    fontSize: 19,
    marginBottom: 5,
  },
  main: {
    flex: 1,
    backgroundColor: '#e3b579',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'space-around',
  },
  boxContainer: {
    flex:2,
    flexWrap: 'nowrap',
    backgroundColor: '#e3b579',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'space-around',
  },
  music:{
    alignSelf: 'flex-start',
    width: 70,
    backgroundColor: 'red',
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:10,
  },
  sports:{
    width: 70,
    backgroundColor: 'skyblue',
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:10,
  },
  movies:{
    width: 70,
    backgroundColor: 'yellow',
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:10,
  },
  science:{
    width: 70,
    backgroundColor: 'orange',
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:10,
  },
  history:{
    width: 70,
    backgroundColor: 'purple',
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:10,
  },
  art:{
    width: 70,
    backgroundColor: 'lightgreen',
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:10,
  },
});

export default Home;
