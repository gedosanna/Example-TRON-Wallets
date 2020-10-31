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
                        <div className="row m-0 align-items-center">
                            <p className='col-8 d-inline-block m-0'>Address</p>
                            <div className='col-4 d-inline-block'>
                                <FontAwesomeIcon icon={faCaretUp} className='sort-element' />
                                <FontAwesomeIcon icon={faCaretDown} className='sort-element' />
                            </div>
                        </div>

                    </th>
                    <th scope="col">
                        <div className="row m-0 align-items-center">
                            <p className='col-8 d-inline-block m-0'>Balance</p>
                            <div className='col-4 d-inline-block'>
                                <FontAwesomeIcon icon={faCaretUp} className='sort-element' />
                                <FontAwesomeIcon icon={faCaretDown} className='sort-element' />
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div className="row m-0 align-items-center">
                            <p className='col-8 d-inline-block m-0'>Create time</p>
                            <div className='col-4 d-inline-block'>
                                <FontAwesomeIcon icon={faCaretUp} className='sort-element' />
                                <FontAwesomeIcon icon={faCaretDown} className='sort-element' />
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div className="row m-0 align-items-center">
                            <p className='col-8 d-inline-block m-0'>Latest operation time</p>
                            <div className='col-4 d-inline-block'>
                                <FontAwesomeIcon icon={faCaretUp} className='sort-element' />
                                <FontAwesomeIcon icon={faCaretDown} className='sort-element' />
                            </div>
                        </div></th>
                </tr>
            </thead>
            <tbody>
                {props.wallets.map((wallet, i) => {
                    let createTime = new Date(wallet.create_time);
                    const balance = parseInt(wallet.balance, 16);
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