import { createStore, combineReducers, applyMiddleware } from 'redux';
import walletsReducer from './reducers/walletsReducer';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    wallets: walletsReducer
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;