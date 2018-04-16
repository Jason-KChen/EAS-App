import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import Map from './MapView'

@inject('rootStore')
@observer
class MainDashboard extends Component {
  constructor (props) {
    super(props)
    this.mainMapStore = this.props.rootStore.mainMapStore
    this.sidePanel = null
  }

  async componentDidMount () {
    this.sidePanel = window.M.Tabs.init(window.$('#info-tabs'));
  }


  render () {

    const comment_pan = this.mainMapStore.comments.has('ready') ? (
      <p>gg</p>
    ) : (
      <div style={{display: 'block', height: '500px', overflow: 'auto'}}>
        <div className="row" style={{height: '100px'}}>
          <div className="col s12">
            <div className="card horizontal">
              <div className="card-stacked col s6">
                <div className="card-content">
                  <span className="card-title">UserName here</span>
                  <p>
                    Wow
                  </p>
                </div>
                <div className="card-action">
                  <a href="#">Report</a>
                </div>
              </div>
              <div className="card-image col s6">
                <img src="http://materializecss.com/images/sample-1.jpg"/>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{height: '100px'}}>
          <div className="col s12">
            <div className="card horizontal">
              <div className="card-stacked col s6">
                <div className="card-content">
                  <span className="card-title">UserName here</span>
                  <p>
                    Wow
                  </p>
                </div>
                <div className="card-action">
                  <a href="#">Report</a>
                </div>
              </div>
              <div className="card-image col s6">
                <iframe width="220px" height="150px" src="https://www.youtube.com/embed/gSQMGGDbUTU" frameBorder="0" allowFullScreen/>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{height: '100px'}}>
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">User Name here</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                  I am convenient because I require little markup to use effectively.</p>
              </div>
              <div className="card-action">
                <a href="#">Report</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{height: '200px'}}>
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">User Name here</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                  I am convenient because I require little markup to use effectively.</p>
              </div>
              <div className="card-action">
                <a href="#">Report</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    const news_pan = this.mainMapStore.news.has('ready') ? (
      <p>gg</p>
    ) : (
      <p style={{paddingTop: '20px'}}>
        Select a pin to view
      </p>
    )

    const info_pan = this.mainMapStore.selectedEarthquake.has('ready') ? (
      <div style={{paddingTop: '20px', fontSize: '1.3em', textAlign: 'left', paddingLeft: '10px'}}>
        {/*<div className="row">*/}
          {/*UTC Time: {this.mainMapStore.selectedEarthquake.get('utc')}*/}
        {/*</div>*/}
        <div className="row">
          Magnitude: {this.mainMapStore.selectedEarthquake.get('mag')}
        </div>
        <div className="row">
          When: {this.mainMapStore.selectedEarthquake.get('when')} hours ago
        </div>
        <div className="row">
          Local Time: {this.mainMapStore.selectedEarthquake.get('local')}
        </div>
        <div className="row">
          Country: {this.mainMapStore.selectedEarthquake.get('country')}
        </div>
        <div className="row">
          Place: {this.mainMapStore.selectedEarthquake.get('place')}
        </div>
        <div className="row">
          ID: {this.mainMapStore.selectedEarthquake.get('id')}
        </div>
        <div className="row">
          <a href={this.mainMapStore.selectedEarthquake.get('url')} target="_blank">View on USGS</a>
        </div>
      </div>) : (
        <p style={{paddingTop: '20px'}}>
          Select a pin to view
        </p>)

    return (
      <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <div className='row'>
          <div className='col s12'>
            <h3><b>Welcome to Earthquake Analytics System</b></h3>
          </div>
        </div>
        <div className="row">
          <div className="col s3">
            {/*{adminOption}*/}
          </div>
          <div className="col offset-s3 s6">
            <a className="waves-effect waves-teal btn-flat" style={{ marginRight: '10px'}}><i className="material-icons right">search</i>Search</a>
            <a className="waves-effect waves-teal btn-flat" style={{ marginRight: '10px'}}><i className="material-icons right">sort</i>Analytics</a>
            <a className="waves-effect waves-teal btn-flat" onClick={() => this.mainMapStore.refreshMap()} style={{ marginRight: '10px'}}><i className="material-icons right">autorenew</i>Refresh</a>
            <a className="waves-effect waves-teal btn-flat"><i className="material-icons right">call_made</i>Logout</a>
          </div>
        </div>
        <hr/>
        <div className="row" style={{ paddingTop: '10px'}}>
          <div className='col s7'>
            <Map/>
          </div>
          <div className='col s5'>
            <ul id="info-tabs" className="tabs z-depth-1 tabs-fixed-width">
              <li className="tab col s3"><a style={{ color: '#322b2b'}} className="active" href="#earthquake-info-panel">Detail Info</a></li>
              <li className="tab col s3"><a style={{ color: '#322b2b'}} href="#local-news-panel">Local News</a></li>
              <li className="tab col s3"><a style={{ color: '#322b2b'}} href="#comments-panel">Comments</a></li>
            </ul>
            <div id="earthquake-info-panel" style={{backgroundColor: '#f7f7f7'}} className="col s12">
              {info_pan}
            </div>
            <div id="local-news-panel" style={{backgroundColor: '#f7f7f7'}} className="col s12">
              {news_pan}
            </div>
            <div id="comments-panel" style={{backgroundColor: '#f7f7f7'}} className="col s12">
              {comment_pan}
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col s12 m6">
              <div className="card">
                <div className="card-content">
                  <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                </div>
                <div className="card-image">
                  <img src="http://materializecss.com/images/sample-1.jpg"/>
                    <span className="card-title">Card Title</span>
                    <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default MainDashboard
