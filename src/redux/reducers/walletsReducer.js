import {
    REMOVE_ADDRESS,
    FETCH_ADDRESS_REQUEST,
    FETCH_ADDRESS_SUCCESS,
    FETCH_ADDRESS_FAILURE,
    FETCH_WALLETS_REQUEST,
    FETCH_WALLETS_SUCCESS,
    FETCH_WALLETS_FAILURE,
} from '../actions/types';

const initialState = {
    addresses: ['TGmcz6UMqeTUoNryw4LcPeTWmo1DWrxRUK', 'TUv34RrPNY2qTNHZ9q4mLc9AuUu9Tpy3Jg'],
    wallets: [],
    loadingAdd: true,
    messageAdd: 'Add new',
    resultAdd: '',
    loadingWallets: true
}

const walletsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADDRESS_REQUEST : {
            return {
                ...state,
                loadingAdd: true
            }
        }
        case FETCH_ADDRESS_SUCCESS : {
            const message = action.result ? 'Added successfully!' : `Error: ${action.message}`
            const newAddresses = action.result ? state.addresses.concat(action.address) : state.addresses
            return {
                ...state,
                loadingAdd: false,
                resultAdd: action.result,
                messageAdd: message,
                error: '',
                addresses: newAddresses
            }
        }
        case FETCH_ADDRESS_FAILURE : {
            return {
                ...state,
                loadingAdd: false,
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
        case FETCH_WALLETS_REQUEST : {
            return {
                ...state,
                loadingWallets: true
            }
        }
        case FETCH_WALLETS_SUCCESS : {
            return {
                ...state,
                loadingWallets: false,
                wallets: state.wallets.concat(action.wallet),
                error: '',
            }
        }
        case FETCH_WALLETS_FAILURE : {
            return {
                ...state,
                loadingWallets: false,
                error: action.payload
            }
        }
        default:
            return state
    }
}

export default walletsReducer;