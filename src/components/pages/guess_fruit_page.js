/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, Image, Linking, Dimensions, ScrollView, AppState, Platform, View } from 'react-native';
import { Content, Card, CardItem, Body, Left, Thumbnail, Button, Icon, Container } from 'native-base';
import TimeAgo from 'react-native-timeago';
import FitImage from 'react-native-fit-image';
import shuffle from 'shuffle-array';

import AppHeader from '../appHeader';
//import AppFooter from '../appFooter';

// Import Files
import { hello, getImage, contentSnippet } from '../../helpers/helpers';

import { Actions } from 'react-native-router-flux';

// Import Advertisement
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded } from 'react-native-admob';

// Define List Fruit
const guessFruitList = [
  {
    fruitID: 1,
    fruitTitle: 'Apple',
    fruitImage: require('../images/apple.png')
  },
  {
    fruitID: 2,
    fruitTitle: 'Banana',
    fruitImage: require('../images/banana.png')
  },
  {
    fruitID: 3,
    fruitTitle: 'Cherry',
    fruitImage: require('../images/cherry.png')
  },
  {
    fruitID: 4,
    fruitTitle: 'Durian',
    fruitImage: require('../images/durian.png')
  },
  {
    fruitID: 5,
    fruitTitle: 'Elderberry',
    fruitImage: require('../images/elderberry.png')
  }
];

const guessFruitQuestion = []; // Define List Fruit Question
const guessFruitAnswer = []; // Define List Fruit Answer

// Define Advertisement
const advertisementList = [
  {
    fruitID: 100,
    fruitTitle: 'advertisement_1',
    fruitImage: require('../images/advertisement.png')
  }
];

export default class GuessFruitPage extends Component {

  // constructor
  constructor(props) {
      super(props);
      this.state = {
        dataFruit: [],
        dataFruitQuestion: [],
        dataFruitAnswer: [],
        setFruitID: 0,
        setCorrectAnswer: 0,
        setFalseAnswer: 0,
        currentCount: 3
        //<Text>{this.state.setCorrectAnswer} and {this.state.setFalseAnswer}</Text>
      }
  }

  // Get Fruits Question
  getFruitsQuestion(i) {
    if (i == 0) {
      shuffle(guessFruitList); // Shuffle the fruit list
    }
    
    // Insert the first fruit question
    guessFruitList.map(guessFruitInfo => {
      if (guessFruitInfo.fruitTitle == guessFruitList[i].fruitTitle) {
        guessFruitQuestion.pop(); // Use this if you want to keep only 1 value in array
        guessFruitQuestion.push(guessFruitInfo); // Insert the fruit question 
      }
    });

    this.setState({dataFruitQuestion: guessFruitQuestion}); // Set the fruit question to the state

    // Set Timer to change the question
    this._interval = setInterval(() => {
        this.timerMine();
    }, 1000);

    // Set Timer to 3 again
    this.setState({
      currentCount: 3
    })
  }

  // Get Fruits Answer
  getFruitsAnswer(i) {
    // Empty Fruit Answer - 4 times
    for(let i = 0; i <= 4; i++){
      guessFruitAnswer.pop();
    }

    // Insert the fruit answer
    guessFruitList.map(guessFruitInfo => {
      // Insert 1 fruit correct answer
      if (guessFruitInfo.fruitTitle == guessFruitList[i].fruitTitle) {
        guessFruitAnswer.pop(); // Use this if you want to keep only 1 value in array
        guessFruitAnswer.push(guessFruitInfo); // Insert the fruit answer 
      }

      // Insert 2 fruit false answer
      if (guessFruitAnswer.length <= 3) {
        if (guessFruitInfo.fruitTitle != guessFruitList[i].fruitTitle) {
          guessFruitAnswer.push(guessFruitInfo); // Insert the fruit answer
        }
      }
    });

    //guessFruitAnswer.push(advertisementList[0]); // Insert the fruit answer

    shuffle(guessFruitAnswer); // Shuffle the fruit list

    this.setState({dataFruitAnswer: guessFruitAnswer}); // Set the fruit answer to the state
  }

  // Next Fruit Action
  fruitNextQuestionAction(setNextFruitID) {
    var maxFruitID = guessFruitList.length;
    var nextFruitID = parseInt(setNextFruitID) + 1;
    
    /*if (nextFruitID > maxFruitID) {
      nextFruitID = 1;
    }*/
    
    this.setState({setFruitID: nextFruitID}); // Set the fruit ID to the state

    this.getFruitsQuestion(nextFruitID); // Get the next fruit question
    this.getFruitsAnswer(nextFruitID); // Get the next fruit answer
  }

  // Answer Action
  answerAction = (fruit_answer, setNextFruitID) => {
    clearInterval(this._interval); // Clear Variable Time Interval

    var maxFruitID = guessFruitList.length;
    var nextFruitID = parseInt(setNextFruitID) + 1;

    if (nextFruitID <= maxFruitID) {
      if (fruit_answer == guessFruitQuestion[0].fruitTitle) {
        //alert("correct");

        var totalCorrectAnswer = parseInt(this.state.setCorrectAnswer) + 1;
        this.setState({setCorrectAnswer: totalCorrectAnswer});
      } else {
        //alert("false");

        var totalFalseAnswer = parseInt(this.state.setFalseAnswer) + 1;
        this.setState({setFalseAnswer: totalFalseAnswer});
      }
    }

    if (nextFruitID < maxFruitID) {
      this.fruitNextQuestionAction(setNextFruitID); // Continue to the next question
    } else {
      this.setState({setFruitID: nextFruitID + 1}); // This condition is to get the last value correct or false answer
      
      // This condition is to get the last value correct or false answer
      var fullCorrectAnswer = this.state.setCorrectAnswer;
      var fullFalseAnswer = this.state.setFalseAnswer;

      if (fruit_answer == guessFruitQuestion[0].fruitTitle) {
        var fullCorrectAnswer = this.state.setCorrectAnswer + 1;
      } else {
        var fullFalseAnswer = this.state.setFalseAnswer + 1;
      }

      Actions.result_page({
        correctAnswer: fullCorrectAnswer,
        falseAnswer: fullFalseAnswer
      }); // Go to Result Page
    }
  }

  // Load Data after Rendering
  componentDidMount() {
    this.getFruitsQuestion(this.state.setFruitID); // Get the first fruit question
    this.getFruitsAnswer(this.state.setFruitID); // Get the first fruit answer
  }

  // Unmount the variable
  componentWillUnmount() {
    // When a component unmounts, these timers have to be cleared and
    // so that you are not left with zombie timers doing things when you did not expect them to be there.
    clearInterval(this._interval);
  }

  // Set time count from 3 2 1
  timerMine() {
    var newCount = this.state.currentCount - 1;

    if (newCount >= 0) {
      this.setState({
        currentCount: newCount
      })

      if (newCount == 0) {
        this.answerAction("banana", this.state.setFruitID) // Go to the next question
      }
    } else {
      clearInterval(this._interval);
    }
  }

  // note
  /*
  let fruits_list = guessFruitList.map(guessFruitInfo => {
    return (
              <Text key={guessFruitInfo.fruitID}>{guessFruitInfo.fruitID}</Text>
      )
  });
  */

  // Get the data from AppBody
  render() {

    let fruits_question = this.state.dataFruitQuestion.map(guessFruitInfo => {
      return (
        <CardItem key={guessFruitInfo.fruitID}>
          <FitImage source = {guessFruitInfo.fruitImage} style={{width: 256, height: 256}} />
        </CardItem>
      )
    });

    let fruits_answer = this.state.dataFruitAnswer.map(guessFruitAnswerInfo => {

      if (guessFruitAnswerInfo.fruitID == 100) {
        return (
          <CardItem key={guessFruitAnswerInfo.fruitID}>
          <AdMobBanner
            bannerSize="banner"
            adUnitID="ca-app-pub-4238978489038820/6861401684"
            testDeviceID="EMULATOR"
            didFailToReceiveAdWithError={this.bannerError} />
          </CardItem>
        )
      } else {
      return (
        <CardItem key={guessFruitAnswerInfo.fruitID}>
          <Button block style={{flex: 1, width: 340}} onPress={() => {return this.answerAction(guessFruitAnswerInfo.fruitTitle, this.state.setFruitID)}}>
            <Text>{guessFruitAnswerInfo.fruitTitle}</Text>
          </Button>
        </CardItem>
      )
    }
      
    });

    let buttonFruitNextQuestion = () => {
      return (
        <CardItem key={1}>
                <Button block style={{flex: 1, width: 340}} onPress={() => {return this.fruitNextQuestionAction(this.state.setFruitID)}}>
                <Text>Guess the Fruits</Text>
            </Button>
            </CardItem>
      )
    }

    return (
      
            <Container>
              
              <AppHeader />
    
                <ScrollView >
          
                  <Content>

                  <Text>{this.state.currentCount}</Text>

                    {fruits_question}
                    {fruits_answer}
            
                  </Content>

                </ScrollView>

            </Container>
            
      );
  }

}

// Export this module because we want to import it in the main file
module.export = GuessFruitPage;