/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class AppFooter extends Component {
    constructor() {
        super();
        this.state = {
            activeTabName: 'facebook_page'
        }
    }

    tabAction(tab) {
        this.setState({activeTabName: tab});
        if (tab === 'facebook_page') {
            Actions.facebook_page_clicked();

            /*// Special Case for stopping music
            if (!this.props.datamusic) {
                return;
            }
            this.props.datamusic.stop().release();*/
        } else if (tab === 'twitter_page') {
            Actions.twitter_page();

            /*// Special Case for stopping music
            if (!this.props.datamusic) {
                return;
            }
            this.props.datamusic.stop().release();*/
        }  else if (tab === 'instagram_page') {
            Actions.instagram_page();

            /*// Special Case for stopping music
            if (!this.props.datamusic) {
                return;
            }
            this.props.datamusic.stop().release();*/
        } else if (tab === 'music_page') {
            Actions.music_page();
        } else {
            Actions.about_page();

            /*// Special Case for stopping music
            if (!this.props.datamusic) {
                return;
            }
            this.props.datamusic.stop().release();*/
        }
    }

  render() {
    return (
      
        <Footer>
        	<FooterTab>
        		<Button active={(this.state.activeTabName === 'facebook_page')?true:false} onPress={() => {this.tabAction('facebook_page')}}>
        			<Icon active name="logo-facebook" />
        		</Button>

                <Button active={(this.state.activeTabName === 'twitter_page')?true:false} onPress={() => {this.tabAction('twitter_page')}}>
                    <Icon active name="logo-twitter" />
                </Button>

                <Button active={(this.state.activeTabName === 'instagram_page')?true:false} onPress={() => {this.tabAction('instagram_page')}}>
                    <Icon active name="logo-instagram" />
                </Button>

        		<Button active={(this.state.activeTabName === 'music_page')?true:false} onPress={() => {this.tabAction('music_page')}}>
        			<Icon name="musical-notes" />
        		</Button>

        		<Button active={(this.state.activeTabName === 'about_page')?true:false} onPress={() => {this.tabAction('about_page')}}>
        			<Icon name="person" />
        		</Button>
        	</FooterTab>
        </Footer>
        
      
    );
  }
}

// Export this module because we want to import it in the main file
module.export = AppFooter;