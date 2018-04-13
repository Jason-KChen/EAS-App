import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import MapView from "./Views/MapView"
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

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
          <Route exact path="/map" component={MapView}/>
        </div>
      </Router>
    )
  }
}

export default MainRouter