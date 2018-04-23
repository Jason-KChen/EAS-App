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
    await this.detailedInfoStore.fetchDetailedInfo()
  }


  render () {


    // const userComments = this.mainMapStore.comments.map((object, index) => {
    //   return (
    //     <div key={index} className="col s12">
    //       <div className="card-panel grey lighten-5" style={{
    //         paddingBottom: '5px',
    //         marginBottom: '5px'
    //       }}>
    //         <div className="row" style={{marginBottom: '0px'}}>
    //           <div className="row valign-wrapper" style={{marginBottom: '5px'}}>
    //             <span className="black-text" style={{ marginLeft: '15px'}}>
    //               {object.poster}: {object.content} - {object.when} minutes ago.
    //             </span>
    //           </div>
    //         </div>
    //         <div className="row" style={{marginBottom: '0px'}}>
    //           <div className="col s6 input-field">
    //             <button disabled={object.mediaURL.length === 0} onClick={() => {window.open(object.mediaURL, '_blank').focus()}} className="green-text waves-effect waves-teal btn-flat">{object.mediaURL.length === 0 ? 'Not Available' : 'View Media'}</button>
    //           </div>
    //           <div className="col s6 input-field">
    //             <button disabled={object.flagged} onClick={() => {this.mainMapStore.flagComment(object.poster, object.time, index)}} className="pink-text waves-effect waves-white btn-flat">{object.flagged ? 'Flagged' : 'Flag Comment'}</button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>)
    // })

    return (
      <div className="container">
        <div className='row'>
          <div className='col s12'>
            <h3><b>Detailed View</b></h3>
          </div>
        </div>
        <div className="row" style={{marginBottom: '0px'}}>
          <div className="input-field col s3">
            <button onClick={() => this.props.history.push('/map')} className="waves-effect waves-grey btn-flat black-text">Back to Dashboard</button>
          </div>
        </div>
        <hr/>
        <div className="row" style={{ paddingTop: '10px'}}>
          <div className='col s6'>
            {this.detailedInfoStore.selectedEarthquake.has('ready') ? <AdvancedMap/> : null}
          </div>
        </div>
      </div>

    )
  }
}

export default DetailedView
