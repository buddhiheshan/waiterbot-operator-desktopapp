import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getRobots } from '../redux/actions/robotActions';

import Loading from '../component/loading/LoadingComponent';

import { Media, } from 'reactstrap';


function RenderRobots({ robots }) {
    console.log(robots)
    return (
        <Media list className=" p-0 ">
            {
                robots.map((robot, i) => {
                    return (
                        <Media tag="li" key={i} className="Robot-media">
                            <Media body>
                                <Media heading>
                                    Nickname: {robot.nickname}<br />
                                </Media>
                                Status: {robot.status}<br />
                                ID: {robot._id}
                            </Media>

                        </Media>
                    )
                })
            }
        </Media>
    );
};

class RobotPanel extends Component {

    componentDidMount() {
        console.log(this.props.property.id);
        this.props.dispatchGetRobots(this.props.property.id)
    }
    render() {
        if (this.props.robots.isLoading) {
            return (
                <div className='col-md-4 Robot-panel'>
                    <Loading />
                </div>
            )
        }
        else {
            return (
                <div className='col-md-4 Robot-panel'>
                    <div className="container-fluid">
                        <div className="row">
                            <h2>Robots</h2>
                        </div>
                        {/* <div className=""> */}
                        <RenderRobots robots={this.props.robots.robots} />
                        {/* </div> */}
                    </div>
                </div>
            )
        }

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

