import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

@inject('rootStore')
@observer
class SearchView extends Component {
  constructor(props) {
    super(props)
    this.analyticalStore = this.props.rootStore.analyticalStore
    this.sidePanel = null
  }

  async componentDidMount () {
    this.sidePanel = window.M.Tabs.init(window.$('#management-tabs'));
  }

  render () {

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
                    <input id="m1" name="mag" type="radio" checked/>
                    <span htmlFor="m1">None</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="m2" name="mag" type="radio" />
                    <span htmlFor="m2">Value</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="m3" name="mag" type="radio" />
                    <span htmlFor="m3">Range</span>
                  </label>
                </p>
              </div>
            </div>
          </form>
          <form>
            <div className="row">
              <div className="col s3">
                <p>Search by Date</p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="d1" name="date" type="radio" checked/>
                    <span htmlFor="d1">None</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="d2" name="date" type="radio" />
                    <span htmlFor="d2">Value</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="d3" name="date" type="radio" />
                    <span htmlFor="d3">Range</span>
                  </label>
                </p>
              </div>
            </div>
          </form>
          <form>
            <div className="row">
              <div className="col s3">
                <p>Search by Country</p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="c1" name="country" type="radio" checked/>
                    <span htmlFor="c1">None</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="c2" name="country" type="radio" />
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
                    <input id="t1" name="tsunami" type="radio" checked/>
                    <span htmlFor="t1">Either</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="t2" name="tsunami" type="radio" />
                    <span htmlFor="t2">Yes</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="t3" name="tsunami" type="radio" />
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
                    <input id="s1" name="status" type="radio" checked/>
                    <span htmlFor="s1">Either</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="s2" name="status" type="radio" />
                    <span htmlFor="s2">Automatic</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="s3" name="status" type="radio" />
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
                    <input id="i1" name="id" type="radio" checked/>
                    <span htmlFor="i1">None</span>
                  </label>
                </p>
              </div>
              <div className="col s3">
                <p>
                  <label>
                    <input id="i2" name="id" type="radio" />
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
