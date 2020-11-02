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
} from './types';
const moment = require('moment');
moment().format();

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

export const fetchAddress = (address, addresses) => {
    if (!addresses.includes(address)) {
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
    else {
        return(dispatch) => dispatch(fetchAddressSuccess({
            type: FETCH_ADDRESS_SUCCESS,
            result: false,
            message: 'Already exists!',
            address: address
        }))
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

export const fetchWallets = (address, wallets) => {
    return (dispatch) => {
        dispatch(fetchWalletsRequest)
        fetch("https://api.trongrid.io/wallet/getaccount", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({ address: address, visible: true })
        })
            .then(response => response.json())
            .then(responseJson => {
                dispatch(fetchWalletsSuccess(responseJson))
            })
            .catch(err => {
                console.error(err);
                (fetchWalletsFailure(err.message))
            });
    }
}

// Sort function

export const sortWallets = (wallets, operationType) => {
    let sortedWallets;
    if(operationType === 'addressUp') {
        sortedWallets = wallets.sort((a, b) => {
            if (a.address < b.address) return -1;
            else if (a.address > b.address) return 1;
            return 0;
        })
    }
    else if(operationType === 'addressDown') {
        sortedWallets = wallets.sort((a, b) => {
            if (a.address < b.address) return 1;
            else if (a.address > b.address) return -1;
            return 0;
        })
    }
    else if(operationType === 'balanceUp') {
        sortedWallets = wallets.sort((a, b) => {
            let aBalance, bBalance;
            a.balance === undefined ? aBalance = 0 : aBalance = parseInt(a.balance, 16);
            b.balance === undefined ? bBalance = 0 : bBalance = parseInt(b.balance, 16);
            if (aBalance < bBalance) return -1;
            else if (aBalance > bBalance) return 1;
            return 0;
        })
    }
    else if(operationType === 'balanceDown') {
        sortedWallets = wallets.sort((a, b) => {
            let aBalance, bBalance;
            a.balance === undefined ? aBalance = 0 : aBalance = parseInt(a.balance, 16);
            b.balance === undefined ? bBalance = 0 : bBalance = parseInt(b.balance, 16);
            if (aBalance < bBalance) return 1;
            else if (aBalance > bBalance) return -1;
            return 0;
        })
    }
    else if(operationType === 'createTimeUp') {
        sortedWallets = wallets.sort((a, b) => {
            const aDate = new Date(a.create_time);
            const bDate = new Date(b.create_time);
            if (aDate < bDate) return -1;
            else if (aDate > bDate) return 1;
            return 0;
        })
    }
    else if(operationType === 'createTimeDown') {
        sortedWallets = wallets.sort((a, b) => {
            const aDate = new Date(a.create_time);
            const bDate = new Date(b.create_time);
            if (aDate < bDate) return 1;
            else if (aDate > bDate) return -1;
            return 0;
        })
    }
    else if(operationType === 'latestOperationTimeUp') {
        sortedWallets = wallets.sort((a, b) => {
            const aDate = new Date(a.latest_opration_time);
            const bDate = new Date(b.latest_opration_time);
            if (aDate < bDate) return -1;
            else if (aDate > bDate) return 1;
            return 0;
        })
    }
    else if(operationType === 'latestOperationTimeDown') {
        sortedWallets = wallets.sort((a, b) => {
            const aDate = new Date(a.latest_opration_time);
            const bDate = new Date(b.latest_opration_time);
            if (aDate < bDate) return 1;
            else if (aDate > bDate) return -1;
            return 0;
        })
    }
    return {
        type: SORT_WALLETS,
        wallets: sortedWallets
    }
}

// Search function

export const searchWallets = (searchText, walletsHolder, column) => {
    let foundWallets = [];
    if (column === 'address') {
        foundWallets = walletsHolder.filter(wallet => {
            if (wallet.address.toUpperCase().includes(searchText.toUpperCase())) return wallet
        })
    }
    else if (column === 'balance') {
        foundWallets = walletsHolder.filter(wallet => {
            const balance = parseInt(wallet.balance, 16).toString();
            if (balance.includes(searchText)) return wallet
        })
    }
    else if (column === 'createTime') {
        foundWallets = walletsHolder.filter(wallet => {
            let createTime = new Date(wallet.create_time);
            createTime = moment(createTime).format('MMMM D YYYY').toString().toUpperCase();
            if (createTime.includes(searchText.toUpperCase())) return wallet
        })
    }
    else if (column === 'latestOperationTime') {
        foundWallets = walletsHolder.filter(wallet => {
            let createTime = new Date(wallet.latest_opration_time);
            createTime = moment(createTime).format('MMMM D YYYY').toString().toUpperCase();
            if (createTime.includes(searchText.toUpperCase())) return wallet
        })
    }
    return {
        type: SEARCH_WALLETS,
        wallets: foundWallets
    }
}
