/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Container} from 'bloomer';
import { DropdownItem } from 'bloomer/lib/components/Dropdown/Menu/DropdownItem';

const Event = props => {
    const { event } = props;
    // console.log(event)
    return (
     <Container class="singleEvent">
      <a href={event.url} target="_blank" rel="noopener noreferrer">
        {event.title}
      </a>
     </Container>
    );
  }
  


export default Event;