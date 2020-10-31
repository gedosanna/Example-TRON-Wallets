import {
    REMOVE_ADDRESS,
    FETCH_ADDRESS_REQUEST,
    FETCH_ADDRESS_SUCCESS,
    FETCH_ADDRESS_FAILURE,
    FETCH_WALLETS_REQUEST,
    FETCH_WALLETS_SUCCESS,
    FETCH_WALLETS_FAILURE
} from './types';

// Address validation and adding 

export const fetchAddressRequest = () => {
    return {
        type: FETCH_ADDRESS_REQUEST
    }
}

export const fetchAddressSuccess = (addressResult, address) => {
    return {
        type: FETCH_ADDRESS_SUCCESS,
        result: addressResult.result,
        message: addressResult.message,
        address: address
    }
}

export const fetchAddressFailure = (error) => {
    return {
        type: FETCH_ADDRESS_FAILURE,
        payload: error
    }
}

export const fetchAddress = (address) => {
    return (dispatch) => {
        dispatch(fetchAddressRequest)

        fetch("https://api.trongrid.io/wallet/validateaddress", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({ address: address })
        })
            .then(response => response.json())
            .then(responseJson => {
                dispatch(fetchAddressSuccess(responseJson, address))
            })
            .catch(err => {
                console.error(err);
                dispatch(fetchAddressFailure(err.message))
            });
    }
}

// Remove address

export const removeAddress = address => {
    return {
        type: REMOVE_ADDRESS,
        address: address
    }
}

// Get wallets data 

export const fetchWalletsRequest = () => {
    return {
        type: FETCH_WALLETS_REQUEST
    }
}

export const fetchWalletsSuccess = (wallet) => {
    return {
        type: FETCH_WALLETS_SUCCESS,
        wallet: wallet
    }
}

export const fetchWalletsFailure = (error) => {
    return {
        type: FETCH_WALLETS_FAILURE,
        payload: error
    }
}

export const fetchWallets = (address) => {
    return (dispatch) => {
        dispatch(fetchWalletsRequest)
        fetch("https://api.trongrid.io/wallet/getaccount", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({address: address, visible: true})
            })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson)
                    dispatch(fetchWalletsSuccess(responseJson))
                })
            .catch(err => {
                console.error(err);
                (fetchWalletsFailure(err.message))
            });
    }
}