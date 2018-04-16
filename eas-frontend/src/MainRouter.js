import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MainDashboard from "./Views/MainDashboard"

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
        </div>
      </Router>
    )
  }
}

export default MainRouter