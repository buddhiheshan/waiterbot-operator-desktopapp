import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { Jumbotron, Breadcrumb, Button, Col, Row, Container, Image, ListGroup } from 'react-bootstrap';

import Loading from './LoadingComponent';

import { getItemDetail, toggleItemStatus } from '../redux/actions/itemActions';
import Reviews from './ReviewsComponenets';

function RenderItemDetails({ item }) {
    const RequiredDetails = {
        "Name": item.name,
        "Category": item.category,
        "Description": item.description,
        "Status": item.status
    }

    return (
        <ListGroup>
            {
                Object.keys(RequiredDetails).map((key, i) => {
                    return (
                        <ListGroup.Item key={i}>
                            <Row>
                                <Col md={4}>
                                    {key}
                                </Col>
                                <Col>
                                    {RequiredDetails[key]}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })
            }
            <RenderIngredients ingredients={item.ingredients} />
            <RenderPortions portions={item.portions} />
        </ListGroup>
    )
}

function RenderIngredients({ ingredients }) {
    return (
        <ListGroup.Item>
            <Row>
                <Col md={4}>
                    Ingredients
                </Col>
                <Col>
                    <ul>
                        {
                            ingredients.map((ingredient, i) => {
                                return (
                                    <li key={i}>{ingredient}</li>
                                )
                            })
                        }
                    </ul>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

function RenderPortions({ portions }) {
    return (
        <ListGroup.Item>
            <Row>
                <Col md={4}>
                    Portions
                </Col>
                <Col>
                    <ul>
                        {
                            portions.map((portion, i) => {
                                return (
                                    <li key={i}>
                                        <Row>
                                            <Col md={6}>
                                                {portion.name}
                                            </Col>
                                            <Col md={6}>
                                                {portion.price}
                                            </Col>
                                        </Row>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

class ItemDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            itemID: this.props.match.params.itemID,
            isModalOpen: false
        };

        this.toggleStatus = this.toggleStatus.bind(this)

    };

    componentDidMount() {
        this.props.dispatchGetItemDetail(this.state.itemID);
    }


    toggleStatus() {
        if (this.props.items.selectedItem.status === "available")
            this.props.dispatchToggleItemStatus(this.props.items.selectedItem._id, false)
        if (this.props.items.selectedItem.status === "sold-out")
            this.props.dispatchToggleItemStatus(this.props.items.selectedItem._id, true)
    }

    render() {

        if (!this.props.items.selectedItem) {
            return (
                <Loading />
            );
        }
        return (
            <div>
                <Jumbotron fluid className="Jumbotron-MainPanel">
                    <Row>
                        <Col md={6}>
                            {this.props.items.selectedItem.name}
                        </Col>
                        <Col>
                            <Button size="lg" onClick={this.toggleStatus}>Change Item Status</Button>
                        </Col>
                    </Row>

                </Jumbotron>
                <Container fluid>
                    <Row>
                        <Breadcrumb>
                            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/menu" }}>Menu</Breadcrumb.Item>
                            <Breadcrumb.Item active>{this.props.items.selectedItem.name}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="ItemDetails">
                        <Col md={6}>
                            <Image rounded src={this.props.items.selectedItem.imgUrl} width="100%" alt="food item" />
                        </Col>
                        <Col>
                            <RenderItemDetails item={this.props.items.selectedItem} />
                        </Col>
                    </Row>
                    <Reviews  />
                </Container>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    items: state.items,
    // reviews: state.reviews
});

const mapDispatchToProps = dispatch => ({
    dispatchGetItemDetail: (itemID) => dispatch(getItemDetail(itemID)),
    dispatchToggleItemStatus: (itemID, availability) => dispatch(toggleItemStatus(itemID, availability))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemDetail));