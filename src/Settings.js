import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

export default class SettingsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newUsername: '',
            primaryWeatherLocation: '',
            secondaryWeatherLocation: '',
            thirdWeatherLocation: '',
            newsSites: []
        }
    }


    handleSubmit() {

        console.log(this.state.newUsername);
        console.log(this.state.primaryWeatherLocation);
        console.log(this.state.secondaryWeatherLocation);
        console.log(this.state.newsSites);


        let currentUser = this.props.currentUser;
        console.log(currentUser)

        if(this.state.newUsername){
            currentUser.updateProfile({displayName: this.state.username})
        }

        
        let userPrefRef = firebase.database().ref('UserPrefs').child(currentUser.uid)

        userPrefRef.update({
            username: this.state.newUsername,
            primaryWeatherLocation: this.state.primaryWeatherLocation,
            secondaryWeatherLocation: this.state.secondaryWeatherLocation,
            thirdWeatherLocation: this.state.thirdWeatherLocation,
            newsSites: this.state.newsSites
        })
    }


    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;

        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    newsSourcesChanged(newValues){

        console.log(newValues)
        this.setState({newsSites: newValues})
    }

    render() {

        return (
            <div className="container">
                <h1> Settings </h1>

                <div className='form-group'>
                    <h2> User Settings </h2>
                    <label>Change Username: </label>
                    <input className="form-control" name="newUsername" type="text" value={this.state.newUsername} onChange={(event) => { this.handleChange(event) }} />
                </div>

                <div className='form-group'>
                    <h2> Weather Settings </h2>
                    <div><small>Format location using city name and full country name. (Example: Seattle, United States) </small></div>
                    <label>Set Primary Weather Location:</label>
                    <input className="form-control" name="primaryWeatherLocation" value={this.state.primaryWeatherLocation} onChange={(event) => { this.handleChange(event) }} />
                </div>

                <div className='form-group'>
                    <label>Set Secondary Weather Location (optional):</label>
                    <input className="form-control" name="secondaryWeatherLocation" value={this.state.secondaryWeatherLocation} onChange={(event) => { this.handleChange(event) }} />
                </div>

                <div className='form-group'>
                    <label>Set Third Weather Location (optional):</label>
                    <input className="form-control" name="thirdWeatherLocation" value={this.state.thirdWeatherLocation} onChange={(event) => { this.handleChange(event) }} />
                </div>


                <div className='form-group'>
                    <h2>News Sources</h2>
                    <h3>Select Preferred News Sources (minimum 2, maximum 5):</h3>

                    <CheckboxGroup name="newSources" onChange={(event) => { this.newsSourcesChanged(event) }}>

                                
                                <Checkbox value="the-new-york-times"/>
                                <label>The New York Times </label>

                                <Checkbox value="the-washington-post"/>
                                <label>The Washington Post </label>

                                <Checkbox value="the-verge"/>
                                <label>The Verge</label>

                                <Checkbox value="wired"/>
                                <label>Wired </label>

                                <Checkbox value="vice-news"/>
                                <label>Vice News </label>

                                <Checkbox value="reuters"/>
                                <label>Reuters </label>

                                <Checkbox value="al-jazeera-english"/>
                                <label>Al Jazeera</label>

                                <Checkbox value="the-hindu"/>
                                <label>The Hindu </label>

                                <Checkbox value="nfl-news"/>
                                <label>NFL News </label>

                                <Checkbox value="ars-technica"/>
                                <label>Ars Technica</label>
                    </CheckboxGroup>
                </div>

                <div className='form-group mb-5'>
                    <button className="btn btn-primary mr-2" onClick={() => this.handleSubmit()}> Submit Changes </button>
                </div>
            </div>

        )
    }
}


