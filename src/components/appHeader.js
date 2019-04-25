/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, Image } from 'react-native';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';

export default class AppHeader extends Component {
  render() {
    return (
      
        <Header>
          <Body>
            <Image source={require('../img/guess_fruit_logo.png')} style={{width: 150, height: 30}} />
          </Body>
        </Header>
        
      
    );
  }
}

// Export this module because we want to import it in the main file
module.export = AppHeader;