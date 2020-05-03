import React, { Component } from 'react';

export default class Record extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }

    render() {

        let { patientData } = this.props;
        let { data } = this.state;

        if (patientData && patientData.records[0]) {

            patientData.records[0].get().then(doc => {
                this.setState({
                    data: doc.data()
                })
            })

            if (data) {
                return (
                    <div style={{ width: '80vw', display: 'flex', flexDirection: 'column' }}>
                        <p style={{ fontSize: '10px', borderRadius: '50px', width: '45px', paddingLeft: '5px', marginBottom: '2px', border: '2px solid grey', color: 'grey' }}>Patient</p>
                        <h1>{`${patientData.name} - ID ${patientData.id}`}</h1>
                        <div style={{ border: 'solid', borderColor: '#D64952', borderLeft: '0', borderRight: '0', borderBottom: '0', paddingTop: '20px' }}>
                            <h3>Date of Consultation</h3>
                            <p>{data.consultDate}</p>
                            <h3>Name of Doctor</h3>
                            <p>{data.docName}</p>
                            <h3>Referred by</h3>
                            <p>{data.referredBy}</p>
                            <h3>Details</h3>
                            <p>{data.details}</p>
                            <h3>Address</h3>
                            <p>{data.address}</p>
                            <h3>City</h3>
                            <p>{data.city}</p>
                            <h3>State/Province</h3>
                            <p>{data.state}</p>
                            <h3>ZIP Code</h3>
                            <p>{data.zip}</p>
                            <h3>Phone</h3>
                            <p>{data.mobile}</p>
                            <h3>Email</h3>
                            <a href={`mailto:${data.email}`}>{data.email}</a>
                            <h3>Notes & Comments</h3>
                            <p>{data.notes}</p>
                            <h2>Insurance Details</h2>
                            <h3>Insurer Name</h3>
                            <p>{data.insurance.name}</p>
                            <h3>Relationship</h3>
                            <p>{data.insurance.relationship}</p>
                            <h3>Employer</h3>
                            <p>{data.insurance.employer}</p>
                            <h3>Address</h3>
                            <p>{data.insurance.address}</p>
                            <h3>City</h3>
                            <p>{data.insurance.city}</p>
                            <h3>State/Province</h3>
                            <p>{data.insurance.state}</p>
                            <h3>Zip Code</h3>
                            <p>{data.insurance.zip}</p>
                            <h3>Date of Birth</h3>
                            <p>{data.insurance.dob}</p>
                            <h3>Insured Since</h3>
                            <p>{data.insurance.since}</p>
                            <h3>Phone</h3>
                            <p>{data.insurance.phone}</p>
                            <h3>Supervisor</h3>
                            <p>{data.insurance.supervisor}</p>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div style={{ width: '80vw', display: 'flex', flexDirection: 'column' }}>
                        <p style={{ fontSize: '10px', borderRadius: '50px', width: '45px', paddingLeft: '5px', marginBottom: '2px', border: '2px solid grey', color: 'grey' }}>Patient</p>
                        <h1>{`${patientData.name} - ID ${patientData.id}`}</h1>
                    </div>
                );
            }
        } else {
            return (
                <div style={{ width: '80vw', display: 'flex', flexDirection: 'column' }}>
                    <h1>{'No patients found.'}</h1>
                </div>
            );
        }

    }
}