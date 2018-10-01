import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import AuthContainer from'./AuthContainer'

var config = {
    apiKey: "AIzaSyAYQnow1D-GsGFX3hsHJ1fKrEPNaQB-D5o",
    authDomain: "info343-sunrise.firebaseapp.com",
    databaseURL: "https://info343-sunrise.firebaseio.com",
    projectId: "info343-sunrise",
    storageBucket: "info343-sunrise.appspot.com",
    messagingSenderId: "560688272292"
  };
  firebase.initializeApp(config);

ReactDOM.render(<AuthContainer/>, document.getElementById('root'));


registerServiceWorker();
