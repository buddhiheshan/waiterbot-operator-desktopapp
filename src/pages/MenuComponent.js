import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getItems } from '../redux/actions/itemActions';

import Loading from '../components/LoadingComponent';

import { Jumbotron } from 'react-bootstrap';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

function RenderMenuItem({ item }) {
    return (
        <Card>
            <Link to={`/menu/${item._id}`}>
                <CardImg className="Item-img" src={item.imgUrl} alt={item.name} />
                <CardImgOverlay>
                    <CardTitle>{item.name}</CardTitle>
                </CardImgOverlay>
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
                <div key={item._id} className="col-6 col-md-3 Food-item">
                    <RenderMenuItem item={item} />
                </div>
            )
        });

        return (
            <React.Fragment>
                <Jumbotron fluid className="Jumbotron">Menu</Jumbotron>
                {this.props.items.isLoading ? <Loading /> : <div className="row">
                        {MenuItems}
                    </div>}
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
