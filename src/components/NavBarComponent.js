import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

import { logout } from '../redux/actions/userActions';


import { Nav, NavItem, Button } from 'reactstrap';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.clear();
        this.props.dispatchLogout();
    };

    render() {
        return (
            <React.Fragment>
                <Nav vertical >
                    <div>
                        <Image fluid roundedCircle src='assets/images/operator_image.png' alt='Operator' />
                        <div className="Username">
                            {localStorage.getItem('firstname')}<br />
                            {localStorage.getItem('lastname')}
                        </div>
                    </div >
                    <NavItem>
                        <NavLink className="Navlink nav-link" to='/orders'><span className="fa fa-home fa-lg"></span> Orders</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="Navlink nav-link" to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                    </NavItem>
                </Nav>
                <Link to="/">
                    <Button onClick={this.handleLogout}><span className="fa fa-sign-out fa-lg Logout"></span> Logout</Button>
                </Link>

            </React.Fragment>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchLogout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(NavBar);
