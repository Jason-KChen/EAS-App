import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {withScriptjs, withGoogleMap, GoogleMap, Circle } from 'react-google-maps'


@inject('rootStore')
@observer
class AdvancedMapView extends Component {
  constructor (props) {
    super(props)
    this.detailedInfoStore = this.props.rootStore.detailedInfoStore

    // default radius
    this.radius = 1000
  }

  async componentDidMount () {
  }

  render () {

    const circle = <Circle center={{ lat: this.detailedInfoStore.latitude, lng: this.detailedInfoStore.longitude }} radius={this.radius * parseInt(this.detailedInfoStore.selectedEarthquake.get('mag') + 1)}/>

    const Gmap = withScriptjs(withGoogleMap((props) =>
      <GoogleMap defaultZoom={12} defaultCenter={{ lat: this.detailedInfoStore.latitude, lng: this.detailedInfoStore.longitude }}>
        {circle}
      </GoogleMap>))

    return (
      <Gmap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmRSmk9xc4SaUx_XD_0waOyzdCgTbi9qA&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default AdvancedMapView
