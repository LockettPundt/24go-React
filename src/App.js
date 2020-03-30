/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './App.css';
import Event from './components/Events';
import "../node_modules/bulma/css/bulma.css";
import {Dropdown, DropdownMenu, DropdownDivider, DropdownContent, DropdownTrigger, Button, Icon, Section} from "bloomer";
import { Container } from 'bloomer/lib/layout/Container';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicData: [],
      comedyData: [],
      display: '',
      city: '',
      condition: '',
      temp: 0,
      wind: 0,
      humidity: 0,
      weatherData: '',
    }
  }
  
  async componentDidMount() {
    const weatherFetch = await this.fetchWeather(10001);
    const weatherData = weatherFetch;
    console.log(weatherData);
    const musicFetch = await this.fetchEvent("music");
    const musicData = musicFetch.events.event
    
    const comedyFetch = await this.fetchEvent("comedy");
    const comedyData = comedyFetch.events.event;
    
    const sportsFetch = await this.fetchEvent("sports");
    const sportsData = sportsFetch.events.event;
    
    const filmFetch = await this.fetchEvent("film");
    const filmData = filmFetch.events.event;
    
    
    this.setState({
      comedyData: comedyData,
      musicData: musicData,
      sportsData: sportsData,
      filmData: filmData,
      weatherData: weatherData,
    })
  }
  
  fetchEvent = async (eventType) => {
    const response = await fetch(`https://api.eventful.com/json/events/search?q=${eventType}&c=${eventType}&t=today&l=
    10001&within=25&sort_direction=descending&sort_order=popularity&page_size=20&app_key=QfJVpR8FLcNsHKLG`);
    const json = await response.json();
    return json;
  }
  
  fetchWeather = async (userLocation) => {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=95929b78acb549bd9bc151519201302&q=${userLocation}`);
    const json = await response.json();
    return json;
  }
  
  displayInfo = (eventType) => {
    // console.log("this is being clicked and here are the events...:", eventType);
    this.setState({
      display: eventType,
    })
  }

  render() {
    const { musicData, comedyData, display, sportsData, filmData, weatherData} = this.state;
    const comedyEvents = !!comedyData ? comedyData.map((item, index) => { return <Event key={index} event={item}/>}) : <p>Sorry. We can't find any Comedy Events in your area today.</p>;
    const musicEvents = !!musicData ? musicData.map((item, index) => { return <Event key={index} event={item}/>}) : <p>Sorry. We can't find any Music Events in your area today.</p>;
    const sportsEvents = !!sportsData ? sportsData.map((item, index) => { return <Event key={index} event={item}/>}) : <p>Sorry. We can't find any Sporting Events in your area today.</p>;
    const filmEvents = !!filmData ? filmData.map((item, index) => { return <Event key={index} event={item} />}) : <p>Sorry. We can't find any Film Events in your area today.</p>
    const weatherDisplay = !!weatherData ? 
    <Section className="weatherBox">
      <img src={weatherData.current.condition.icon} alt="weather condition"/>
      <p>{weatherData.location.name}, {weatherData.location.region}</p>
      <p>Currently: {weatherData.current.condition.text}</p>
      <p>Temperature: {weatherData.current.temp_f}°F</p>
      <p>Wind: {weatherData.current.wind_mph} MPH</p>
      <p>Humidity: {weatherData.current.humidity}%</p>
    </Section>
    : 
    <Section className="weatherBox">
      <p>Fetching local weather...</p>
    </Section>;
    
    return (
      <div className="App">
        <Section className="resultsSection">
          <Section classname="weatherBox">
            <div className="weatherContainer">
              {weatherDisplay}
            </div>
          </Section>
          <Section className="events">
            <Section className="eventMenu">
              <h1>Events</h1>
              <a href="#" onClick={this.displayInfo.bind(this, musicEvents)}>Music</a>
              <a href="#" onClick={this.displayInfo.bind(this, comedyEvents)}>Comedy</a>
              <a href="#" onClick={this.displayInfo.bind(this, sportsEvents)}>Sports</a>
              <a href="#" onClick={this.displayInfo.bind(this, filmEvents)}>Film</a>
            </Section>
            <Section className="eventDisplay">
              {display}
            </Section>
          </Section>
        </Section>
      </div>
    );
    
  }
}

export default App;
