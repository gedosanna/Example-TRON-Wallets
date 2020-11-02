import {
    REMOVE_ADDRESS,
    FETCH_ADDRESS_REQUEST,
    FETCH_ADDRESS_SUCCESS,
    FETCH_ADDRESS_FAILURE,
    FETCH_WALLETS_REQUEST,
    FETCH_WALLETS_SUCCESS,
    FETCH_WALLETS_FAILURE,
    SORT_WALLETS,
    SEARCH_WALLETS
} from '../actions/types';

const initialState = {
    addresses: ['TUv34RrPNY2qTNHZ9q4mLc9AuUu9Tpy3Jg', 'TGmcz6UMqeTUoNryw4LcPeTWmo1DWrxRUK'],
    wallets: [],
    walletsHolder: [],
    loadingAdd: true,
    messageAdd: 'Add new',
    resultClass: 'correct',
    loadingWallets: true,
    sorted: false,
    search: false,
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
            const resultClass = action.result ? 'correct': 'incorrect';
            return {
                ...state,
                loadingAdd: false,
                resultClass: resultClass,
                messageAdd: message,
                error: '',
                addresses: newAddresses,
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
            const newWallets = state.wallets.filter(wallet => wallet.address !== action.address)
            return {
                ...state,
                addresses: newAddresses,
                wallets: newWallets
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
                walletsHolder: state.wallets.concat(action.wallet),
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
        case SORT_WALLETS: {
            return {
                ...state,
                sorted: !state.sorted,
                wallets: action.wallets
            }
        }
        case SEARCH_WALLETS: {
            return {
                ...state,
                search: !state.search,
                wallets: action.wallets
            }
        }
        default:
            return state
    }
}

export default walletsReducer;