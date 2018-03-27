/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  WebView
} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
var SITE_URL = "https://www.google.com";

const WEBVIEW_REF = "WEBVIEW_REF";

function getInitialState() {
  return {
    url: SITE_URL,
    // OR
    // you can use a source object like React Native Webview.
    // source {uri: string, method: string, headers: object, body: string}, {html: string, baseUrl: string}
    // Loads static html or a uri (with optional headers) in the WebView. <Just like React Native's version>
    // source: {
    //   uri: SITE_URL,
    //   headers: {
    //     ...
    //   },
    // },
    status: 'No Page Loaded',
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    loading: true,
    messageFromWebView: null
  };
}

export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    this.state = {
      canGoBack: false,
      url: SITE_URL,
      // OR
      // you can use a source object like React Native Webview.
      // source {uri: string, method: string, headers: object, body: string}, {html: string, baseUrl: string}
      // Loads static html or a uri (with optional headers) in the WebView. <Just like React Native's version>
      // source: {
      //   uri: SITE_URL,
      //   headers: {
      //     ...
      //   },
      // },
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      messageFromWebView: null
    }
  }
  
  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }
  render() {
    return (
      <View style={styles.containerWebView}>
        <View style={styles.topbar}>
          <TouchableOpacity
            disabled={!this.state.canGoBack}
            onPress={this.onBack.bind(this)}
            >
            <Text style={this.state.canGoBack ? styles.topbarText : styles.topbarTextDisabled}>Go Back</Text>
          </TouchableOpacity>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          style={{flex: 1}}
          onNavigationStateChange=
            {this.onNavigationStateChange.bind(this)}
          source={{uri: 'https://google.com'}}
          /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  topbar: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbarTextDisabled: {
    color: 'gray'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  containerWebView: {
    flex: 1,
  }
});
