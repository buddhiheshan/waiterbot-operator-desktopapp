import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Row, Col, ListGroup } from 'react-bootstrap';
import { MdStar } from 'react-icons/md'

import Loading from './LoadingComponent';

import { getReviews } from '../redux/actions/reviewsActions';



const RenderStars = ({ count }) => {
    const stars = [];

    for (let i = 0; i < count; i++) {
        stars.push(<MdStar key={i} color="yellow" />)
    }
    return (
        <div>
            {stars}
        </div>
    )
}

const RenderReviews = ({ reviews }) => {
    console.log(reviews);
    if (reviews.length !== 0) {
        return (
            <ListGroup>
                {
                    reviews.map((review) => {
                        return (
                            <ListGroup.Item key={review._id} className="Review">
                                {review.comment}<br />
                                <RenderStars count={review.stars} />
                            </ListGroup.Item>
                        );
                    })
                }
            </ListGroup>
        )
    }
    else{
        return(
            <Col>No reviews.</Col>
        )
    }

}



class Reviews extends Component {

    componentDidMount() {
        this.props.dispatchGetReviews(this.props.selectedItem._id);
    }

    render() {

        return (
            <React.Fragment>

                <Row className="Reviews">
                    <Col>
                        <Row className="ReviewsHeader">Reviews</Row>
                        <Row>
                            {this.props.reviews.isLoading ? <Loading /> :
                                <RenderReviews reviews={this.props.reviews.reviews} />
                            }
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedItem: state.items.selectedItem,
    reviews: state.reviews
});

const mapDispatchToProps = dispatch => ({
    dispatchGetReviews: (itemID) => dispatch(getReviews(itemID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);