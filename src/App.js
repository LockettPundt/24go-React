/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './App.css';
import Event from './components/Events'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicData: [],
      comedyData: [],
    }
  }
  
  async componentDidMount() {
    const musicFetch = await this.fetchEvent("music");
    const musicData = musicFetch.events.event
    
    const comedyFetch = await this.fetchEvent("comedy");
    const comedyData = comedyFetch.events.event
    this.setState({
      comedyData: comedyData || ['Sorry. There are no Comedy Events in your area.'],
      musicData: musicData || ['Sorry. There are no Music Events in your area.'],
    })
  }
  
  fetchEvent = async (eventType) => {
    const response = await fetch(`https://api.eventful.com/json/events/search?q=${eventType}&c=${eventType}&t=today&l=
    10001&within=25&sort_direction=descending&sort_order=popularity&page_size=20&app_key=QfJVpR8FLcNsHKLG`);
    const json = await response.json();
    return json;
}
  
  
  
  
  
  
  render() {
    const { musicData, comedyData } = this.state;
    const comedyEvents = !!comedyData ? comedyData.map((item, index) => { return <Event key={index} event={item}/>}) : <p>Sorry. There are no Comedy Events in your area.</p>;
    const musicEvents = musicData.map((item, index) => { return <Event key={index} event={item}/>});
    return (
      <div classNameName="App">
        <section className="results" id="dropdownContainer">

        <ul className="vertical menu dropDownMenuTitle" data-accordion-menu
          data-multi-open="false">
          <li>
            <a href="#" className="mainDropdownTitle">Local Events</a>
            <ul className="menu vertical nested">
              <li>
                <a href="#" id="music" className="dropDownMenuTitle">Music</a>
                <ul className="menu vertical nested" id="musicList">
                  {musicEvents}
                </ul>
              </li>
              <li>
                <a href="#" id="comedy" className="dropDownMenuTitle">Comedy</a>
                <ul className="menu vertical nested" id="comedyList">
                  {comedyEvents}
                </ul>
              </li>
              <li>
                <a href="#" id="sports" className="dropDownMenuTitle">Sports</a>
                <ul className="menu vertical nested" id="sportsList">

                </ul>
              </li>
              <li>
                <a href="#" id="film" className="dropDownMenuTitle">Film</a>
                <ul className="menu vertical nested" id="filmList">

                </ul>
              </li>
              <li>
                <a href="#" id="culture" className="dropDownMenuTitle">Culture</a>
                <ul className="menu vertical nested" id="cultureList">
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        </section>
      </div>
    );
    
  }
}

export default App;
