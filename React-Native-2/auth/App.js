import React from 'react';
import firebase from 'firebase';
import { StyleSheet, View } from 'react-native';
import { Header, Button, CardSection, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAX4IpxPP8K4EP0968__kfBnnuMrMwMVxY',
      authDomain: 'auth-d3d87.firebaseapp.com',
      databaseURL: 'https://auth-d3d87.firebaseio.com',
      projectId: 'auth-d3d87',
      storageBucket: 'auth-d3d87.appspot.com',
      messagingSenderId: '588931667383'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
 
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button 
              onPress={() => firebase.auth().signOut()}
            >
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
