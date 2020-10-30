import {ADD_ADDRESS, REMOVE_ADDRESS} from './types';

export const addAddress = address => {
    return {
        type: ADD_ADDRESS,
        address: address
    }
}

export const removeAddress = address => {
    return {
        type: REMOVE_ADDRESS,
        address: address
    }
}