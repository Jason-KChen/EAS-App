import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

@inject('rootStore')
@observer
class AdminDashboard extends Component {
  constructor(props) {
    super(props)
    this.managementStore = this.props.rootStore.managementStore
    this.sidePanel = null
  }

  async componentDidMount () {
    this.sidePanel = window.M.Tabs.init(window.$('#management-tabs'));
    await this.managementStore.fetchNonAdminUsers()
  }

  render () {

    const registeredUsers = this.managementStore.userList.map((name, index) => {
      return (
        <li key={index} className="collection-item"><div>name<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
      )
    })

    return(
      <div className="container">
        <div className='row'>
          <div className='col s12' style={{marginBottom: '0px'}}>
            <h3><b>Admin Management Portal</b></h3>
          </div>
        </div>
        <div className="row" style={{marginBottom: '0px'}}>
          <div className="input-field col s3">
            <button onClick={() => this.props.history.push('/map')} className="waves-effect waves-grey btn-flat black-text">Back to Dashboard</button>
          </div>
        </div>
        <hr/>

        <div className="row" style={{ paddingTop: '10px'}}>
          <div className='col s12'>
            <ul id="management-tabs" className="tabs z-depth-1 tabs-fixed-width">
              <li className="tab col s3"><a style={{ color: '#322b2b'}} className="active" href="#manage-comments-panel">Manage Flag Comments</a></li>
              <li className="tab col s3"><a style={{ color: '#322b2b'}} href="#manage-users-panel">Manage Registered Users</a></li>
            </ul>
            <div id="manage-comments-panel" style={{backgroundColor: '#f7f7f7'}} className="col s12">
              heelo
            </div>
            <div id="manage-users-panel" style={{backgroundColor: '#f7f7f7'}} className="col s12">
              <ul className="collection with-header">
                <li className="collection-header"><h4>Non-Admin Users</h4></li>
                {registeredUsers}
              </ul>
            </div>
          </div>
        </div>


      </div>
    )
  }
}

export default AdminDashboard
