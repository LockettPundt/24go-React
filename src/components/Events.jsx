import React, { Component } from 'react';


class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  };
  
  
  
  
  render() {
    const { event } = this.props;
    console.log(event)
  const showEvent = <a href="#"><li>{event.title}</li></a>
    return (
      <div>
        {showEvent}
      </div>
    );
  }
  
}


export default Event;