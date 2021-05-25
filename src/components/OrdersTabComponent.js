import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Card, Tabs, Tab, Button, ListGroup, Media, Image, Row, Col } from 'react-bootstrap';

import { editOrderStatus, setRobotToOrder } from '../redux/actions/orderActions'
import { getTables } from '../redux/actions/tableActions';
import { toastr } from 'react-redux-toastr';
import { editRobotStatus } from '../redux/actions/robotActions';



class RenderOrders extends Component {


    searchForRobot() {
        const robots = this.props.props.robots.robots.filter(robot => robot.status === 'Idle')
        return robots.length !== 0 ? robots[0]._id : null;
    }

    handleClick(orderID, nextStatus) {
        if (nextStatus === "Accept") {
            this.props.props.dispatchEditOrderStatus(orderID, "Preparing")
        }
        if (nextStatus === "Deploy Robot") {
            const pendingOrders = this.props.props.orders.orders.preparing.orders;
            const order = pendingOrders.find(order => order._id === orderID);
            if (!order) console.log(("Something went wrong with orders"));
            let robotID;

            console.log(order);
            if (order.robot === null) {
                robotID = this.searchForRobot()
                if (!robotID) {
                    toastr.warning('No robots available right now');
                    console.log("No robots available");
                    return;
                }
                this.props.props.dispatchSetRobotToOrder(order._id, robotID);
                this.props.props.dispatchEditRobotStatus(robotID, "Assigned");
                toastr.success('Robot Assigned');
            }
            else {
                robotID = order.robot
            }
            console.log("order", order);
            const tableID = order.table._id;
            console.log("tableid in order", tableID);
            const tables = this.props.props.tables.tables
            console.log("all tables", tables);
            const tableCount = tables.length;
            const table = tables.find(table => table._id === tableID);
            if (!table) console.log(("Something went wrong with table"));
            const payload = `deliver ${table.junction} ${tableCount} ${table.turn_direction}`;

            this.props.props.mqtt.client.publish(`waiterbot/${robotID}`, payload);
        }
    }

    render() {
        return (
            <Accordion defaultActiveKey={1}>
                {
                    this.props.orders.map((order, i) => {
                        return (
                            <Card key={i + 1} className="OrderItem">
                                <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                                    Order ID: {order._id}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={i + 1}>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={7}>
                                                <RenderOrderItems orderedItems={order.items} items={this.props.props.items.items} />
                                            </Col>
                                            <Col>
                                                <ul>
                                                    <li>Status: {order.status}</li>
                                                    <li>Table: {order.table.table_number}</li>
                                                    <li>Amount: {order.amount}</li>
                                                </ul>
                                                {this.props.nextState ? <Button onClick={() => this.handleClick(order._id, this.props.nextState)}>{this.props.nextState}</Button> : null}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })
                }
            </Accordion>
        )
    }
}

class RenderOrderItems extends Component {

    render() {
        let filtered = [];
        this.props.orderedItems.forEach((ordered) => {
            const toBeAdded = this.props.items.filter((item) => {
                return (item._id === ordered.item)
            })
            filtered = [...filtered, ...toBeAdded];
        });
        return (
            <ListGroup>
                {
                    filtered.map((order, i) => {
                        return (
                            <ListGroup.Item key={i}>
                                <Media>
                                    <Image
                                        rounded
                                        width={64}
                                        height={64}
                                        className="mr-3"
                                        src={order.imgUrl} alt="item"
                                    />
                                    <Media.Body>
                                        <h5>{order.name}</h5>
                                    </Media.Body>
                                </Media>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        );
    }
}

class OrdersTab extends Component {
    constructor(props) {
        super(props);
        this.props.dispatchGetTables(this.props.property.id);
    }


    render() {
        return (
            <Tabs defaultActiveKey="Pending" className="OrdersTab" >
                <Tab eventKey="Pending" title="Pending">
                    <RenderOrders orders={this.props.orders.orders.pending.orders} nextState="Accept" props={this.props} />
                </Tab>
                <Tab eventKey="Preparing" title="Preparing">
                    <RenderOrders orders={this.props.orders.orders.preparing.orders} nextState="Deploy Robot" props={this.props} />
                </Tab>
                <Tab eventKey="Delivering" title="Delivering">
                    <RenderOrders orders={this.props.orders.orders.delivering.orders} props={this.props} />
                </Tab>
                <Tab eventKey="Delivered" title="Delivered">
                    <RenderOrders orders={this.props.orders.orders.delivered.orders} props={this.props} />
                </Tab>
                <Tab eventKey="Cancelled" title="Cancelled">
                    <RenderOrders orders={this.props.orders.orders.cancelled.orders} props={this.props} />
                </Tab>
            </Tabs>
        )

    }
}

const mapStateToProps = state => {
    return {
        property: state.property,
        orders: state.orders,
        items: state.items,
        mqtt: state.mqtt,
        robots: state.robots,
        tables: state.tables
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchEditOrderStatus: (orderID, nextStatus) => dispatch(editOrderStatus(orderID, nextStatus)),
    dispatchGetTables: (propertyID) => dispatch(getTables(propertyID)),
    dispatchSetRobotToOrder: (orderID, robotID) => dispatch(setRobotToOrder(orderID, robotID)),
    dispatchEditRobotStatus: (robotID, newStatus) => dispatch(editRobotStatus(robotID, newStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab);
