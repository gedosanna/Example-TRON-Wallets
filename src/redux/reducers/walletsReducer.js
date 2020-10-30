import {ADD_TO_WALLETS_HOLDER, REMOVE_FROM_WALLETS_HOLDER} from '../actions/types';

const initialState = {
    wallets: []
}

const walletsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_WALLETS_HOLDER: {
            return state.wallets.concat(action.wallet)
        }
        case REMOVE_FROM_WALLETS_HOLDER: {
            return {
                
            }
        }
    }
}

export default walletsReducer;