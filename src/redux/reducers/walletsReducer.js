import { 
    REMOVE_ADDRESS, 
    FETCH_ADDRESS_REQUEST, 
    FETCH_ADDRESS_SUCCESS, 
    FETCH_ADDRESS_FAILURE } from '../actions/types';

const initialState = {
    addresses: ['TGmcz6UMqeTUoNryw4LcPeTWmo1DWrxRUK', 'TSFKJsiJrt6bUTmxS1F1Fmv6UUYdGVB9Ws'],
    wallets: [],
    loadingAdd: true,
    messageAdd: 'Add new',
    resultAdd: ''
}

const walletsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADDRESS_REQUEST : {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_ADDRESS_SUCCESS : {
            const message = action.result ? 'Added successfully!' : `Error: ${action.message}`
            const newAddresses = action.result ? state.addresses.concat(action.address) : state.addresses
            return {
                ...state,
                loading: false,
                resultAdd: action.result,
                messageAdd: message,
                error: '',
                addresses: newAddresses
            }
        }
        case FETCH_ADDRESS_FAILURE : {
            return {
                ...state,
                loading: false,
                favorites: [],
                error: action.payload
            }
        }
        case REMOVE_ADDRESS: {
            const newAddresses = state.addresses.filter(address => {
                return address !== action.address
            })
            return {
                ...state,
                addresses: newAddresses
            }
        }
        default:
            return state
    }
}

export default walletsReducer;