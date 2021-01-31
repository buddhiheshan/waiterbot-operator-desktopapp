import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getOrders } from '../redux/actions/orderActions';
import { getItems } from '../redux/actions/itemActions';

import Loading from '../component/loading/LoadingComponent';

import { Jumbotron } from 'react-bootstrap';
// import OrdersTab from '../component/OrdersTabComponent';

import OrdersTab from '../component/OrdersTabComponents1';

class Menu extends Component {

    componentDidMount() {
        console.log(this.props.property.id);
        this.props.dispatchGetItems(this.props.property.id)
        this.props.dispatchGetOrders(this.props.property.id, "Pending", "SET_PENDING_ORDERS")
        this.props.dispatchGetOrders(this.props.property.id, "Preparing", "SET_PREPARING_ORDERS")
        this.props.dispatchGetOrders(this.props.property.id, "Delivering", "SET_DELIVERING_ORDERS")
        this.props.dispatchGetOrders(this.props.property.id, "Delivered", "SET_DELIVERED_ORDERS")
        this.props.dispatchGetOrders(this.props.property.id, "Cancelled", "SET_CANCELLED_ORDERS")
    }

    render() {
        if (this.props.orders.isLoading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <React.Fragment>
                    <Jumbotron>Oders</Jumbotron>
                    <OrdersTab />
                </React.Fragment>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        property: state.property,
        orders: state.orders
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetOrders: (propertyID, status, actionType) => dispatch(getOrders(propertyID, status, actionType)),
    dispatchGetItems: (propertyID) => dispatch(getItems(propertyID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
