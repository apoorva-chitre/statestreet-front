import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Transactions from './Transactions'
import Transaction from './Transaction'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

const routing = (
    <Router>
      <Switch>
        <Route exact path="/" component={Transactions} />
        <Route path="/transaction/:account" component={Transaction} />
      </Switch>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'))