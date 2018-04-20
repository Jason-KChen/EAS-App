import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MainDashboard from "./Views/MainDashboard"
import AdminDashboard from "./Views/AdminPortalView"

@inject('rootStore')
@observer
class MainRouter extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact path="/map" component={MainDashboard}/>
          <Route exact path="/admin" component={AdminDashboard}/>
        </div>
      </Router>
    )
  }
}

export default MainRouter