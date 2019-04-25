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

// Import Advertisement
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded } from 'react-native-admob';

// Button Guess Fruit Again
function buttonGuessFruitAgainAction() {
	Actions.guess_fruit_page();
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

export default class ResultPage extends Component {

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

	// Load Data after Rendering
	componentDidMount() {
		// Display a rewarded ad
	    AdMobRewarded.setAdUnitID('ca-app-pub-4238978489038820/6082425062');
	    AdMobRewarded.requestAd(error => {
	      AdMobRewarded.showAd((error) => {});
	    });
	    //AdMobRewarded.requestAd(AdMobRewarded.showAd);
	}

	// Get the data
	render() {

		let resultTitle = () => {
	    	if (Platform.OS === 'ios') {
		    	if (this.state.orientation == 'portrait') {
		    		return (
			    		<CardItem key={0}>
			                <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold', marginTop: 50}}>Your Score</Text>
			            </CardItem>
			    	)
		    	} else if (this.state.orientation == 'landscape') {
		    		return (
			    		<CardItem key={0}>
			                <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold', marginTop: 20}}>Your Score</Text>
			            </CardItem>
			    	)
		    	}
	    	} else {
	    		if (this.state.orientation == 'portrait') {
		    		return (
			    		<CardItem key={0}>
			                <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold', marginTop: 50}}>Your Score</Text>
			            </CardItem>
			    	)
		    	} else if (this.state.orientation == 'landscape') {
		    		return (
			    		<CardItem key={0}>
			                <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold', marginTop: 20}}>Your Score</Text>
			            </CardItem>
			    	)
		    	}
	    	}
	    	
	    }

		let resultScore = () => {
	    	if (Platform.OS === 'ios') {
		    	if (this.state.orientation == 'portrait') {
		    		return (
			    		<CardItem key={1}>
			                <Text style={{flex: 1, fontSize: 100, fontWeight: 'bold', marginTop: 50}}>{this.props.correctAnswer}</Text>
			            </CardItem>
			    	)
		    	} else if (this.state.orientation == 'landscape') {
		    		return (
			    		<CardItem key={1}>
			                <Text style={{flex: 1, fontSize: 100, fontWeight: 'bold', marginTop: 20}}>{this.props.correctAnswer}</Text>
			            </CardItem>
			    	)
		    	}
	    	} else {
	    		if (this.state.orientation == 'portrait') {
		    		return (
			    		<CardItem key={1}>
			                <Text style={{flex: 1, fontSize: 100, fontWeight: 'bold', marginTop: 50}}>{this.props.correctAnswer}</Text>
			            </CardItem>
			    	)
		    	} else if (this.state.orientation == 'landscape') {
		    		return (
			    		<CardItem key={1}>
			                <Text style={{flex: 1, fontSize: 100, fontWeight: 'bold', marginTop: 20}}>{this.props.correctAnswer}</Text>
			            </CardItem>
			    	)
		    	}
	    	}
	    	
	    }

		// Display Single Value
	    let buttonGuessFruitAgain = () => {
	    	if (Platform.OS === 'ios') {
		    	if (this.state.orientation == 'portrait') {
		    		return (
			    		<CardItem key={2}>
			                <Button block style={{flex: 1, width: 180, marginTop: 50}} onPress={() => {return buttonGuessFruitAgainAction('guess_fruit')}}>
					            <Text>Guess the Fruits Again</Text>
					        </Button>
			            </CardItem>
			    	)
		    	} else if (this.state.orientation == 'landscape') {
		    		return (
			    		<CardItem key={2}>
			                <Button block style={{flex: 1, width: 180, marginTop: 20}} onPress={() => {return buttonGuessFruitAgainAction('guess_fruit')}}>
					            <Text>Guess the Fruits Again</Text>
					        </Button>
			            </CardItem>
			    	)
		    	}
	    	} else {
	    		if (this.state.orientation == 'portrait') {
		    		return (
			    		<CardItem key={2}>
			                <Button block style={{flex: 1, width: 180, marginTop: 50}} onPress={() => {return buttonGuessFruitAgainAction('guess_fruit')}}>
					            <Text>Guess the Fruits Again</Text>
					        </Button>
			            </CardItem>
			    	)
		    	} else if (this.state.orientation == 'landscape') {
		    		return (
			    		<CardItem key={2}>
			                <Button block style={{flex: 1, width: 180, marginTop: 20}} onPress={() => {return buttonGuessFruitAgainAction('guess_fruit')}}>
					            <Text>Guess the Fruits Again</Text>
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

		            		{resultTitle()}
		            		{resultScore()}
		            		{buttonGuessFruitAgain()}
						
						</Content>

		            </ScrollView>

            </Container>
	        
	    );
	}

}

// Export this module because we want to import it in the main file
module.export = ResultPage;