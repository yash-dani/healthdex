import React, { Component } from 'react';
import './App.css';
import { ReactComponent as Logo } from './assets/medical.svg'

// Colors: Ivory White: FFFFF0, English Vermillion D64952, Neutral White: FFFFFF

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searched: false,
      resultsPending: false
    }
  }

  async search() {
    this.setState({
      resultsPending: true
    });
  }

  render() {
    return (
      <div className='AppContainer'>
        <Logo className='Logo' />
        <div className='DocumentContainer'>
          <input className='MainSearch' placeholder='Search for a patient...' onKeyPress={event => {
            if (event.key === 'enter') {
              this.search();
            }
          }} />
        </div>
      </div>
    );
  }
}
