import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import { todoReducer } from './todo';
import todoDetailsReducer from './todoDetails';
import reviewsReducer from './review';
import favoriteReducer from './favorite';

const rootReducer = combineReducers({
  session, 
  favorites: favoriteReducer,
  todos: todoReducer,
  todoDetails: todoDetailsReducer,
  reviews: reviewsReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
