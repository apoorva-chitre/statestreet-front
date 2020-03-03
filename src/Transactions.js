import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import data from './data/data.json';
import { Link } from 'react-router-dom';

class Transactions extends Component {

    transactions = data.transactions;

    renderTableData() {
      return this.transactions.map((transaction) => {
         const { account, accountName, currencyCode, amount, transactionType } = transaction //destructuring
         return (
            <tr key={account}>
              <td><Link className="link" to={`/transaction/${account}`}>{account}</Link></td>
              <td>{accountName}</td>
              <td>{currencyCode}</td>
              <td>{amount}</td>
              <td>{transactionType}</td>
            </tr>
         )
      })
    }

    renderAccountNameFilter() {

      let uniqueAccountNames = [...new Set(this.transactions.map(item => item.accountName))];

      return uniqueAccountNames.map( (accountName) => {
        return (
          <li key={accountName}>
            <label htmlFor="">
            <input
              type="checkbox"
              name={accountName}
            />
              &nbsp;&nbsp;{ accountName }
            </label>
          </li>
        )
      })
    }

    renderTransactionTypeFilter() {
      let uniqueTransactionTypes = [...new Set(this.transactions.map(item => item.transactionType))];

      return uniqueTransactionTypes.map( (transactionType) => {
        return (
          <li key={transactionType}>
            <label htmlFor="">
            <input
              type="checkbox"
              name={transactionType}
            />
              &nbsp;&nbsp;{ this.toTitleCase(transactionType) }
            </label>
          </li>
        )
      })
    }

    toTitleCase(str) {
      return str.replace(
          /\w\S*/g,
          function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
      );
    }

    render() {
      return (
        <div className="transactions container">
          <h2>My Transactions</h2>
          <hr className="heading"></hr>
          <Row>
              <Col className="filter" sm={3}>
                <h5>Filters</h5>
                <div className="accountFilter">
                  <h6>Account Name</h6>
                  {this.renderAccountNameFilter()}
                </div>
                <div className="transactionFilter">
                  <h6>Transaction Type</h6>
                  {this.renderTransactionTypeFilter()}
                </div>
              </Col>
              <Col sm={9}>
                  <table className="table">
                      <thead>
                          <tr>
                          <th scope="col">ACCOUNT NO.</th>
                          <th scope="col">ACCOUNT NAME</th>
                          <th scope="col">CURRENCY</th>
                          <th scope="col">AMOUNT</th>
                          <th scope="col">TRANSACTION TYPE</th>
                          </tr>
                      </thead>
                      <tbody>
                        {this.renderTableData()}
                      </tbody>
                  </table>
              </Col>
          </Row>
        </div>
      )
    }
    
  }
  
  export default Transactions