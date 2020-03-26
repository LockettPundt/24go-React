import React, { Component } from 'react';
import './App.css';
import Event from './components/Events'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: [],
    }
  }
  async componentDidMount() {
    const test = await this.fetchEvent("music");
    const data = test.events.event
    this.setState({
      testData: data,
    })
  }
  
  fetchEvent = async (eventType) => {
    const response = await fetch(`https://api.eventful.com/json/events/search?q=${eventType}&c=${eventType}&t=today&l=
    30305&within=25&sort_direction=descending&sort_order=popularity&page_size=20&app_key=QfJVpR8FLcNsHKLG`);
    const json = await response.json();
    // console.log(json);
    return json;
}
  
  
  
  
  
  
  render() {
    const { testData } = this.state;
    const events = testData.map(item => { return <Event event={item}/>})
    return (
      <div className="App">
        {events}
      </div>
    );
    
  }
}

export default App;
