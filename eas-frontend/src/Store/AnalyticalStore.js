import { observable, action } from 'mobx'
import moment from 'moment'


class AnalyticalStore {
  @observable searchResults = []
  @observable showFiltered = false
  @observable showAnalytics = false

  // grouped
  // Mag
  @observable selectedMagOption = 'magnitude_none'
  @observable magOptionValue = 0
  @observable magOptionRangeFrom = 0
  @observable magOptionRangeTo = 0

  // depth
  @observable selectedDepthOption = 'depth_none'
  @observable depthOptionValue = 0
  @observable depthOptionRangeFrom = 0
  @observable depthOptionRangeTo = 0

  // Date
  @observable selectedDateOption = 'date_none'
  @observable dateOptionValue = null
  @observable dateOptionRangeFrom = null
  @observable dateOptionRangeTo = null

  // country
  @observable selectedCountryOption = 'country_none'
  @observable countryOptionValue = 'US'

  // tsunami
  @observable selectedTsunamiOption = 'tsunami_either'

  // status
  @observable selectedStatusOption = 'status_either'

  // id
  @observable selectedIdOption = 'id_none'
  @observable idOptionValue = ''

  // query
  @observable constructedQuery = ''

  // search
  @observable filterKeyword = ''
  @observable filteredSearchResults = []

  constructor (rootStore) {
    this.rootStore = rootStore
    this.BASE = 'http://localhost:4000'
  }

  @action depthOptionChange (e) {
    this.selectedDepthOption = e.target.value
  }

  @action depthOptionValueChange (e) {
    this.depthOptionValue = e.target.value
  }

  @action depthOptionRangeFromChange (e) {
    this.depthOptionRangeFrom = e.target.value
  }

  @action depthOptionRangeToChange (e) {
    this.depthOptionRangeTo = e.target.value
  }

  @action idOptionValueChange (e) {
    this.idOptionValue = e.target.value
  }

  @action countryOptionValueChange (e) {
    this.countryOptionValue = e.target.value
  }

  @action dateOptionRangeToChange (e) {
    this.dateOptionRangeTo = e
  }

  @action dateOptionRangeFromChange (e) {
    this.dateOptionRangeFrom = e
  }

  @action dateOptionValueChange (e) {
    this.dateOptionValue = e
  }

  @action magnitudeOptionRangeToChange (e) {
    this.magOptionRangeTo = e.target.value
  }

  @action magnitudeOptionRangeFromChange (e) {
    this.magOptionRangeFrom = e.target.value
  }

  @action magnitudeOptionValueChange (e) {
    this.magOptionValue = e.target.value
  }

  @action magnitudeOptionChange (e) {
    this.selectedMagOption = e.target.value
  }

  @action dateOptionChange (e) {
    this.selectedDateOption = e.target.value
  }

  @action countryOptionChange (e) {
    this.selectedCountryOption = e.target.value
  }

  @action tsunamiOptionChange (e) {
    this.selectedTsunamiOption = e.target.value
  }

  @action statusOptionChange (e) {
    this.selectedStatusOption = e.target.value
  }

  @action idOptionChange (e) {
    this.selectedIdOption = e.target.value
  }

  @action async performSearch () {
    this.showAnalytics = false
    this.showFiltered = false
    this.filterKeyword = ''
    this.searchResults.clear()
    this.filteredSearchResults.clear()

    let status = this.constructQuery()

    if (!status) {
      window.toastr.warning('Invalid Parameter')
      return
    }

    let qStatus = await this.sendQuery()

    if (!qStatus) {
      window.toastr.warning('Failed to perform search')
    } else {
      this.showFiltered = true
    }
  }

  @action async sendQuery () {
    try {
      let res = await fetch(this.BASE + '/api/analytics/search?condition=' + this.constructedQuery, {
        Method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      let data = await res.json()

      if (data.status) {
        this.searchResults.clear()
        this.filteredSearchResults.clear()

        this.searchResults = data.data.map((obj) => {
          let temp = {}
          temp['place'] = obj.place
          temp['id'] = obj.id

          let timeStamp = new Date(parseInt(obj.time))
          temp['time'] = (timeStamp.getMonth() + 1).toString() + '-' + timeStamp.getDate().toString() + '-' + timeStamp.getFullYear().toString()

          return temp
        })
        this.filteredSearchResults = this.searchResults
        return true

      } else {
        return false
      }
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @action constructQuery () {
    let buildingBlock = []

    try {
      switch (this.selectedMagOption) {
        case 'magnitude_none':
          break
        case 'magnitude_value':
          buildingBlock.push('(mag::integer)=' + parseInt(this.magOptionValue.toString()))
          break
        case 'magnitude_range':
          if (this.magOptionRangeFrom > this.magOptionRangeTo) {
            return false
          }

          buildingBlock.push('mag BETWEEN ' + this.magOptionRangeFrom.toString() + ' AND ' + this.magOptionRangeTo.toString())
          break
      }

      switch (this.selectedDepthOption) {
        case 'depth_none':
          break
        case 'depth_value':
          if (isNaN(this.depthOptionValue)) {
            return false
          }


          buildingBlock.push('(depth::integer)=' + parseInt(this.depthOptionValue.toString()))
          break
        case 'depth_range':
          if (isNaN(this.depthOptionRangeFrom) || isNaN(this.depthOptionRangeTo)) {
            return false
          }

          if (this.depthOptionRangeFrom > this.depthOptionRangeTo) {
            return false
          }

          buildingBlock.push('depth BETWEEN ' + this.depthOptionRangeFrom.toString() + ' AND ' + this.depthOptionRangeTo.toString())
          break
      }

      switch (this.selectedDateOption) {
        // need to do more validation here
        case 'date_none':
          break
        case 'date_value':

          let dayAfter = moment(this.dateOptionValue).add(1, 'days')

          buildingBlock.push('time BETWEEN ' + (new Date(this.dateOptionValue)).getTime() + ' AND ' + dayAfter.valueOf())
          break
        case 'date_range':
          if (this.dateOptionRangeFrom > this.dateOptionRangeTo) {
            return false
          }

          buildingBlock.push('time BETWEEN ' + (new Date(this.dateOptionRangeFrom)).getTime() + ' AND ' + (new Date(this.dateOptionRangeTo)).getTime())
          break
      }

      switch (this.selectedCountryOption) {
        case 'country_none':
          break
        case 'country_value':
          if (this.countryOptionValue.length < 2) {
            return false
          }

          buildingBlock.push("country='" + this.countryOptionValue.toUpperCase() + "'")

          break
      }

      switch (this.selectedTsunamiOption) {
        case 'tsunami_either':
          break
        case 'tsunami_yes':
          buildingBlock.push('tsunami=1')

          break
        case 'tsunami_no':
          buildingBlock.push('tsunami=0')

          break
      }

      switch (this.selectedStatusOption) {
        case 'status_either':
          break
        case 'status_automatic':
          buildingBlock.push("status='automatic'")

          break
        case 'status_reviewed':
          buildingBlock.push("status='reviewed'")

          break
      }

      switch (this.selectedIdOption) {
        case 'id_none':
          break
        case 'id_value':
          if (this.idOptionValue.length < 5) {
            return false
          }

          buildingBlock.push("id='" + this.idOptionValue + "'")

          break
      }

      this.constructedQuery = buildingBlock.join(' and ')
      return true

    } catch (err) {
      console.log(err)
      return false
    }
  }

  @action filterKeywordChange (e) {
    if (e.target.value !== null) {
      this.filterKeyword = e.target.value
    } else {
      this.filterKeyword = ''
    }

    this.performFilter()
  }

  @action performFilter () {
    if (this.filterKeyword.length === 0 || this.filterKeyword === null) {
      return
    }

    let lowerCaseKeyword = this.filterKeyword.toLowerCase()
    this.filteredSearchResults = this.searchResults.filter((obj, index) => {
      return (obj.place.toLowerCase() + ' | ' + obj.time.toLowerCase()).includes(lowerCaseKeyword)
    })
  }


}

export default AnalyticalStore