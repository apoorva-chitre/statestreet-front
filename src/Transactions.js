import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import data from './data/data.json';
import { Link } from 'react-router-dom';

class Transactions extends Component {

    constructor(props) {
      super(props)
      this.state = {
        selectedAccountNames: [],
        selectedTransactionTypes: []
      }
      this.handleAccountFilter = this.handleAccountFilter.bind(this)
      this.handleTransactionType = this.handleTransactionType.bind(this)

    }

    transactions = data.transactions;


    renderTableData() {
      let filteredData;

      if(this.state.selectedTransactionTypes.length || this.state.selectedAccountNames.length) {
        filteredData = this.transactions.filter( 
        item => this.state.selectedAccountNames.includes(item.accountName) || 
        this.state.selectedTransactionTypes.includes(item.transactionType))
      } else {
        filteredData = this.transactions;
      }

      return filteredData.map((transaction) => {
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
              value={accountName}
              onChange={this.handleAccountFilter}
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
              value={transactionType}
              onChange={this.handleTransactionType}
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

    handleAccountFilter(event) {
      if(event.target.checked){
        this.setState({
          selectedAccountNames: this.state.selectedAccountNames.concat([event.target.value])
        })
      } else {
        this.setState({
          selectedAccountNames : this.state.selectedAccountNames.filter(
            function(val) {return val!==event.target.value}
          )
        })
      }
    }

    handleTransactionType(event) {
      if(event.target.checked){
        this.setState({
          selectedTransactionTypes: this.state.selectedTransactionTypes.concat([event.target.value])
        })
      } else {
        this.setState({
          selectedTransactionTypes : this.state.selectedTransactionTypes.filter(
            function(val) {return val!==event.target.value}
          )
        })
      }
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