import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CountDown from 'react-native-countdown-component';

class Quiz extends Component{

    constructor(props) {
        super(props);

        this.state = {
            questionIndex: 0,
            isAnswered: false,
            points: 0,
            finished: false,
            questions: [
                {
                    "id": 1,
                    "quiz_id": 1,
                    "text": "Name the 20 century Australian painter who made his name with series of ’Ned Kelly' Paintings?",
                    "answers": {
                        "A": "Samuel Dolan",
                        "B": "Sidney Dylan",
                        "C": "Stanley Cole",
                        "D": "Sidney Nolan"
                    },
                    "correct_answer": "A",
                    "difficulty": 1
                },
                {
                    "id": 2,
                    "quiz_id": 1,
                    "text": "Which surrealist artist once described his paintings as 'hand-painted dream photographs'?",
                    "answers": {
                        "A": "Salvador Dali",
                        "B": "Pablo Picasso",
                        "C": "Leonardo da Vinci",
                        "D": "Claude Monet"
                    },
                    "correct_answer": "A",
                    "difficulty": 1
                },
                {
                    "id": 3,
                    "quiz_id": 1,
                    "text": "The 17 century French landscape painter Claude Gelee is better known by the name he adopted from the province where he was born. What is the name?",
                    "answers": {
                        "A": "Claude Picardie",
                        "B": "Claude Provence",
                        "C": "Claude Alsace",
                        "D": "Claude Lorraine"
                    },
                    "correct_answer": "D",
                    "difficulty": 1
                },
                {
                    "id": 7,
                    "quiz_id": 1,
                    "text": "Which Spanish artist, he died in 1828 produced a series of sardonic etching entitled 'The Disasters Of War' condemning the Napoleonic invasion of Spain?",
                    "answers": {
                        "A": "Goya",
                        "B": "Velasquez",
                        "C": "Murillo",
                        "D": "El Greco"
                    },
                    "correct_answer": "A",
                    "difficulty": 2
                }
            ]

        };


        this.QuestionAnswered = this.QuestionAnswered.bind(this);
        this.PickColor = this.PickColor.bind(this);

    }
    componentDidUpdate(prevProps, prevState) {
        // not sure if the below code should be here or inside QuestionAnswered()
        // it is basically aimed to show the right answer for 3 seconds and then increment the question index by 1 so we move to the next question
        if(this.state.isAnswered === true){
            if(this.state.questionIndex+1 === this.state.questions.length){
                setTimeout(()=>this.setState({finished: true, isAnswered: false}),3000);
            }
            else setTimeout(()=>this.setState(previousState =>({questionIndex: previousState.questionIndex+1, isAnswered: false})),3000);

        }
    }

    // this function will be called inside the OnPress prop of the TouchableOpacities like onPress={this.QuestionAnswered("A")}.
    // Currently when I try this, component crashes without rendering and says infinite loop happened...
    QuestionAnswered(answer){
        if(answer === this.state.questions[this.state.questionIndex].correct_answer){
            // increase score and set isAnswered to True so the right answer will be shown for 3 seconds
            this.setState(previousState =>({isAnswered: true , points: previousState.points+10}));
                // not sure if the below code should be here or inside componentDidUpdate()
                // it is basically aimed to show the right answer for 3 seconds and then increment the question index by 1 so we move to the next question
                /*if(this.state.questionIndex+1 === questions.length){// if we are at the last question set the finished to true so that the quiz finished will be rendered
                    setTimeout(this.setState({finished: true, isAnswered: false}),3000);
                }
                else setTimeout(this.setState(previousState =>({questionIndex: previousState.questionIndex+1, isAnswered: false})),3000);*/
        }
        else{
            this.setState({isAnswered: true});
                // not sure if the below code should be here or inside componentDidUpdate()
                // it is basically aimed to show the right answer for 3 seconds and then increment the question index by 1 so we move to the next question
                /*if(this.state.questionIndex+1 === questions.length){// if we are at the last question set the finished to true so that the quiz finished will be rendered
                    setTimeout(this.setState({finished: true, isAnswered: false}),3000);
                }
                else setTimeout(this.setState(previousState =>({questionIndex: previousState.questionIndex+1, isAnswered: false})),3000);*/
        }
    }
    // this function changes the colors of the answers if the isAnswered is set to true
    // This function works as intended
    PickColor(answer){
        if (this.state.isAnswered === true ) {
            if (answer === this.state.questions[this.state.questionIndex].correct_answer) {
                return styles.rightAnswer;
            }
            else return styles.wrongAnswer;
        }
        return styles.answer;
    }

    render() {
        //this will be returned if the finished is true to indicate the end of the quiz
        if(this.state.finished === true){
            return(
                <View style={styles.resultsMain}>
                    <Text>QUIZ FINISHED</Text>
                    <Text>Score: {this.state.points}</Text>
                    <TouchableOpacity style={styles.resultsButton} onPress={() => this.props.navigation.navigate('QuizStarter')}>
                        <Text style={styles.resultsText}>TRY AGAIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resultsButton} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.resultsText}>RETURN HOME</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return(
            <View style={styles.main}>
                <View style={styles.UpperRow}>
                    <CountDown id={this.state.questionIndex} onFinish={()=> this.QuestionAnswered("E")} running={!this.state.isAnswered} style={styles.countdown}  until={15} size={12} timeToShow={['S']} timeLabels={{s: ''}}/>
                    <Text style={styles.questionCount}>{this.state.questionIndex+1}/{this.state.questions.length}</Text>
                    <Text style={styles.points}>points: {this.state.points}</Text>
                </View>
                <Text style={styles.question}>{this.state.questions[this.state.questionIndex].text}</Text>

                <TouchableOpacity onPress={()=>this.QuestionAnswered("A")}  style={this.PickColor("A")}>
                    <Text>{this.state.questions[this.state.questionIndex].answers.A}</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={()=>this.QuestionAnswered("B")} style={this.PickColor("B")}>
                    <Text>{this.state.questions[this.state.questionIndex].answers.B}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.QuestionAnswered("C")}  style={this.PickColor("C")}>
                    <Text>{this.state.questions[this.state.questionIndex].answers.C}</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={()=>this.QuestionAnswered("D")} style={this.PickColor("D")}>
                    <Text>{this.state.questions[this.state.questionIndex].answers.D}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    questionCount: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 70,
    },
    countdown:{
        flex: 1,
        backgroundColor: '#3eb70f',
    },
    points: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        // marginTop: 70,
        //marginBottom: 20,
       //marginLeft: 150,
    },
    UpperRow:{
        //flex: 1,
        flexDirection:'row',
        //width: 30,
        height: 30,
        backgroundColor: '#3eb70f',
        justifyContent: 'space-between'
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
        backgroundColor: '#e3b579',
        justifyContent: 'flex-start',
        alignItems:'stretch',
    },
    question: {
        width: '75%',
        backgroundColor: 'white',
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginLeft: 50,
    },
    answer:{
        width: '75%',
        backgroundColor: 'grey',
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginLeft: 50,
    },
    rightAnswer:{
        width: '75%',
        backgroundColor: 'green',
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginLeft: 50,
    },
    wrongAnswer:{
        width: '75%',
        backgroundColor: 'red',
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginLeft: 50,
    },
    resultsMain: {
        flex: 1,
        backgroundColor: '#e3b579',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    resultsButton: {
        width: 200,
        backgroundColor: '#3c2d2d',
        borderRadius: 25,
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
});

export  default Quiz;
