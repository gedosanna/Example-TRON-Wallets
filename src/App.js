import React, { useEffect, useState } from 'react';
import './style/main.scss';
import 'bootstrap';
import { connect } from 'react-redux';
import { fetchAddress, removeAddress, fetchWallets, sortWallets, searchWallets } from './redux/actions/wallets';
import { AddressesTable } from './components/AddressesTable';
import { WalletsTable } from './components/WalletsTable';

const App = (props) => {
    const [address, setAddress] = useState();
    const [showTable, setShowTable] = useState(false);
    return (
        <>
            <header className='col-4'>
                <h1>Tron Wallets</h1>
            </header>
            <section className="row m-0 container-fluid justify-content-center">
                <div className="addresses-container col-10">
                    <div className="row m-0 justify-content-between">
                        <h2>Your addresses</h2>
                        <form>
                            <p className={"text-center font-weight-bold "+ props.resultClass}>{props.message}</p>
                            <input type='text' placeholder='Type base58 address here' className={props.resultClass} onChange={(e) => setAddress(e.target.value)} />
                            <button type='submit' onClick={(e) => { e.preventDefault(); props.fetchAddress(address) }}>+</button>
                        </form>
                    </div>
                    <div className='addresses-table-container'>
                        {props.addresses.length > 0 && <AddressesTable addresses={props.addresses} removeAddress={props.removeAddress} />}
                    </div>
                    <div className='container-fluid text-center'>
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
                    </div>
                </div>
            </section>
            <section className="row m-0 container-fluid justify-content-center">
                {showTable &&
                    <div className="wallets-table-container col-10">
                        <WalletsTable wallets={props.wallets} sortWallets={props.sortWallets} walletsHolder={props.walletsHolder} searchWallets={props.searchWallets} />
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
        resultClass: state.wallets.resultClass
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddress: (address) => dispatch(fetchAddress(address)),
        removeAddress: (address) => dispatch(removeAddress(address)),
        fetchWallets: (addresses) => dispatch(fetchWallets(addresses)),
        sortWallets: (wallets, operationType) => dispatch(sortWallets(wallets, operationType)),
        searchWallets: (searchText, wallets, walletsHolder) => dispatch(searchWallets(searchText, wallets, walletsHolder))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)