import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css';


@inject('rootStore')
@observer
class SearchView extends Component {
  constructor(props) {
    super(props)
    this.analyticalStore = this.props.rootStore.analyticalStore
    this.sidePanel = null
  }

  async componentDidMount () {
    // window.M.updateTextFields()
  }

  render () {

    //mags

    const magnitudeValue = this.analyticalStore.selectedMagOption === 'magnitude_value' ? (
      <div className="row">
        <div className="input-field col s6 offset-s3">
          <input value={this.analyticalStore.magOptionValue} onChange={(e) => this.analyticalStore.magnitudeOptionValueChange(e)} id="magnitude_value_value" type="number"/>
          <label className="active" htmlFor="magnitude_value_value">Magnitude whole number</label>
        </div>
      </div>
    ): null

    const magnitudeRange = this.analyticalStore.selectedMagOption === 'magnitude_range' ? (
      <div className="row">
        <div className="input-field col s4 offset-s2">
          <input value={this.analyticalStore.magOptionRangeFrom} onChange={(e) => this.analyticalStore.magnitudeOptionRangeFromChange(e)} id="magnitude_value_range_1" type="number"/>
          <label className="active" htmlFor="magnitude_value_range_1">From Magnitude</label>
        </div>
        <div className="input-field col s4 offset-s2">
          <input value={this.analyticalStore.magOptionRangeTo} onChange={(e) => this.analyticalStore.magnitudeOptionRangeToChange(e)} id="magnitude_value_range_2" type="number"/>
          <label className="active" htmlFor="magnitude_value_range_2">To Magnitude</label>
        </div>
      </div>
    ): null

    // dates

    const dateValue = this.analyticalStore.selectedDateOption === 'date_value' ? (
      <div className="row">
        <div className="input-field col s6 offset-s3">
          <input value={this.analyticalStore.dateOptionValue} onChange={(e) => this.analyticalStore.dateOptionValueChange(e)} id="date_value" type="text" className="datepicker"/>
          <label className="active" htmlFor="date_value">Date</label>
        </div>
        <DatePicker/>

      </div>
    ): null

    const dateRange = this.analyticalStore.selectedDateOption === 'date_range' ? (
      <div className="row">
        <div className="input-field col s4 offset-s2">
          <input value={this.analyticalStore.dateOptionRangeFrom} onChange={(e) => this.analyticalStore.dateOptionRangeFromChange(e)} id="date_range_1" type="text" className="datepicker"/>
          <label className="active" htmlFor="date_range_1">From Date</label>
        </div>
        <div className="input-field col s4 offset-s2">
          <input value={this.analyticalStore.dateOptionRangeTo} onChange={(e) => this.analyticalStore.dateOptionRangeToChange(e)} id="date_range_2" type="text" className="datepicker"/>
          <label className="active" htmlFor="date_range_2">To Date</label>
        </div>
      </div>
    ): null




    return(
      <div className="container">
        <div className='row' style={{marginBottom: '0px'}}>
          <div className='col s12' style={{marginBottom: '0px'}}>
            <h4><b>Search & Analytics</b></h4>
          </div>
        </div>
        <div className="row" style={{marginBottom: '0px'}}>
          <div className="input-field col s3">
            <button onClick={() => this.props.history.push('/map')} className="waves-effect waves-grey btn-flat black-text">Back to Dashboard</button>
          </div>
        </div>
        <hr/>

        <div>
          <form>
            <div className="row">
              <div className="col s3">
                <p>Search by Magnitude</p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="m1" name="mag" value="magnitude_none" onChange={(e) => this.analyticalStore.magnitudeOptionChange(e)} type="radio" checked={this.analyticalStore.selectedMagOption === 'magnitude_none'}/>
                    <span htmlFor="m1">None</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="m2" name="mag" value="magnitude_value" onChange={(e) => this.analyticalStore.magnitudeOptionChange(e)} type="radio" checked={this.analyticalStore.selectedMagOption === 'magnitude_value'}/>
                    <span htmlFor="m2">Value</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="m3" name="mag" value="magnitude_range" onChange={(e) => this.analyticalStore.magnitudeOptionChange(e)} type="radio" checked={this.analyticalStore.selectedMagOption === 'magnitude_range'}/>
                    <span htmlFor="m3">Range</span>
                  </label>
                </p>
              </div>
            </div>
            {magnitudeValue}
            {magnitudeRange}
          </form>
          <form>
            <div className="row">
              <div className="col s3">
                <p>Search by Date</p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="d1" value="date_none" name="date" type="radio" onChange={(e) => this.analyticalStore.dateOptionChange(e)} checked={this.analyticalStore.selectedDateOption === 'date_none'}/>
                    <span htmlFor="d1">None</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="d2" value="date_value" name="date" type="radio" onChange={(e) => this.analyticalStore.dateOptionChange(e)} checked={this.analyticalStore.selectedDateOption === 'date_value'}/>
                    <span htmlFor="d2">Value</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="d3" value="date_range" name="date" type="radio" onChange={(e) => this.analyticalStore.dateOptionChange(e)} checked={this.analyticalStore.selectedDateOption === 'date_range'}/>
                    <span htmlFor="d3">Range</span>
                  </label>
                </p>
              </div>
            </div>
            {dateValue}
            {dateRange}
          </form>
          <form>
            <div className="row">
              <div className="col s3">
                <p>Search by Country</p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="c1" name="country" value='country_none' type="radio" onChange={(e) => this.analyticalStore.countryOptionChange(e)} checked={this.analyticalStore.selectedCountryOption === 'country_none'}/>
                    <span htmlFor="c1">None</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="c2" name="country" value='country_value' type="radio" onChange={(e) => this.analyticalStore.countryOptionChange(e)} checked={this.analyticalStore.selectedCountryOption === 'country_value'}/>
                    <span htmlFor="c2">Value</span>
                  </label>
                </p>
              </div>
            </div>
          </form>
          <form>
            <div className="row">
              <div className="col s3">
                <p>Search by Tsunami</p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="t1" name="tsunami" value="tsunami_either" type="radio" onChange={(e) => this.analyticalStore.tsunamiOptionChange(e)} checked={this.analyticalStore.selectedTsunamiOption === 'tsunami_either'}/>
                    <span htmlFor="t1">Either</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="t2" name="tsunami" value="tsunami_yes" type="radio" onChange={(e) => this.analyticalStore.tsunamiOptionChange(e)} checked={this.analyticalStore.selectedTsunamiOption === 'tsunami_yes'}/>
                    <span htmlFor="t2">Yes</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="t3" name="tsunami" value="tsunami_no" type="radio" onChange={(e) => this.analyticalStore.tsunamiOptionChange(e)} checked={this.analyticalStore.selectedTsunamiOption === 'tsunami_no'}/>
                    <span htmlFor="t3">No</span>
                  </label>
                </p>
              </div>
            </div>
          </form>
          <form>
            <div className="row">
              <div className="col s3">
                <p>Search by Status</p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="s1" name="status" type="radio" value="status_either" onChange={(e) => this.analyticalStore.statusOptionChange(e)} checked={this.analyticalStore.selectedStatusOption === 'status_either'}/>
                    <span htmlFor="s1">Either</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="s2" name="status" type="radio" value="status_automatic" onChange={(e) => this.analyticalStore.statusOptionChange(e)} checked={this.analyticalStore.selectedStatusOption === 'status_automatic'}/>
                    <span htmlFor="s2">Automatic</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="s3" name="status" type="radio" value="status_reviewed" onChange={(e) => this.analyticalStore.statusOptionChange(e)} checked={this.analyticalStore.selectedStatusOption === 'status_reviewed'}/>
                    <span htmlFor="s3">Reviewed</span>
                  </label>
                </p>
              </div>
            </div>
          </form>
          <form>
            <div className="row">
              <div className="col s3">
                <p>Search by ID</p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="i1" name="id" value="id_none" type="radio" onChange={(e) => this.analyticalStore.idOptionChange(e)} checked={this.analyticalStore.selectedIdOption === 'id_none'}/>
                    <span htmlFor="i1">None</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="i2" name="id" value="id_value" type="radio" onChange={(e) => this.analyticalStore.idOptionChange(e)} checked={this.analyticalStore.selectedIdOption === 'id_value'}/>
                    <span htmlFor="i2">Value</span>
                  </label>
                </p>
              </div>
            </div>
          </form>
        </div>
        <hr/>

      </div>
    )
  }
}

export default SearchView
