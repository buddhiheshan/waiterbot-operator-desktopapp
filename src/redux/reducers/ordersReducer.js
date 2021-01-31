import { SET_PENDING_ORDERS, SET_PREPARING_ORDERS, SET_DELIVERED_ORDERS, SET_DELIVERING_ORDERS, SET_CANCELLED_ORDERS, CHANGE_ORDER_STATE } from '../ActionTypes';

const initialState = {
    orders: {
        pending: {
            orders: [],
            isLoading: true
        },
        cancelled: {
            orders: [],
            isLoading: true
        },
        preparing: {
            orders: [],
            isLoading: true
        },
        delivered: {
            orders: [],
            isLoading: true
        },
        delivering: {
            orders: [],
            isLoading: true
        },
    },
    isLoading: true
}

export default function ordersReducer(state = initialState, action) {

    const updated_payload = {
        orders: action.payload,
        isLoading: false
    }

    switch (action.type) {

        case SET_PENDING_ORDERS:
            return {
                ...state,
                isLoading: false,
                orders: {
                    ...state.orders,
                    pending: updated_payload
                }
            }
        case SET_PREPARING_ORDERS:
            return {
                ...state,
                isLoading: false,
                orders: {
                    ...state.orders,
                    preparing: updated_payload
                }
            }
        case SET_DELIVERING_ORDERS:
            return {
                ...state,
                isLoading: false,
                orders: {
                    ...state.orders,
                    delivering: updated_payload
                }
            }
        case SET_DELIVERED_ORDERS:
            return {
                ...state,
                isLoading: false,
                orders: {
                    ...state.orders,
                    delivered: updated_payload
                }
            }
        case SET_CANCELLED_ORDERS:
            return {
                ...state,
                isLoading: false,
                orders: {
                    ...state.orders,
                    cancelled: updated_payload
                }
            }

        case CHANGE_ORDER_STATE:

            switch (action.payload.nextState) {
                case "Preparing":
                    return {
                        ...state,
                        orders: {
                            ...state.orders,
                            preparing: {
                                ...state.orders.preparing,
                                orders: [
                                    ...state.orders.preparing.orders,
                                    action.payload.item
                                ]
                            },
                            pending: {
                                ...state.orders.pending,
                                orders: state.orders.pending.orders.filter(order => order._id !== action.payload.item._id)
                            }
                        }
                    }



                case "Delivering":
                    return {
                        ...state,
                        orders: {
                            ...state.orders,
                            delivering: {
                                ...state.orders.delivering,
                                orders: [
                                    ...state.orders.delivering.orders,
                                    action.payload.item
                                ]
                            },
                            preparing: {
                                ...state.orders.preparing,
                                orders: state.orders.preparing.orders.filter(order => order._id !== action.payload.item._id)
                            }
                        }
                    }


                default:
                    return state;
            }

        default:
            return state;
    }

}