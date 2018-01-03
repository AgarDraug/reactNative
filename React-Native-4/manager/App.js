import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './src/reducers';
import Router from './src/Router';

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
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
