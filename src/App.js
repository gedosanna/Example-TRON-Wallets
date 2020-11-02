import React, { useEffect, useState } from 'react';
import './style/main.scss';
import 'bootstrap';
import { connect } from 'react-redux';
import { fetchAddress, removeAddress, fetchWallets, sortWallets, searchWallets } from './redux/actions/wallets';
import { AddressesTable } from './components/AddressesTable';
import { WalletsTable } from './components/WalletsTable';

const App = (props) => {
    const [address, setAddress] = useState();
    const [inputAddressValue, setInputAddressValue] = useState('Type base58 address here...');
    const [showTable, setShowTable] = useState(false);
    const [changeInputAddressValue, setChangeInputAddressValue] = useState(true);

    useEffect(() => {
        if (props.resultClass === 'correct') setInputAddressValue('')
    }, [props.resultClass])

    return (
        <>
            <header className='col-sm-4'>
                <h1>Tron Wallets</h1>
            </header>
            <section className="row m-0 container-fluid justify-content-center">
                <div className="addresses-container col-sm-10">
                    <div className="row m-0 justify-content-between flex-wrap">
                        <h2 className="col-md-6 col-lg-4 m-0">Your addresses</h2>
                        <form className="col-lg-6 col-xl-4 row m-0 justify-content-end p-0">
                            <p className={"text-center col-12 font-weight-bold " + props.resultClass}>{props.message}</p>
                            <div className='col-12 text-center'>
                                <input type='text' value={inputAddressValue} onFocus={() => { if (inputAddressValue === 'Type base58 address here...') setInputAddressValue('') }} className={props.resultClass} onChange={(e) => { setInputAddressValue(e.target.value); setAddress(e.target.value) }} />
                                <button type='submit' onClick={(e) => {
                                    e.preventDefault();
                                    setShowTable(false);
                                    props.fetchAddress(address, props.addresses);
                                    setChangeInputAddressValue(!changeInputAddressValue);
                                }}>+</button>
                            </div>
                        </form>
                    </div>
                    <div className='addresses-table-container'>
                        {props.addresses.length > 0 && <AddressesTable addresses={props.addresses} removeAddress={props.removeAddress} />}
                    </div>
                    <div className='container-fluid text-center'>
                        {props.addresses.length > 0 &&
                            <button className='font-weight-bold' onClick={() => {
                                setShowTable(true);
                                props.addresses.forEach(address => {
                                    let notInside = true;
                                    if (props.wallets.length > 0) {
                                        props.wallets.forEach(wallet => wallet.address === address ? notInside = false : null)
                                    }
                                    if (notInside) props.fetchWallets(address)
                                })
                            }}>Generate table</button>
                        }
                        {props.addresses.length === 0 &&
                            <p className='no-addresses'>No addresses</p>
                        }
                    </div>
                </div>
            </section>
            <section className="row m-0 container-fluid justify-content-center">
                {showTable && props.addresses.length > 0 &&
                    <div className="wallets-container col-sm-10">
                        <div className="wallets-table-container container-fluid">
                            <WalletsTable wallets={props.wallets} sortWallets={props.sortWallets} walletsHolder={props.walletsHolder} searchWallets={props.searchWallets} />
                        </div>
                    </div>
                }
            </section>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        message: state.wallets.messageAdd,
        addresses: state.wallets.addresses,
        wallets: state.wallets.wallets,
        walletsHolder: state.wallets.walletsHolder,
        sorted: state.wallets.sorted,
        resultClass: state.wallets.resultClass,
        inputAddressValue: state.wallets.inputAddressValue
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddress: (address, addresses) => dispatch(fetchAddress(address, addresses)),
        removeAddress: (address) => dispatch(removeAddress(address)),
        fetchWallets: (addresses) => dispatch(fetchWallets(addresses)),
        sortWallets: (wallets, operationType) => dispatch(sortWallets(wallets, operationType)),
        searchWallets: (searchText, wallets, walletsHolder) => dispatch(searchWallets(searchText, wallets, walletsHolder))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)