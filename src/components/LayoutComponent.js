import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { toastr } from 'react-redux-toastr';
import { Col, Container, Row } from 'react-bootstrap';


import Menu from './MenuComponent';
import Orders from './OrdersComponent';
import ItemDetails from './ItemDetailsComponent';
import NavBar from './NavBarComponent';
import RobotPanel from './RobotPanelComponent';
import Loading from './LoadingComponent';

import { getPropertyInfo } from '../redux/actions/propertyActions';
import { pushOrder } from '../redux/actions/orderActions';

const io = require("socket.io-client");
const connectionUrl = "ws://waiterbot-api.herokuapp.com";

class Layout extends Component {

    constructor(props) {
        super(props)

        this.props.dispatchGetPropertyInfo();
    }

    componentDidMount() {
        const socket = io(connectionUrl, {
            // autoConnect : false,
            transports: ["polling"],
            query: {
                token: localStorage.getItem('token')
            },
        });

        socket.on("connect", msg => {
            console.log("successfully connected to ws!");
        });

        socket.on('join', function (data) { console.log(data); });
        socket.on('error', function (data) { console.log(data); });

        socket.on("private", (data) => {
            console.log("[PRIVATE]  :", data);
        });

        socket.on("newOrder", (data) => {
            this.props.dispatchPushOrder(data);
            toastr.info("New Order Recieved");
            console.log("[NEW ORDER ]  :", data);
        });

        socket.on("orderStateChange", (data) => {
            console.log("[ORDER STATE CHANGE ]  :", data);
        });
    }

    render() {

        if (this.props.property.isLoading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <Container fluid className="Layout blur">
                    <Row className="m-0">
                        <Col className="col-md-1 Navbar">
                            <NavBar />
                        </Col>
                        <Col className="col-8 Main-panel">
                            <Switch>
                                <Route exact path="/orders"><Orders /></Route>
                                <Route exact path="/menu"><Menu /></Route>
                                <Route exact path="/menu/:itemID"><ItemDetails /></Route>
                                <Redirect to='/orders' />
                            </Switch>
                        </Col>
                        <Col className=" Robot-panel">
                            <RobotPanel />
                        </Col>
                    </Row >
                </Container>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        property: state.property
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetPropertyInfo: () => dispatch(getPropertyInfo()),
    dispatchPushOrder: (data) => dispatch(pushOrder(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
