import { ADD_ADDRESS, REMOVE_ADDRESS } from '../actions/types';

const initialState = {
    addresses: [],
    wallets: []
}

const walletsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ADDRESS: {
            return state.wallets.concat(action.address)
        }
        case REMOVE_ADDRESS: {
            return {
                ...state
            }
        }
        default:
            return state
    }
}

export default walletsReducer;