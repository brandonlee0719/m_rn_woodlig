import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// const composeEnhancers = composeWithDevTools({ realtime: true, port: 8081 });

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
