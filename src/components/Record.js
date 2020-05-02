import React, { Component } from 'react';

export default class Record extends Component {
    render() {

        let { data } = this.props;

        return (
            <div style={{ width: '80vw' }}>
                {data ? <p>{`Patient found: ${data.name}.`}</p> : <p>No patient found.</p>}
            </div>
        );
    }
}