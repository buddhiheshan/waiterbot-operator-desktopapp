import React, { Component } from 'react';
import { Spinner } from 'reactstrap';


class Loading extends Component {
    render() {
        return (
            <div className="Spinner-fade">
                <Spinner className="Spinner" size="lg" color="warning" />
            </div>
        )
    }
}

export default Loading;
