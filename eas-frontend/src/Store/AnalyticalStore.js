import { observable, action } from 'mobx'


class AnalyticalStore {
  @observable searchResults = []

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
  @observable dateOptionValue = ''
  @observable dateOptionRangeFrom = ''
  @observable dateOptionRangeTo = ''

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

  @action performSearch () {
    let status = this.constructQuery()

    if (!status) {
      window.toastr.warning('Invalid Parameter')
      return
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
      this.constructedQuery = buildingBlock.join(' and ')
      return true

    } catch (err) {
      console.log(err)
      return false
    }
  }


}

export default AnalyticalStore