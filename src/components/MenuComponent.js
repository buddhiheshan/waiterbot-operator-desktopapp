import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getItems } from '../redux/actions/itemActions';

import Loading from '../components/LoadingComponent';

import { Jumbotron, Container, Row, Col, Card } from 'react-bootstrap';


function RenderMenuItem({ item }) {
    return (
        <Card>
            <Link to={`/menu/${item._id}`}>
                <Card.Img className="Item-img" src={item.imgUrl} alt={item.name} />
                <Card.ImgOverlay className="Item-overlay">
                    <Card.Title className="Item-title">{item.name}</Card.Title>
                </Card.ImgOverlay>
            </Link>
        </Card>
    );
};

class Menu extends Component {

    componentDidMount() {
        this.props.dispatchGetItems(this.props.property.id)
    }

    render() {
        const MenuItems = this.props.items.items.map((item) => {
            return (
                <Col sm={6} md={3} key={item._id} className="Food-item">
                    <RenderMenuItem item={item} />
                </Col>
            )
        });

        return (
            <React.Fragment>
                <Jumbotron fluid className="Jumbotron-MainPanel">Menu</Jumbotron>
                {this.props.items.isLoading ? <Loading /> :
                    <Container>
                        <Row>
                            {MenuItems}
                        </Row>
                    </Container>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        property: state.property,
        items: state.items
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetItems: (propertyID) => dispatch(getItems(propertyID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
