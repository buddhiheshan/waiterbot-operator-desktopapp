import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr'

import itemReducer from './itemsReducer'
import robotsReducer from './robotsReducer';
import userReducers from './userReducer';
import propertyReducer from './propertyReducer';
import orderReducers from './ordersReducer';
import reviewsReducer from './reviewsReducer';
// import tablesReducer from './tablesReducer';

export default combineReducers({
  items: itemReducer,
  robots: robotsReducer,
  user: userReducers,
  property: propertyReducer,
  orders: orderReducers,
  toastr: toastrReducer,
  reviews: reviewsReducer,
  // tables: tablesReducer
});