import React, { useState } from 'react';
import './style/main.scss';
import 'bootstrap';
import { connect } from 'react-redux';
import { fetchAddress, removeAddress } from './redux/actions/wallets';
import { AddressesTable } from './components/AddressesTable';

const App = (props) => {
    const [address, setAddress] = useState();
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
                            <p className="text-center font-weight-bold">{props.message}</p>
                            <input type='text' onChange={(e) => setAddress(e.target.value)} />
                            <button type='submit' onClick={(e) => { e.preventDefault(); props.fetchAddress(address)}}>+</button>
                        </form>
                    </div>
                    <div className='addresses-table-container'>
                        {props.addresses.length > 0 && <AddressesTable addresses={props.addresses} removeAddress={props.removeAddress}/>}
                    </div>
                    <div className='container-fluid text-center'>
                    <button className='font-weight-bold'>Generate table</button>
                    </div>
                </div>
            </section>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        message: state.wallets.messageAdd,
        addresses: state.wallets.addresses

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddress: (address) => dispatch(fetchAddress(address)),
        removeAddress: (address) => dispatch(removeAddress(address))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)