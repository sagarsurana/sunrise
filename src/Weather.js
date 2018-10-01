import React, { Component } from 'react';
import './css/Weather.css';
import 'whatwg-fetch';
import {
  Button, Card, Row, Col, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import codesFile from './countrycodes.json';

const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const ULR2 = "&appid=142b0b25be4201d070b187e4b67d1df4&units=imperial";

class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      primaryCity: "",
      primaryCountryName: " ",
      otherLoc: []
    };
  }

  componentDidMount() {
    console.log(this.props.primaryWeather + " ");
    let prim = (this.props.primaryWeather).split(", ");
    this.reStructure(this.props.secondaryWeather, this.props.thirdWeather);
    this.downloadData(prim[0], prim[1])
  }

  reStructure(second, third) {
    let others = [];
    if (second !== undefined && second !== "undefined, undefined") {
      others.push(second);
    }
    if (third !== undefined && third !== "undefined, undefined") {
      others.push(third);
    }
    this.setState({
      otherLoc: others
    })
    console.log(others);
  }

  downloadData(cityName, countryName) {
    console.log(countryName);
    this.setState({
      primaryCity: cityName,
      primaryCountryName: countryName
    })
    let temp = this;
    let code = this.fetchCountryCode(countryName);
    let currURL = URL + "" + cityName + "," + code.toLowerCase() + ULR2;
    fetch(currURL).then(function (el) {
      let temp = el.json();
      return temp;
    }).then(function (element) {
      temp.setState({
        weather: element
      })
    }).catch((error) => {
      console.log(error.message);
    })
  }

  render() {
    if (this.state.weather !== "") {
      return (
        <div>
          <MainWeather humtemp={this.state.weather.main} sun={this.state.weather.sys} main={this.state.weather.weather} wind={this.state.weather.wind} city={this.state.primaryCity} country={this.state.primaryCountryName} />
          <OtherWeather loc={this.state.otherLoc} handleClick={(k, ct, co) => this.handleClick(k, ct, co)}/>
        </div >
      );
    } else {
      return (
        <div>
        </div>
      )
    }
  }

  fetchCountryCode(country) {
    return codesFile[country].iso;
  }

  handleClick(key, city, country) {
    console.log(country);
    let second = this.state.primaryCity + ", " + this.state.primaryCountryName;
    let third = this.state.otherLoc[0];
    if (key === 1) {
      third = this.state.otherLoc[1];
    }
    this.setState({
      primaryCity: city,
      primaryCountryName: country
    })
    this.reStructure(second, third);
    console.log(country);
    this.downloadData(city, country);
  }
}

class MainWeather extends Component {
  render() {
    let icon = "";
    let mainWeather = this.props.main[0].main;
    if (mainWeather === "Clear") {
      icon = "https://images.vexels.com/media/users/3/134787/isolated/preview/985cb8e7ee68e1bf319d875384c39bbc-smile-emoji-emoticon-by-vexels.png";
    } else if (mainWeather === "Mist") {
      icon = "http://www.transparentpng.com/download/mist/vista-weather-icons-png-16.png";
    } else if (mainWeather === "Rain") {
      icon = "http://www.transparentpng.com/download/weather-report/cloud-rain-water-lightning-nature-images-19.png";
    } else if (mainWeather === "Haze" || mainWeather === "Smoke") {
      icon = "http://moziru.com/images/mist-clipart-smoke-cloud-13.png";
    } else if (mainWeather === "Clouds") {
      icon = "http://4.bp.blogspot.com/-eW0LVSPNqGI/VeyblDyDlFI/AAAAAAAAAAg/hL_e7k1EfHQ/s1600/cloud.png";
    } else if (mainWeather === "Sunny") {
      icon = "https://cdn.pixabay.com/photo/2012/04/10/16/49/sun-26344_1280.png";
    }
    return (
      <div className="mainweather">
        <Card body inverse style={{ backgroundColor: "#00000020", borderWidth: "0" }}>
          <CardBody>
            <Row>
              <Col xs="9">
                <CardTitle>{mainWeather}</CardTitle>
                <CardText className="temp">{this.props.humtemp.temp} º</CardText>
                <CardSubtitle>{this.props.city}, {this.props.country}</CardSubtitle>
              </Col>
              <Col xs="3">
                <CardImg top src={icon}>
                </CardImg>
              </Col>
            </Row>
          </CardBody>
          <CardBody>
            <HumTempWinDetails humtemp={this.props.humtemp} wind={this.props.wind} />
            <SunDetails sun={this.props.sun} />
          </CardBody>
        </Card>
      </div>
    )
  }
}

class SunDetails extends Component {
  render() {
    let sunrise = this.getTime(this.props.sun.sunrise);
    let sunset = this.getTime(this.props.sun.sunset);
    console.log(this.props.sun)
    return (
      <Row>
        <Col xs="6">
          <CardText>Sunrise: {sunrise}</CardText>
        </Col>
        <Col xs="6">
          <CardText>Sunset: {sunset}</CardText>
        </Col>
      </Row>
    )
  }

  getTime(given) {
    var date = new Date(given * 1000);
    let ap = "pm";
    let time = date.getHours();
    if (time < 12) {
      ap = "am";
    } else {
      time = time - 12;
    }
    let formattedTime = time + ':' + ("0" + date.getMinutes()).substr(-2) + ap;
    return formattedTime;
  }
}

class HumTempWinDetails extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="6">
            <CardText>High: {this.props.humtemp["temp_max"]}ºF</CardText>
          </Col>
          <Col xs="6">
            <CardText>Low: {this.props.humtemp["temp_min"]}ºF</CardText>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <CardText>Humidity: {this.props.humtemp.humidity}%</CardText>
          </Col>
          <Col xs="6">
            <CardText>Wind Speed: {this.props.wind.speed}mps</CardText>
          </Col>
        </Row>
      </div>
    )
  }
}

class OtherWeather extends Component {
  render() {
    console.log(this.props.loc);
    let count = 0;
    let weatherItems = this.props.loc.map((element) => {
      let value = element.split(", ");
      count = count + 1;
      return (
        <OtherWeatherItems city={value[0]} country={value[1]} key={count} handleClick={this.props.handleClick} id={count}/>
      )
    })
    return (
      <div className="otherweather">
        <Row>
          {weatherItems}
        </Row>
      </div>
    )
  }
}

class OtherWeatherItems extends Component {
  render() {
    return (
      <div className="otherweatheritem">
        <Col>
          <Card body inverse style={{ backgroundColor: "#00000020", borderWidth: "0" }}>
            <CardTitle>{this.props.city}</CardTitle>
            <CardText className="othercountry">{this.props.country}</CardText>
            <Button onClick={() => {this.handleClickFunction()}} >Check Weather</Button>
          </Card>
        </Col>
      </div>
    )
  }

  handleClickFunction() {
    console.log(this.props.id, this.props.city, this.props.country);
    this.props.handleClick(this.props.id, this.props.city, this.props.country)
  }

  

}

export default Weather;
