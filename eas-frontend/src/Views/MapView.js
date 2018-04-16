import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


@inject('rootStore')
@observer
class MapView extends Component {
  constructor (props) {
    super(props)
    this.mainMapStore = this.props.rootStore.mainMapStore
    this.lat = 45.221753
    this.long = -119.715238
  }

  async componentDidMount () {
    await this.mainMapStore.fetchRecentEarthquakes()
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   return false
  //   if (this.mainMapStore.refreshMap) {
  //     this.mainMapStore.refreshMap = false
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  render () {

    const markers = this.mainMapStore.recentEarthquakes.map((obj, index) => {
      return (<Marker
        onClick={() => this.mainMapStore.pinOnClick(obj.id)}
        key={index}
        position={{ lat: obj.latitude, lng: obj.longitude }}/>)
    })

    const Gmap = withScriptjs(withGoogleMap((props) =>
      <GoogleMap defaultZoom={3} defaultCenter={{ lat: this.lat, lng: this.long }}>
        {markers}
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

export default MapView
