import React, { Component } from 'react';
import './App.css';
import { ReactComponent as Logo } from './assets/medical.svg'
import { Puff } from 'svg-loaders-react';
import { PatientRecord } from './components';

// Colors: Ivory White: FFFFF0, English Vermillion D64952, Neutral White: FFFFFF

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searched: false,
      resultsPending: false,
      data: {}
    }
  }

  async search() {
    this.setState({
      resultsPending: true
    });

    setTimeout(() => { //TEST CODE HERE
      this.setState({
        resultsPending: false,
        searched: true
      });
    }, 3000); //TEST CODE ENDS
  }

  render() {

    let { searched, resultsPending, data } = this.state;

    let searchClass = searched ? 'MainSearch Moved' : resultsPending ? 'MainSearch Moved' : 'MainSearch';

    return (
      <div className='AppContainer'>
        <Logo className='Logo' />
        <div className='DocumentContainer'>
          <input className={searchClass} placeholder='Search for a patient (ID No. or name)...' onKeyPress={event => {
            if (event.key === 'Enter') {
              this.search(); //Will have to put patient
            }
          }} />
          <div className='Conditional'>
            {resultsPending ? <Puff className='Spinner' stroke='#D64952' /> : null}
            {searched && !resultsPending ? <PatientRecord data={data} /> : null}
          </div>
        </div>
      </div>
    );
  }
}
