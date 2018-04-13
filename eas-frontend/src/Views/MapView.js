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
            <h1><b>Welcome to Earthquake Analytics System</b></h1>
          </div>
        </div>
        <div className="row">
          <div className='col s7'>
            <Gmap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmRSmk9xc4SaUx_XD_0waOyzdCgTbi9qA&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
          <div className='col s5'>
            <h3>A in 4400X plz</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default MapView
