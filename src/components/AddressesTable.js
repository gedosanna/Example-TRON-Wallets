import React from 'react';

export const AddressesTable = (props) => {
    return (
        <table className="table addresses-table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Address</th>
                </tr>
            </thead>
            <tbody>
                {props.addresses.map((address, i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{address}</td>
                            <td className="font-weight-bold delete-address" onClick={() => props.removeAddress(address)}>x</td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}