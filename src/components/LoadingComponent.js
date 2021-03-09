import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';


class Loading extends Component {
    render() {
        return (
            <Spinner animation="border" role="status" variant="dark" className="Spinner"></Spinner>
        )
    }
}

export default Loading;
