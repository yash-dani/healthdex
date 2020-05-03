import React, { Component } from 'react';
import '../style/dashboard.css';
import { Puff } from 'svg-loaders-react';
import firebase, { PatientRecord, UploadPanel } from '../components';
import 'firebase/firestore';
import { Link } from 'react-router-dom';

// Colors: Ivory White: FFFFF0, English Vermillion D64952, Neutral White: FFFFFF

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searched: false,
            resultsPending: false,
            data: null,
            uploading: false
        }
    }

    search(input) {

        this.setState({
            resultsPending: true
        });

        console.log(`Searching for: ${input}`);

        var query;
        const db = firebase.firestore();
        const patientsRef = db.collection('patients');

        if (isNaN(input)) {
            query = patientsRef.where('name', '==', input);
        } else {
            query = patientsRef.where('id', '==', parseInt(input));
        }

        query.get().then(querySnap => {
            if (!querySnap.empty) {
                this.setState({
                    data: querySnap.docs[0].data()
                })
            } else {
                this.setState({
                    data: null
                });
            }
            this.setState({
                searched: true,
                resultsPending: false
            })
        });
    }

    render() {
        let { searched, resultsPending, data, uploading } = this.state;
        return (
            <div className='AppContainer'>
                <Link to='/'> <div className='Logo'><p id="logo">Healthdex<span id="highlight">.</span></p></div></Link>
                <button className={uploading ? 'UploadSwitch On' : 'UploadSwitch Off'} onClick={() => this.setState({ uploading: !uploading, searched: false })}>{uploading ? 'Patient Lookup' : 'Upload Records'}</button>
                {uploading ?
                    <div className={'UploadContainer'}>
                        <UploadPanel />
                    </div>
                    :
                    <div className='DocumentContainer'>
                        <input className={searched ? 'MainSearch Moved' : resultsPending ? 'MainSearch Moved' : 'MainSearch'} placeholder='Search for a patient (ID No. or name)...' onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.search(event.target.value);
                            }
                        }} />
                        <div className='Conditional'>
                            {resultsPending ? <Puff className='Spinner' stroke='#D64952' /> : null}
                            {searched && !resultsPending ? <PatientRecord data={data} /> : null}
                        </div>
                    </div>
                }

            </div>
        );
    }
}