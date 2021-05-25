import { SET_PENDING_ORDERS, SET_PREPARING_ORDERS, SET_DELIVERED_ORDERS, SET_DELIVERING_ORDERS, SET_CANCELLED_ORDERS, CHANGE_ORDER_STATE, PUSH_ORDER, SET_ROBOTID } from '../actionTypes';

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

                case "Delivered":
                    return {
                        ...state,
                        orders: {
                            ...state.orders,
                            delivered: {
                                ...state.orders.delivered,
                                orders: [
                                    ...state.orders.delivered.orders,
                                    action.payload.item
                                ]
                            },
                            delivering: {
                                ...state.orders.delivering,
                                orders: state.orders.delivering.orders.filter(order => order._id !== action.payload.item._id)
                            }
                        }
                    }




                default:
                    return state;
            }

        case PUSH_ORDER:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    pending: {
                        ...state.orders.pending,
                        orders: [...state.orders.pending.orders, action.payload]
                    }
                }
            }

        case SET_ROBOTID:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    preparing: {
                        ...state.orders.preparing,
                        orders: state.orders.preparing.orders.map(order => {
                            if (order._id === action.payload.orderID) return { ...order, robot: action.payload.robotID }
                            return order
                        })
                    }
                }
            }

        default:
            return state;
    }

}