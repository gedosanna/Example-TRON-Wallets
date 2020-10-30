import {ADD_TO_WALLETS_HOLDER, REMOVE_FROM_WALLETS_HOLDER} from './types';

export const addToWalletsHolder = wallet => {
    return {
        type: ADD_TO_WALLETS_HOLDER,
        wallet: wallet
    }
}

export const removeFromWalletHolder = wallet => {
    return {
        type: REMOVE_FROM_WALLETS_HOLDER,
        wallet: wallet
    }
}