/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, Image, Linking, Dimensions, ScrollView, AppState, Platform } from 'react-native';
import { Content, Card, CardItem, Body, Left, Thumbnail, Button, Icon, Container } from 'native-base';
import TimeAgo from 'react-native-timeago';
import FitImage from 'react-native-fit-image';

import AppHeader from '../appHeader';

// Import Files
import { hello, getImage, contentSnippet } from '../../helpers/helpers';

import { Actions } from 'react-native-router-flux';

/*const buttonPlayList = [
  {
    buttonPlayID: 1,
    buttonPlayTitle: '',
    buttonPlayURL: () => {}
  },
  {
    buttonPlayID: 2,
    buttonPlayTitle: '',
    buttonPlayURL: () => {}
  },
  {
    buttonPlayID: 3,
    buttonPlayTitle: '',
    buttonPlayURL: () => {}
  },
  {
    buttonPlayID: 4,
    buttonPlayTitle: '',
    buttonPlayURL: () => {}
  }
]*/

// Button Action
function buttonAction(button) {
	if (button === 'guess_fruit') {
		Actions.guess_fruit_page();
	}
}

// isPotrait
const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};

// isLandscape
const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};

export default class LoadingPage extends Component {

	// Create Constructor because the "data" (this.state.data) will be empty
	// this.state.data gets from data: responseJson.feed.entry
	// And the "data" will go to the appBodyData.js
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			orientation: isPortrait() ? 'portrait' : 'landscape',
			appState: AppState.currentState,
			currentCount: 10
		}

		// Event Listener for orientation changes
	    Dimensions.addEventListener('change', () => {
	        this.setState({
	            orientation: isPortrait() ? 'portrait' : 'landscape'
	        });
	    });

	    // Event Listener for appstate changes
	    AppState.addEventListener('change', (nextAppState) => {
	        this.setState({
	            appState: nextAppState
	        });
	    });
	}

	// Load Data after Rendering
	componentDidMount() {
		// Set Timer to change the question
	    this._interval = setInterval(() => {
	        this.timerMine();
	    }, 1000);
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
	        Actions.guess_fruit_page(); // go to guess fruit page
	      }
	    } else {
	      clearInterval(this._interval);
	    }
	}

	// Get the data
	render() {

		let timerButton = () => {
			if (this.state.currentCount > 8 && this.state.currentCount <= 10) {
				var newCurrentCount = "Hi...";

				return (
					<CardItem key={0}>
						<Text style={{flex: 1, fontSize: 50, fontWeight: 'bold', marginTop: 220}}>{newCurrentCount}</Text>
					</CardItem>
				)
			} else if (this.state.currentCount > 5 && this.state.currentCount <= 8) {
				var newCurrentCount = "Each question has 3 seconds to answer...";

				return (
					<CardItem key={0}>
						<Text style={{flex: 1, fontSize: 20, fontWeight: 'bold', marginTop: 220}}>{newCurrentCount}</Text>
					</CardItem>
				)
			} else if (this.state.currentCount > 3 && this.state.currentCount <= 5) {
				var newCurrentCount = "This game will be started in 3 seconds...";

				return (
					<CardItem key={0}>
						<Text style={{flex: 1, fontSize: 20, fontWeight: 'bold', marginTop: 220}}>{newCurrentCount}</Text>
					</CardItem>
				)
			} else if (this.state.currentCount > 0 && this.state.currentCount <= 3) {
				var newCurrentCount = this.state.currentCount;

				return (
					<CardItem key={0}>
						<Text style={{flex: 1, fontSize: 200, fontWeight: 'bold', marginTop: 150}}>{newCurrentCount}</Text>
					</CardItem>
				)
			}
			
		}

		return (

			<Container>
		        <AppHeader />
		
					<ScrollView >
		      
			        	<Content>

		            		{timerButton()}
						
						</Content>

		            </ScrollView>

            </Container>
	        
	    );
	}

}

// Export this module because we want to import it in the main file
module.export = LoadingPage;