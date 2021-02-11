import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

class Scores extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Personal History",
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            head: ['QUIZ', 'SCORE', 'DATE'],
           // scores: props.navigation.getParam('scores'),


        };
    }

    render() {
        // console.log(this.state.scores) ;
        let state = this.state;
        // const data = state.scores.map(function (param) {
        //     return [param.username, param.score+"/150", param.date]
        // } )

        return (
            <View>
                <Table>
                    <Row data={state.head} style={styles.head} textStyle={styles.textHeader} />
                    <ScrollView style={{marginBottom: 100}}>
                        {/*<Rows data={data} textStyle={styles.text} style={styles.rows}/>*/}
                    </ScrollView>
                </Table>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    head: {
        height: 40,
        backgroundColor: 'rgba(31,178,204,1)',
        borderWidth: 3,
        borderColor: 'rgba(21,31,40,1)'
    },
    text: {
        margin: 6,
        fontSize: 15,
        paddingLeft: 10,
        fontWeight: 'bold'

    },
    textHeader: {
        margin: 6,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    rows: {
        borderWidth: 1,
        borderColor: 'rgba(21,31,40,1)'

    }





});

export default Scores;
