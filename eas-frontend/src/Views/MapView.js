import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


@inject('rootStore')
@observer
class MapView extends Component {
  constructor (props) {
    super(props)
    // this.gMapStore = this.props.rootStore.gMapStore
    this.lat = 39.8283459
    this.long = -98.5794797
    this.sidePanel = null
  }

  componentDidMount () {
    this.sidePanel = window.M.Tabs.init(window.$('#info-tabs'));
  }


  render () {

    const Gmap = withScriptjs(withGoogleMap((props) =>
      <GoogleMap defaultZoom={4} defaultCenter={{ lat: this.lat, lng: this.long }}>
        {/*{markers}*/}
      </GoogleMap>))

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
            <a className="waves-effect waves-teal btn-flat" style={{ marginRight: '10px'}}><i className="material-icons right">account_box</i>Manage Account</a>
            <a className="waves-effect waves-teal btn-flat"><i className="material-icons right">call_made</i>Logout</a>
          </div>
        </div>
        <hr/>
        <div className="row" style={{ paddingTop: '10px'}}>
          <div className='col s7'>
            <Gmap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmRSmk9xc4SaUx_XD_0waOyzdCgTbi9qA&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
          <div className='col s5'>
            <ul id="info-tabs" className="tabs z-depth-1 tabs-fixed-width">
              <li className="tab col s3"><a style={{ color: '#322b2b'}} className="active" href="#earthquake-info-panel">Detail Info</a></li>
              <li className="tab col s3"><a style={{ color: '#322b2b'}} href="#local-news-panel">Local News</a></li>
              <li className="tab col s3"><a style={{ color: '#322b2b'}} href="#comments-panel">Comments</a></li>
            </ul>
            <div id="earthquake-info-panel" className="col s12 blue">Test 1</div>
            <div id="local-news-panel" className="col s12 red">Test 2</div>
            <div id="comments-panel" className="col s12 green">Test 3</div>
          </div>
        </div>
      </div>
    )
  }
}

export default MapView
