import { applyMiddleware, createStore } from 'redux'

import createSagaMiddleware from 'redux-saga'
import rootReducer from './redux/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSagas from "./redux/sagas";

export default function configureStore(preloadedState) {

    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(rootReducer, preloadedState, composedEnhancers)

    sagaMiddleware.run(rootSagas)

    return store
}