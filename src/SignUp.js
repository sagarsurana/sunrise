import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router-dom'
import App from './App'

 
export default class SignUpForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        };
    }


    handleChange(event){
        let field = event.target.name;
        let value = event.target.value;

        let changes = {};
        changes[field] = value;
        this.setState(changes); 
    }

    render(){

        let userMessage = null;
        if(this.props.currentUser) {
          userMessage = <div className="alert alert-success"><h3>Currently logged in as {this.props.currentUser.email}</h3><small>Go to Settings to modify your account preferences</small></div>;
        }



        return(

        <div className="container">
            <h1> Sign Up </h1>

            <div>{userMessage}</div>

            {this.props.errorMessage && 
                <p className="alert alert-danger"> {this.props.errorMessage}</p>}

            
            <div className='form-group'>
                <label>Enter Email Address: </label>
                <input className="form-control" name="email" type= "text" value={this.state.email} onChange={(event) => {this.handleChange(event)}}/>
            </div>

            <div className='form-group'>
                <label>Enter Password:</label>
                <input type="password" className="form-control" name="password" value={this.state.password} onChange={(event) => {this.handleChange(event)}}/>
                
                
            </div>

            <div className='form-group mb-5'>
                <button className="btn btn-primary mr-2" onClick={() => this.props.howToSignUp(this.state.email, this.state.password)}> Create Account </button> 
            </div>
        </div>
         
        );
    }
}


