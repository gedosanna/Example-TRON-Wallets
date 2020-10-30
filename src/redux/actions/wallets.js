import {
    REMOVE_ADDRESS,
    FETCH_ADDRESS_REQUEST,
    FETCH_ADDRESS_SUCCESS,
    FETCH_ADDRESS_FAILURE
} from './types';


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


export const removeAddress = address => {
    return {
        type: REMOVE_ADDRESS,
        address: address
    }
}