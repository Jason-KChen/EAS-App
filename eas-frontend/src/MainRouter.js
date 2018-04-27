import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MainDashboard from "./Views/MainDashboard"
import AdminDashboard from "./Views/AdminPortalView"
import DetailedView from "./Views/DetailedView"
import SearchView from "./Views/SearchView"
import LoginView from "./Views/LoginView"

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
          <Route exact path="/detailed-info" component={DetailedView}/>
          <Route exact path="/search" component={SearchView}/>
          <Route exact path="/" component={LoginView}/>
        </div>
      </Router>
    )
  }
}

export default MainRouter