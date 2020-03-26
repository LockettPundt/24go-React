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
    const showEvent = <p>{event.title}</p>
    return (
      <div>
        {showEvent}
      </div>
    );
  }
  
}


export default Event;