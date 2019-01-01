import { applyMiddleware, createStore } from 'redux'

import thunkMiddleware from 'redux-thunk'
import rootReducer from './redux/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'


export default function configureStore(preloadedState) {
    const middlewares = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(rootReducer, preloadedState, composedEnhancers)

    return store
}