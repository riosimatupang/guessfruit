/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';

// Import files
import AppBodyData from './appBodyData';

export default class AppBody extends Component {

  // Send the data from API to the AppBodyData
  // Use Constructor to check if the data is empty
  render() {
    return (
        <AppBodyData />
    );
  }
}

// Export this module because we want to import it in the main file
module.export = AppBody;