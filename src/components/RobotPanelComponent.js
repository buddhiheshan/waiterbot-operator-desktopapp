import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getRobots } from '../redux/actions/robotActions';

import Loading from './LoadingComponent';

import { Media, Container, Jumbotron, ListGroup } from 'react-bootstrap';


function RenderRobots({ robots }) {

    return (
        <ListGroup>
            {
                robots.map((robot, i) => {
                    return (
                        <ListGroup.Item key={i} className="Robot-media">
                            <Media >
                                <Media.Body>
                                    <h5>Nickname: {robot.nickname}</h5>
                                    <ListGroup>
                                        <ListGroup.Item className="RobotDetail">Status: {robot.status}</ListGroup.Item>
                                        <ListGroup.Item className="RobotDetail">ID: {robot._id}</ListGroup.Item>
                                    </ListGroup>
                                </Media.Body>
                            </Media>
                        </ListGroup.Item>
                    )
                })
            }
        </ListGroup>
    );
};

class RobotPanel extends Component {

    componentDidMount() {

        this.props.dispatchGetRobots(this.props.property.id)
    }
    render() {
        return (
            <React.Fragment>
                <Jumbotron fluid className="Jumbotron-RobotPanel">WaiterBots</Jumbotron>
                {this.props.robots.isLoading ? <Loading /> :
                    <Container>
                        <RenderRobots robots={this.props.robots.robots} />
                    </Container>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        property: state.property,
        robots: state.robots
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetRobots: (propertyID) => dispatch(getRobots(propertyID))
});

export default connect(mapStateToProps, mapDispatchToProps)(RobotPanel);

