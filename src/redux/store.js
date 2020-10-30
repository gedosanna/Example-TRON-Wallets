import { createStore, combineReducers } from 'redux';
import walletsReducer from './reducers/walletsReducer';

const rootReducer = combineReducers({
    wallets: walletsReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;