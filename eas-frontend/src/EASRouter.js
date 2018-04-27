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
class EASRouter extends Component {
  constructor (props) {
    super(props)
    this.uiStore = this.props.rootStore.uiStore
  }

  render () {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={({history}) => (
        this.uiStore.token === null || this.uiStore.token === ''
          ? <Redirect to='/' />
          : <Component history={history} />
      )} />
    )

    return (
      <Router basename="/">
        <div>
          <PrivateRoute exact path="/map" component={MainDashboard}/>
          <PrivateRoute exact path="/admin" component={AdminDashboard}/>
          <PrivateRoute exact path="/detailed-info" component={DetailedView}/>
          <PrivateRoute exact path="/search" component={SearchView}/>
          <Route exact path="/" render={({history}) => <LoginView history={history} {...this.props}/>}/>
        </div>
      </Router>
    )
  }
}

export default EASRouter
