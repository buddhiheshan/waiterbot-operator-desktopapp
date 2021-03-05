import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { login } from '../redux/actions/userActions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        this.props.dispatchLogin(this.mobile.value, this.password.value);
        event.preventDefault()
    }

    render() {
        return (
            <React.Fragment>
                <Form className="Login">
                    <FormGroup>
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input
                            type="text"
                            id="mobile"
                            name="mobile"
                            innerRef={(input) => this.mobile = input} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            innerRef={(input) => this.password = input} />
                    </FormGroup>
                    <Button color="primary" onClick={this.handleLogin}>Login</Button>
                </Form>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchLogin: (mobile, password) => dispatch(login(mobile, password))
});

export default connect(null, mapDispatchToProps)(Login);

