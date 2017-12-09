import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducers from './src/reducers';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyClyduv6YRuQ_w21z-M0Vl2-Dna63NiO9E',
      authDomain: 'manager-c590e.firebaseapp.com',
      databaseURL: 'https://manager-c590e.firebaseio.com',
      projectId: 'manager-c590e',
      storageBucket: 'manager-c590e.appspot.com',
      messagingSenderId: '415498968979'
    };
    
    firebase.initializeApp(config);
  }
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <LoginForm />
      </Provider>
    );
  }
}
