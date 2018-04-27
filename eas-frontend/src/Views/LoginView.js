import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

@inject('rootStore')
@observer
class LoginView extends Component {
  constructor(props) {
    super(props)
    this.authenticationStore = this.props.rootStore.authenticationStore
    this.sidePanel = null
  }

  async componentDidMount () {
    this.authenticationStore.resetInfo()
    this.sidePanel = window.M.Tabs.init(window.$('#authenticationTabs'));
  }

  render () {
    if (this.authenticationStore.rootStore.uiStore.token !== null && this.authenticationStore.rootStore.uiStore.token !== '') {
      return <Redirect to='/map' />
    }

    if (this.authenticationStore.goodToGo) {
      return <Redirect to='/map' />
    }

    const LoginPanel = (
      <div style={{font: '1.5em', marginLeft: '5%', marginRight: '5%'}}>
        <form>
          <div className="row" style={{marginTop: '45px'}}>
            <div className="input-field col s8 offset-s2">
              <input value={this.authenticationStore.username} onChange={(e) => this.authenticationStore.updateInfo(e)} placeholder="Enter your username here" id="username" type="text"/>
              <label className="active" htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s8 offset-s2">
              <input value={this.authenticationStore.password} onChange={(e) => this.authenticationStore.updateInfo(e)} placeholder="Password" id="password" type="password"/>
              <label className="active" htmlFor="password">Password</label>
            </div>
          </div>
        </form>
        <div className="row">
          <button onClick={() => this.authenticationStore.loginUser()} className="btn waves-effect waves-light col s3 offset-s8">Sign in
            <i className="material-icons right">send</i>
          </button>
        </div>
      </div>
    )

    const RegisterPanel = (
      <div style={{font: '1.5em', marginLeft: '5%', marginRight: '5%'}}>
        <form>
          <div className="row" style={{marginTop: '45px'}}>
            <div className="input-field col s8 offset-s2">
              <input value={this.authenticationStore.desiredUsername} onChange={(e) => this.authenticationStore.updateInfo(e)} placeholder="Enter your desired username here" id="desiredUsername" type="text"/>
              <label className="active" htmlFor="desiredUsername">Desired Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s8 offset-s2">
              <input value={this.authenticationStore.desiredPassword} onChange={(e) => this.authenticationStore.updateInfo(e)} placeholder="Desired Password" id="desiredPassword" type="password"/>
              <label className="active" htmlFor="desiredPassword">Desired Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s8 offset-s2">
              <input value={this.authenticationStore.desiredPasswordRepeat} onChange={(e) => this.authenticationStore.updateInfo(e)} placeholder="Repeat Desired Password" id="desiredPasswordRepeat" type="password"/>
              <label className="active" htmlFor="desiredPasswordRepeat">Repeat Desired Password</label>
            </div>
          </div>
        </form>
        <div className="row">
          <button className="btn waves-effect waves-light col s3 offset-s8" onClick={() => this.authenticationStore.registerNewUser()} disabled={this.authenticationStore.desiredPassword !== this.authenticationStore.desiredPasswordRepeat || this.authenticationStore.desiredPassword.length < 1}>Register
            <i className="material-icons right">send</i>
          </button>
        </div>
      </div>
    )

    return(
      <div className="container">
        <div className='row' style={{marginTop: '20px'}}>
          <div className='col s12' style={{marginBottom: '0px'}}>
            <h3><b>Get Started Below</b></h3>
          </div>
        </div>

        <div className='container' style={{marginTop: '85px'}}>
          <div className="row">
            <ul id="authenticationTabs" className="tabs z-depth-1 tabs-fixed-width">
              <li className="tab col s6"><a style={{ color: '#322b2b'}} className="active" href="#signin">Sign in</a></li>
              <li className="tab col s6"><a style={{ color: '#322b2b'}} href="#register">Register</a></li>
            </ul>
            <div id="signin" style={{borderRadius: '20px', backgroundColor: '#FFFFFF', paddingBottom: '20px'}} className="col s12">
              {LoginPanel}
            </div>
            <div id="register" style={{borderRadius: '20px', backgroundColor: '#FFFFFF', paddingBottom: '20px'}} className="col s12">
              {RegisterPanel}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default LoginView
