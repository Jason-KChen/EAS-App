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
    await this.managementStore.fetchFlaggedComments()
  }

  render () {

    const flaggedItems = this.managementStore.flaggedComments.map((obj, index) => {
      return (
        <li className="collection-item avatar">
          <div className="row" style={{marginBottom: '0px'}}>
            <div className="col s2">
              <i className="material-icons circle">folder</i>
            </div>
            <div className="col s6">
              <span className="title" style={{fontSize: 'large'}}>{obj.username}</span>
              <p>{obj.content} <br />
                {obj.when} hours ago <br/>
                {/*{obj.time} <br/>*/}
                {/*{obj.now - obj.time}*/}
              </p>
            </div>
            <div className="col s2">
              <a style={{marginTop: '15%'}} href="#!" onClick={() => this.managementStore.unflagSelected(obj.username, obj.time)} className="green-text btn waves-effect waves-grey btn-flat">Unflag</a>

            </div>
            <div className="col s2">
              <a style={{marginTop: '15%'}} href="#!" onClick={() => this.managementStore.deleteSelected(obj.username, obj.time)} className="red-text btn waves-effect waves-grey btn-flat">Delete</a>
            </div>
          </div>
        </li>
      )
    })


    const flaggedCommentsPan = (
      <ul className="collection">
        {flaggedItems}
      </ul>
    )

    const registeredUsers = this.managementStore.userList.map((name, index) => {
      return (
        <li key={index} className="collection-item">
          <div style={{fontSize: 'x-large'}}>
            {name}
            <a href="#!" onClick={() => this.managementStore.deleteUser(name)} className="secondary-content">
              <i className="material-icons">
                block
              </i>
            </a>
          </div>
        </li>
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
              <li className="tab col s3"><a style={{ color: '#322b2b'}} className="active" href="#manage-comments-panel">Manage Flagged Comments</a></li>
              <li className="tab col s3"><a style={{ color: '#322b2b'}} href="#manage-users-panel">Manage Registered Users</a></li>
            </ul>
            <div id="manage-comments-panel" style={{backgroundColor: '#f7f7f7'}} className="col s12">
              {flaggedCommentsPan}
            </div>
            <div id="manage-users-panel" style={{backgroundColor: '#f7f7f7'}} className="col s12">
              <ul className="collection with-header">
                {/*<li className="collection-header"><h8>Non-Admin Users</h8></li>*/}
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
