import React from 'react';
const moment = require('moment');
moment().format();
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

export const WalletsTable = (props) => {
    return (
        <table className="table wallets-table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">
                        <div className="row m-0 align-items-center justify-content-between">
                            <p className='col-8 d-inline-block m-0 p-0'>Address</p>
                            <div className='p-0 row m-0 flex-wrap justify-content-end align-items-end'>
                                <FontAwesomeIcon icon={faCaretUp} className='sort-element col-12' onClick={() => props.sortWallets(props.wallets, 'addressUp')} />
                                <FontAwesomeIcon icon={faCaretDown} className='sort-element col-12' onClick={() => props.sortWallets(props.wallets, 'addressDown')} />
                            </div>
                            <div className='col-12 p-0'>
                                <input placeholder='Search...' className='first-search' onChange={(e) => props.searchWallets(e.target.value, props.walletsHolder, 'address')} />
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div className="row m-0 align-items-center justify-content-between">
                            <p className='col-8 d-inline-block m-0 p-0'>Balance</p>
                            <div className='p-0 row m-0 flex-wrap justify-content-end align-items-end'>
                                <FontAwesomeIcon icon={faCaretUp} className='sort-element col-12' onClick={() => props.sortWallets(props.wallets, 'balanceUp')} />
                                <FontAwesomeIcon icon={faCaretDown} className='sort-element col-12' onClick={() => props.sortWallets(props.wallets, 'balanceDown')} />
                            </div>
                            <div className='col-12 p-0'>
                                <input placeholder='Search...' onChange={(e) => props.searchWallets(e.target.value, props.walletsHolder, 'balance')} />
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div className="row m-0 align-items-center justify-content-between">
                            <p className='col-8 d-inline-block m-0 p-0'>Create time</p>
                            <div className='p-0 row m-0 flex-wrap justify-content-end align-items-end'>
                                <FontAwesomeIcon icon={faCaretUp} className='sort-element col-12' onClick={() => props.sortWallets(props.wallets, 'createTimeUp')} />
                                <FontAwesomeIcon icon={faCaretDown} className='sort-element col-12' onClick={() => props.sortWallets(props.wallets, 'createTimeDown')} />
                            </div>
                            <div className='col-12 p-0'>
                                <input placeholder='Search...' onChange={(e) => props.searchWallets(e.target.value, props.walletsHolder, 'createTime')} />
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div className="row m-0 align-items-center justify-content-between">
                            <p className='col-8 d-inline-block m-0 p-0'>Latest operation time</p>
                            <div className='p-0 row m-0 flex-wrap justify-content-end align-items-end'>
                                <FontAwesomeIcon icon={faCaretUp} className='sort-element col-12' onClick={() => props.sortWallets(props.wallets, 'latestOperationTimeUp')} />
                                <FontAwesomeIcon icon={faCaretDown} className='sort-element col-12' onClick={() => props.sortWallets(props.wallets, 'latestOperationTimeDown')} />
                            </div>
                            <div className='col-12 p-0'>
                                <input placeholder='Search...' onChange={(e) => props.searchWallets(e.target.value, props.walletsHolder, 'latestOperationTime')} />
                            </div>
                        </div></th>
                </tr>
            </thead>
            <tbody>
                {props.wallets.map((wallet, i) => {
                    let balance;
                    let createTime = new Date(wallet.create_time);
                    wallet.balance ? balance = parseInt(wallet.balance, 16) : '';
                    let latestOprationTime = new Date(wallet.latest_opration_time);
                    createTime = moment(createTime).format('MMMM D YYYY');
                    latestOprationTime = moment(latestOprationTime).format('MMMM D YYYY');
                    return (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{wallet.address}</td>
                            <td>{balance}</td>
                            <td>{createTime}</td>
                            <td>{latestOprationTime}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}