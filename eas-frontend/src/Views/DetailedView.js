import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import AdvancedMap from './AdvancedMapView'

@inject('rootStore')
@observer
class DetailedView extends Component {
  constructor (props) {
    super(props)
    this.detailedInfoStore = this.props.rootStore.detailedInfoStore
    this.sidePanel = null
  }

  async componentDidMount () {
    this.sidePanel = window.M.Tabs.init(window.$('#detail-tabs'));

    if (this.detailedInfoStore.selectedEarthquakeId === null || this.detailedInfoStore.selectedEarthquakeId === '') {
      this.props.history.push('/map')
    } else {
      await this.detailedInfoStore.fetchDetailedInfo()
      await this.detailedInfoStore.fetchNews()
      await this.detailedInfoStore.fetchComments()
    }
  }


  render () {

    const availableNews = this.detailedInfoStore.news.map((object, index) => {
      return (
        <div key={index} className="col s12">
          <div className="card-panel grey lighten-5" style={{
            paddingBottom: '5px',
            marginBottom: '5px'
          }}>
            <div className="row" style={{marginBottom: '0px'}}>
              <div className="row valign-wrapper" style={{marginBottom: '5px'}}>
                <span className="black-text" style={{ marginLeft: '10%', marginRight: '10%', font: '1.5em'}}>
                  {object.title}
                </span>
              </div>
            </div>
            <div className="row" style={{marginBottom: '0px'}}>
              <div className="col s12 input-field">
                <button onClick={() => {window.open(object.url, '_blank').focus()}} className="green-text waves-effect waves-teal btn-flat">View Article</button>
              </div>
            </div>
          </div>
        </div>)
    })

    const news_pan = !this.detailedInfoStore.selectedEarthquake.has('ready') ? (
      <p style={{paddingTop: '20px'}}>
        Loading
      </p>
    ) : (
      <div> {
        this.detailedInfoStore.news.length === 0 ? (
          <p style={{fontSize: '1.5em', paddingTop: '20px'}}>
            No news available...
          </p>
        ) : (
          <div className="" style={{marginTop: '5px', display: 'block', height: '460px', overflow: 'auto'}}>
            {availableNews}
          </div>
        )}
      </div>
    )

    const info_pan = this.detailedInfoStore.selectedEarthquake.has('ready') ? (
      <div style={{paddingTop: '20px', fontSize: '1em', textAlign: 'left', paddingLeft: '10px'}}>
        <div className="row">
          ID: {this.detailedInfoStore.selectedEarthquake.get('id')}
        </div>
        <div className="row">
          Magnitude: {this.detailedInfoStore.selectedEarthquake.get('mag')}
        </div>
        <div className="row">
          Depth: {this.detailedInfoStore.selectedEarthquake.get('depth')} km
        </div>
        <div className="row">
          Status: {this.detailedInfoStore.selectedEarthquake.get('status')}
        </div>
        <div className="row">
          Tsunami: {this.detailedInfoStore.selectedEarthquake.get('tsunami') ? 'Yes' : 'No'}
        </div>
        <div className="row">
          Magnitude Type: {this.detailedInfoStore.selectedEarthquake.get('magnitude_type')}
        </div>
        <div className="row">
          Local Time: {this.detailedInfoStore.selectedEarthquake.get('local')}
        </div>
        <div className="row">
          Country: {this.detailedInfoStore.selectedEarthquake.get('country')}
        </div>
        <div className="row">
          Place: {this.detailedInfoStore.selectedEarthquake.get('place')}
        </div>
        <div className="row">
          <a style={{fontSize: '14px', paddingLeft: '0px'}} className="btn-flat" href={this.detailedInfoStore.selectedEarthquake.get('url')} target="_blank">View on USGS</a>
        </div>

      </div>) : (
      <p style={{paddingTop: '20px'}}>
        Loading
      </p>)

    const userComments = this.detailedInfoStore.comments.map((object, index) => {
      return (
        <div key={index} className="col s12">
          <div className="card-panel grey lighten-5" style={{
            paddingBottom: '5px',
            marginBottom: '5px'
          }}>
            <div className="row" style={{marginBottom: '0px'}}>
              <div className="row valign-wrapper" style={{marginBottom: '5px'}}>
                <span className="black-text" style={{ marginLeft: '15px'}}>
                  {object.poster}: {object.content} - {object.when} minutes ago.
                </span>
              </div>
            </div>
            <div className="row" style={{marginBottom: '0px'}}>
              <div className="col s6 input-field">
                <button disabled={object.mediaURL.length === 0} onClick={() => {window.open(object.mediaURL, '_blank').focus()}} className="green-text waves-effect waves-teal btn-flat">{object.mediaURL.length === 0 ? 'Not Available' : 'View Media'}</button>
              </div>
              <div className="col s6 input-field">
                <button disabled={object.flagged} onClick={() => {this.detailedInfoStore.flagComment(object.poster, object.time, index)}} className="pink-text waves-effect waves-white btn-flat">{object.flagged ? 'Flagged' : 'Flag Comment'}</button>
              </div>
            </div>
          </div>
        </div>)
    })

    const comment_pan = !this.detailedInfoStore.selectedEarthquake.has('ready') ? (
      <p style={{paddingTop: '20px'}}>
        Loading
      </p>
    ) : (
      <div> {
        this.detailedInfoStore.comments.length === 0 ? (
          <p style={{fontSize: '1.5em', paddingTop: '20px'}}>
            No comments available...
          </p>
        ) : (
          <div className="" style={{marginTop: '5px', display: 'block', height: '480px', overflow: 'auto'}}>
            {userComments}
          </div>
        )}
      </div>
    )

    return (
      <div className="container">
        <div className='row'>
          <div className='col s12'>
            <h3><b>Detailed View</b></h3>
          </div>
        </div>
        <div className="row" style={{marginBottom: '0px'}}>
          <div className="input-field col s3">
            <button onClick={() => this.props.history.goBack()} className="waves-effect waves-grey btn-flat black-text">Back</button>
          </div>
        </div>
        <hr/>
        <div className="row" style={{ paddingTop: '10px'}}>
          <div className='col s6'>
            {this.detailedInfoStore.selectedEarthquake.has('ready') ? <AdvancedMap/> : null}
          </div>
          <div className="col s6">
            <ul id="detail-tabs" className="tabs z-depth-1 tabs-fixed-width">
              <li className="tab col s3"><a style={{ color: '#322b2b'}} className="active" href="#detailed_info_panel">Detail Info</a></li>
              <li className="tab col s3"><a style={{ color: '#322b2b'}} href="#local-news-panel">Local News</a></li>
              <li className="tab col s3"><a style={{ color: '#322b2b'}} href="#comments-panel">Comments</a></li>
            </ul>
            <div id="detailed_info_panel" style={{backgroundColor: '#f7f7f7'}} className="col s12">
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
      </div>

    )
  }
}

export default DetailedView
