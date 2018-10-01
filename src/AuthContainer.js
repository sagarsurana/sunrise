import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import App from './App'




export default class AuthContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentUser: undefined,
            userInfo:undefined,
            signInErrorMessage: undefined,
            signUpErrorMessage: undefined
        }
    }

    componentDidMount(){
        this.removeListenerFunction = firebase.auth().onAuthStateChanged((firebaseUser) =>{
            if(firebaseUser){
               
               let userRef = firebase.database().ref('UserPrefs').child(firebaseUser.uid)
               userRef.on('value', (snapshot)=> {
                this.setState({
                    currentUser:firebaseUser,
                    userInfo:snapshot.val()
                })
               })
            }
            else {
                this.setState({currentUser:undefined});
            }
        })
    }

    componentWillUnmount(){
        this.removeListenerFunction();
    }

    handleSignUp(email, password){
        this.setState({signUpErrorMessage:null});
        console.log('signing up', email, password);
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch((err) => {
            console.log(err)
            this.setState({signUpErrorMessage: err.message})
        })

        
    }

    handleSignIn(email, password){
        this.setState({signInErrorMessage:null})
        console.log('signing in')
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
            console.log(error);
            this.setState({signInErrorMessage: error.message});
        })

    }

    handleSignOut(){
        console.log('signing out')
        this.setState({errorMessage:null})
        firebase.auth().signOut()
        .catch((err) => {
            console.log(err);
            this.setState({errorMessage: err.message})
        })
    }

    render() {
        return (
            <App howToSignOut={() => this.handleSignOut()} howToSignIn={(e,p) =>  this.handleSignIn(e,p)} howToSignUp={(e, p) =>  this.handleSignUp(e, p)}  currentUser={this.state.currentUser} userInfo={this.state.userInfo} signInErrorMessage={this.state.signInErrorMessage} signUpErrorMessage={this.state.signUpErrorMessage} />
        )
    }

}