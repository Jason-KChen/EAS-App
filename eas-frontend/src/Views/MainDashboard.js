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

    const userComments = this.mainMapStore.comments.map((object, index) => {
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
                <button disabled={object.flagged} onClick={() => {this.mainMapStore.flagComment(object.poster, object.time, index)}} className="pink-text waves-effect waves-white btn-flat">{object.flagged ? 'Flagged' : 'Flag Comment'}</button>
              </div>
            </div>
          </div>
        </div>)
    })

    const availableNews = this.mainMapStore.news.map((object, index) => {
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

    const comment_pan = this.mainMapStore.selectedEarthquakeId === null ? (
      <p style={{paddingTop: '20px'}}>
        Select a pin to view
      </p>
    ) : (
      <div> {
        this.mainMapStore.comments.length === 0 ? (
          <p style={{fontSize: '1.5em', paddingTop: '20px'}}>
            No comments available...
          </p>
        ) : (
          <div className="" style={{marginTop: '5px', display: 'block', height: '300px', overflow: 'auto'}}>
            {userComments}
          </div>
        )}
        <div className="row" style={{marginBottom: '0px'}}>
          <div className="input-field col s9">
            <input value={this.mainMapStore.userComment} onChange={(e) => this.mainMapStore.userCommentChange(e)} id="comment_content" type="text" />
            <label className="active" htmlFor="comment_content">Enter Your Comment</label>
          </div>
          <div className="input-field col s3">
            <button className="btn-small waves-effect waves-light" disabled={this.mainMapStore.userComment.length === 0} onClick={() => this.mainMapStore.userCommentOnSubmit()}>Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input value={this.mainMapStore.mediaURL} onChange={(e) => this.mainMapStore.mediaURLChange(e)} id="media_url" type="text" />
            <label className="active" htmlFor="media_url">Optional, Want to share an image? Paste the url here</label>
          </div>
        </div>
      </div>
    )

    const news_pan = this.mainMapStore.selectedEarthquakeId === null ? (
      <p style={{paddingTop: '20px'}}>
        Select a pin to view
      </p>
    ) : (
      <div> {
        this.mainMapStore.news.length === 0 ? (
          <p style={{fontSize: '1.5em', paddingTop: '20px'}}>
            No news available...
          </p>
        ) : (
          <div className="" style={{marginTop: '5px', display: 'block', height: '480px', overflow: 'auto'}}>
            {availableNews}
          </div>
        )}
      </div>
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
      </div>

    )
  }
}

export default MainDashboard
