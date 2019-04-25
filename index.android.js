/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, BackAndroid, ToastAndroid } from 'react-native';
import { Container, StyleProvider } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';

// Import files
import AppHeader from './src/components/appHeader';
import AppBody from './src/components/appBody';
import AppFooter from './src/components/appFooter';

// Import Theme
import getTheme from './src/themes/components';
import tagShout from './src/themes/variables/tagShout';

// Import Pages
import HomePage from './src/components/pages/home_page';
import LoadingPage from './src/components/pages/loading_page';
import GuessFruitPage from './src/components/pages/guess_fruit_page';
import ResultPage from './src/components/pages/result_page';

// Import Advertisement
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded } from 'react-native-admob';

export default class GuessFruit extends Component {

  // Load Data after Rendering
  componentDidMount() {
    // Display an interstitial
    /*AdMobInterstitial.setAdUnitID('ca-app-pub-4238978489038820/1053110613');
    AdMobInterstitial.setTestDeviceID('EMULATOR');

    AdMobInterstitial.requestAd(error => {
      AdMobInterstitial.showAd((error) => {});
    });
    //AdMobInterstitial.requestAd(AdMobInterstitial.showAd);*/

    // Disable Back Button
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  // This method is called when a component is being removed from the DOM
  componentWillUnmount() {
    // Disable Back Button
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  // Disable Back Button
  handleBackButton() {
    //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  render() {
    return (

      // Display
      <StyleProvider style={getTheme(tagShout)}>
        <Container>
          <Router>
            <Scene key="home_page" component={AppBody} title="Home Page" hideNavBar={true} />
            <Scene key="loading_page" component={LoadingPage} title="Loading Page" hideNavBar={true} />
            <Scene key="guess_fruit_page" component={GuessFruitPage} title="Guess Fruit Page" hideNavBar={true} />
            <Scene key="result_page" component={ResultPage} title="Result Page" hideNavBar={true} />

          </Router>
          
        </Container>
      </StyleProvider>
    );
  }
}

// If you want to change component name, you can change it here
AppRegistry.registerComponent('GuessFruit', () => GuessFruit);
