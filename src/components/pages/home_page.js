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
		Actions.loading_page();
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

export default class HomePage extends Component {

	// Create Constructor because the "data" (this.state.data) will be empty
	// this.state.data gets from data: responseJson.feed.entry
	// And the "data" will go to the appBodyData.js
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			orientation: isPortrait() ? 'portrait' : 'landscape',
			appState: AppState.currentState
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

	// Get the data
	render() {

		// Display Array
		/*let buttonPlayButtons = buttonPlayList.map(buttonPlayInfo => {
	      return (
	              <CardItem key={buttonPlayInfo.buttonPlayID}>
	                <Button transparent style={{width: 340}}>
			            <Text onPress={buttonPlayInfo.buttonPlayURL}>{buttonPlayInfo.buttonPlayTitle}</Text>
			        </Button>
	              </CardItem>
	      )
	    });*/

	    // Display Single Value
	    let buttonPlayButton = () => {
	    	if (Platform.OS === 'ios') {
		    	if (this.state.orientation == 'portrait') {
		    		return (
			    		<CardItem key={1}>
			                <Button block style={{flex: 1, width: 140, marginTop: 250}} onPress={() => {return buttonAction('guess_fruit')}}>
					            <Text>Guess the Fruits</Text>
					        </Button>
			            </CardItem>
			    	)
		    	} else if (this.state.orientation == 'landscape') {
		    		return (
			    		<CardItem key={1}>
			                <Button block style={{flex: 1, width: 140, marginTop: 100}} onPress={() => {return buttonAction('guess_fruit')}}>
					            <Text>Guess the Fruits</Text>
					        </Button>
			            </CardItem>
			    	)
		    	}
	    	} else {
	    		if (this.state.orientation == 'portrait') {
		    		return (
			    		<CardItem key={1}>
			                <Button block style={{flex: 1, width: 140, marginTop: 250}} onPress={() => {return buttonAction('guess_fruit')}}>
					            <Text>Guess the Fruits</Text>
					        </Button>
			            </CardItem>
			    	)
		    	} else if (this.state.orientation == 'landscape') {
		    		return (
			    		<CardItem key={1}>
			                <Button block style={{flex: 1, width: 140, marginTop: 100}} onPress={() => {return buttonAction('guess_fruit')}}>
					            <Text>Guess the Fruits</Text>
					        </Button>
			            </CardItem>
			    	)
		    	}
	    	}
	    	
	    }

	    return (

			<Container>
		        <AppHeader />
		
					<ScrollView >
		      
			        	<Content>

		            		{buttonPlayButton()}
						
						</Content>

		            </ScrollView>

            </Container>
	        
	    );
	}

}

// Export this module because we want to import it in the main file
module.export = HomePage;