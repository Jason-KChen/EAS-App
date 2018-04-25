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

    const showConstructedQuery = this.analyticalStore.rootStore.uiStore.isAdmin ? (
      <div className="row">
        ADMIN GOD MODE: {this.analyticalStore.constructedQuery}
      </div>
    ) : null

    // const filterResultSearchBar = ()

    const filteringEntryView = this.analyticalStore.filteredSearchResults.map((obj, index) => {
      return (
        <li key={index} className="collection-item">
          <div className="row" style={{marginBottom: '0px'}}>
            <div style={{fontSize: 'x-large', paddingTop: '7px'}} className="col s10">
              {obj.place} | {obj.time}
            </div>
            <div className="col s2">
              <button onClick={() => {
                this.analyticalStore.rootStore.detailedInfoStore.selectedEarthquakeId = obj.id
                this.props.history.push('/detailed-info')
              }} className="btn"> View Details
              </button>

            </div>
          </div>
        </li>
      )
    })

    const filteringResultsView = this.analyticalStore.showFiltered ? (
      <div>
        <div>
          <nav>
            <div className="nav-wrapper">
              <form>
                <div className="input-field">
                  <input value={this.analyticalStore.filterKeyword} onChange={(e) => this.analyticalStore.filterKeywordChange(e)} placeholder="Search by Location(City), Country(State) or MM-DD-YYYY" className="white-text" id="search" type="search" style={{backgroundColor: 'teal'}}/>
                  <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                  {/*<i className="material-icons">close</i>*/}
                </div>
              </form>
            </div>
          </nav>
        </div>

        <ul className="collection">
          {this.analyticalStore.searchResults.length === 0 ? <li className="collection-item" style={{fontSize: 'x-large'}}>Found 0 records</li> : filteringEntryView}
        </ul>
      </div>
    ) : null

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
        <div className="col s6 offset-s3">
          {/*<input value={this.analyticalStore.dateOptionValue} onChange={(e) => this.analyticalStore.dateOptionValueChange(e)} id="date_value" type="text" className="datepicker"/>*/}
          <DatePicker selected={this.analyticalStore.dateOptionValue} onChange={(e) => this.analyticalStore.dateOptionValueChange(e)} id="date_value"/>
          <label className="active" htmlFor="date_value">Date</label>
        </div>

      </div>
    ): null

    const dateRange = this.analyticalStore.selectedDateOption === 'date_range' ? (
      <div className="row">
        <div className="col s4 offset-s2">
          {/*<input value={this.analyticalStore.dateOptionRangeFrom} onChange={(e) => this.analyticalStore.dateOptionRangeFromChange(e)} id="date_range_1" type="text" className="datepicker"/>*/}
          <DatePicker selected={this.analyticalStore.dateOptionRangeFrom} onChange={(e) => this.analyticalStore.dateOptionRangeFromChange(e)} id="date_range_1"/>
          <label className="active" htmlFor="date_range_1">From Date</label>
        </div>
        <div className="col s4 offset-s2">
          {/*<input value={this.analyticalStore.dateOptionRangeTo} onChange={(e) => this.analyticalStore.dateOptionRangeToChange(e)} id="date_range_2" type="text" className="datepicker"/>*/}
          <DatePicker selected={this.analyticalStore.dateOptionRangeTo} onChange={(e) => this.analyticalStore.dateOptionRangeToChange(e)} id="date_range_2"/>
          <label className="active" htmlFor="date_range_2">To Date</label>
        </div>
      </div>
    ): null

    // country
    const countryValue = this.analyticalStore.selectedCountryOption === 'country_value' ? (
      <div className="row">
        <div className="input-field col s6 offset-s3">
          <input value={this.analyticalStore.countryOptionValue} onChange={(e) => this.analyticalStore.countryOptionValueChange(e)} id="country_value" type="text"/>
          <label className="active" htmlFor="country_value">Country ISO code</label>
        </div>
      </div>
    ) : null

    // id
    const idValue = this.analyticalStore.selectedIdOption === 'id_value' ? (
      <div className="row">
        <div className="input-field col s6 offset-s3">
          <input value={this.analyticalStore.idOptionValue} onChange={(e) => this.analyticalStore.idOptionValueChange(e)} id="id_value" type="text"/>
          <label className="active" htmlFor="id_value">Earthquake ID</label>
        </div>
      </div>
    ) : null

    // depth
    const depthValue = this.analyticalStore.selectedDepthOption === 'depth_value' ? (
      <div className="row">
        <div className="input-field col s6 offset-s3">
          <input value={this.analyticalStore.depthOptionValue} onChange={(e) => this.analyticalStore.depthOptionValueChange(e)} id="depth_value" type="number"/>
          <label className="active" htmlFor="depth_value">Depth whole number</label>
        </div>
      </div>
    ): null

    const depthRange = this.analyticalStore.selectedDepthOption === 'depth_range' ? (
      <div className="row">
        <div className="input-field col s4 offset-s2">
          <input value={this.analyticalStore.depthOptionRangeFrom} onChange={(e) => this.analyticalStore.depthOptionRangeFromChange(e)} id="depth_range1" type="number"/>
          <label className="active" htmlFor="depth_range1">From Depth</label>
        </div>
        <div className="input-field col s4 offset-s2">
          <input value={this.analyticalStore.depthOptionRangeTo} onChange={(e) => this.analyticalStore.depthOptionRangeToChange(e)} id="depth_range2" type="number"/>
          <label className="active" htmlFor="depth_range2">To Depth</label>
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
                <p>Search by Depth</p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="depth1" name="depth" value="depth_none" onChange={(e) => this.analyticalStore.depthOptionChange(e)} type="radio" checked={this.analyticalStore.selectedDepthOption === 'depth_none'}/>
                    <span htmlFor="depth1">None</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="depth2" name="depth" value="depth_value" onChange={(e) => this.analyticalStore.depthOptionChange(e)} type="radio" checked={this.analyticalStore.selectedDepthOption === 'depth_value'}/>
                    <span htmlFor="depth2">Value</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="depth3" name="depth" value="depth_range" onChange={(e) => this.analyticalStore.depthOptionChange(e)} type="radio" checked={this.analyticalStore.selectedDepthOption === 'depth_range'}/>
                    <span htmlFor="depth3">Range</span>
                  </label>
                </p>
              </div>
            </div>
            {depthValue}
            {depthRange}
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
            {countryValue}
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
            {idValue}
          </form>
        </div>
        <div className="row">
          <div className="col s6">
            <button onClick={() => this.analyticalStore.performSearch()} className="waves-effect waves-grey btn-flat green-text">Search</button>
          </div>
          <div className="col s6">
            <button className="waves-effect waves-grey btn-flat green-text">Aggregate</button>
          </div>
        </div>
        <hr/>
        {showConstructedQuery}
        {filteringResultsView}

      </div>
    )
  }
}

export default SearchView
