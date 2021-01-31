import React, { Component } from 'react';
import { Jumbotron, Breadcrumb, BreadcrumbItem, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
// import Loading from './LoadingComponent';
import { connect } from 'react-redux'
import { getItemDetail } from '../redux/actions/itemActions';
// import { getReviews } from '../store/actions/reviewActions';

function RenderItemDetails({ item }) {
    const RequiredDetails = {
        "Name": item.name,
        "Category": item.category,
        "Description": item.description,
        "Status": item.status
    }

    return (
        <div className="col-12 col-md-6 Details">
            {
                Object.keys(RequiredDetails).map((key, i) => {
                    return (
                        <div className="row" key={i}>
                            <div className="col-3">
                                {key}
                            </div>
                            <div className="col-9">
                                {RequiredDetails[key]}
                            </div>
                        </div>
                    )
                })
            }
            <RenderIngredients ingredients={item.ingredients} />
            <RenderPortions portions={item.portions} />
        </div>
    )
}

function RenderIngredients({ ingredients }) {
    return (
        <div className="row">
            <div className="col-3">
                Ingredients
                </div>
            <div className="col-9">
                <ul>
                    {
                        ingredients.map((ingredient, i) => {
                            return (
                                <li key={i}>{ingredient}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

function RenderPortions({ portions }) {
    return (
        <div className="row">
            <div className="col-3">
                Portions
                </div>
            <div className="col-9">
                <ul>
                    {
                        portions.map((portion, i) => {
                            return (
                                <li key={i}>
                                    <div className="row">
                                        <div className="col-3">
                                            {portion.name}
                                        </div>
                                        <div className="col-9">
                                            {portion.price}
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

function RenderReviews({ reviews }) {
    console.log("revies");
    console.log(reviews);
    // if(reviews.isLoading){
    //     return (
    //         <div className="container">
    //             <div className="row">
    //                 <Loading />
    //             </div>
    //         </div>
    //     );
    // }
    // else{
    return (
        <div className="row">
            {/* <h3 className="col-12">Reviews</h3>
                <ul>
                    {
                        reviews.reviews.map((review, i) => {
                            return (
                                <li key={i}>
                                    <p>{review.comment}</p>
                                    <p>Starts: {review.stars}</p>
                                </li>
                            )
                        })
                    }
                </ul> */}
        </div>
    )
    // }
}




class ItemDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            itemID: this.props.match.params.itemID,
            isModalOpen: false
        };

        this.props.dispatchGetItemDetail(this.state.itemID)

    };

    // componentDidMount() {
    //     this.props.getReviews(this.props.item._id)
    // }

    render() {
        console.log("itemdetail rendered");


        if (!this.props.items.selectedItem) {
            return (
                <div className="container">
                    <div className="row">
                        loading
                    </div>
                </div>
            );
        }
        // else
        return (
            <div>
                <Jumbotron>
                    <div className="container-fluid">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>{this.props.items.selectedItem.name}</h1>
                            </div>
                            <div className="col-12 col-sm-6">
                                <Button className="btn-lg mr-3" onClick={this.toggleModal}>Change Item Status</Button>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <div className="container-fluid">
                    <div className='row'>
                        <Breadcrumb className='ml-5'>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.items.selectedItem.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <div className='col-12 col-md-4'>
                            <img src={this.props.items.selectedItem.imgUrl} width="100%" alt="food item" />
                        </div>
                        <RenderItemDetails item={this.props.items.selectedItem} />
                    </div>
                    <RenderReviews reviews={this.props.items.selectedItem} />
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    items: state.items,
    // reviews: state.reviews
});

const mapDispatchToProps = dispatch => ({
    dispatchGetItemDetail: (itemID) => dispatch(getItemDetail(itemID))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemDetail));