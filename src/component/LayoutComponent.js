import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getPropertyInfo } from '../redux/actions/propertyActions';

import Menu from '../pages/MenuComponent';
import Orders from '../pages/OrdersComponent';
import ItemDetails from '../pages/ItemDetailsComponent';
import NavBar from './NavBarComponent';
import RobotPanel from './RobotPanelComponent';
import Loading from './loading/LoadingComponent';


class Layout extends Component {

    constructor(props) {
        super(props)

        this.props.dispatchGetPropertyInfo();
    }

    render() {

        if (this.props.property.isLoading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <NavBar />
                        <div className="container-fluid col-7 Main-panel">
                            <Switch>
                                <Route exact path="/orders"><Orders /></Route>
                                <Route exact path="/menu"><Menu /></Route>
                                <Route exact path="/menu/:itemID"><ItemDetails /></Route>
                                <Redirect to='/orders' />
                            </Switch>
                        </div>
                        <RobotPanel />
                    </div >
                </div >
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
    dispatchGetPropertyInfo: () => dispatch(getPropertyInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
