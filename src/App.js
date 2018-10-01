import React, { Component } from 'react';
import SignUpForm from './SignUp';
import SettingsForm from './Settings'
import SignInForm from './SignIn'
import { BrowserRouter, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom'
import Weather from './Weather.js'
import News from './News'
import StockDashboard from './StockDashboard'
import Home from './Home'

export default class App extends Component {
  render() {

    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <h1 className="title"> Sunrise </h1>
            <nav>
              <ul className='nav'>
                <li>
                  <NavLink exact to='/' className="nav-link"> Home </NavLink>
                </li>
                <li>
                  <NavLink to='/SignUp' className="nav-link"> Sign Up </NavLink>
                </li>
                <li>
                  <NavLink to='/SignIn' className="nav-link"> Sign In </NavLink>
                </li>
                <li>
                  <NavLink to='/Settings' className="nav-link"> Settings </NavLink>
                </li>
                <li>
                  <NavLink to='/Weather' className="nav-link"> Weather </NavLink>
                </li>
                <li>
                  <NavLink to='/News' className="nav-link"> News </NavLink>
                </li>
                <li>
                  <NavLink to='/StockDashboard' className="nav-link"> Stock Dashboard </NavLink>
                </li>
                <li>
                  <button className="btn btn-primary mr-2" onClick={() => this.props.howToSignOut()}> Sign Out </button>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route exact path="/"  currentUser={this.props.currentUser} component={Home} />
              <Route path="/SignUp" render={(routerProps) => {
                return <SignUpForm {...routerProps} currentUser={this.props.currentUser} howToSignUp={this.props.howToSignUp} errorMessage={this.props.signUpErrorMessage} />
              }
              } />
              <Route path="/Settings" render={(routerProps) => {
                return <SettingsForm {...routerProps} currentUser={this.props.currentUser} />
              }
              } />
              <Route path="/SignIn" render={(routerProps) => {
                return <SignInForm {...routerProps} currentUser={this.props.currentUser} howToSignIn={this.props.howToSignIn} howToSignOut={this.props.howToSignOut} errorMessage={this.props.signInErrorMessage} />
              }
              } />
              <Route path="/Weather" render={(routerProps) => {
                return <Weather {...routerProps} currentUser={this.props.currentUser} primaryWeather={this.props.userInfo.primaryWeatherLocation} secondaryWeather={this.props.userInfo.secondaryWeatherLocation} thirdWeather={this.props.userInfo.thirdWeatherLocation} />
              }
              } />
              <Route path="/News" render={(routerProps) => {
                return <News {...routerProps} currentUser={this.props.currentUser} newsSources={this.props.userInfo.newsSites} />
              }
              } />
              <Route path="/StockDashboard" component={StockDashboard} />
            </Switch>

          </div>
        </BrowserRouter>
      </div>)
  }
}

