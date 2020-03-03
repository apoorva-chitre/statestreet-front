import React from 'react'
import data from './data/data.json';

class Transaction extends React.Component {

    transactions = data.transactions;
    transaction;

    constructor(props) {
        super(props)
        this.componentDidMount();
    }

    componentDidMount() {
        this.transaction = this.transactions.find( 
            element => element.account === this.props.match.params.account
        );
    }

    render() {
        return (
            <div className="transaction container">
                <h2>Transaction {this.transaction.account}</h2>
                <hr className="heading"></hr>
                <p>
                   <b>Account No. :</b>{this.transaction.account}<br />
                   <b>Account Name :</b>{this.transaction.accountName}<br />
                   <b>Currency Code :</b>{this.transaction.currencyCode}<br />
                   <b>Amount :</b>{this.transaction.amount}<br />
                   <b>Transaction Type :</b>{this.transaction.transactionType}<br />
                </p>
            </div>
        )
    }
}
export default Transaction