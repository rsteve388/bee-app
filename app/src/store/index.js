import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';

import { composeWithDevTools } from 'remote-redux-devtools'

// const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     applyMiddleware(
//         thunkMiddleware
//     )
// );

const store = createStore(rootReducer, /* preloadedState, */ composeWithDevTools(
    applyMiddleware(thunkMiddleware)
));

export default store;
