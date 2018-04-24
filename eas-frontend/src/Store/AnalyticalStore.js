import { observable, action } from 'mobx'


class AnalyticalStore {
  @observable searchResults = []

  // grouped
  // Mag
  @observable selectedMagOption = 'magnitude_none'
  @observable magOptionValue = 0
  @observable magOptionRangeFrom = 0
  @observable magOptionRangeTo = 0

  // Date
  @observable selectedDateOption = 'date_none'
  @observable dateOptionValue = ''
  @observable dateOptionRangeFrom = ''
  @observable dateOptionRangeTo = ''


  @observable selectedCountryOption = 'country_none'
  @observable selectedTsunamiOption = 'tsunami_either'
  @observable selectedStatusOption = 'status_either'
  @observable selectedIdOption = 'id_none'

  constructor (rootStore) {
    this.rootStore = rootStore
    this.BASE = 'http://localhost:4000'
  }

  @action dateOptionRangeToChange (e) {
    this.dateOptionRangeTo = e.target.value
  }

  @action dateOptionRangeFromChange (e) {
    this.dateOptionRangeFrom = e.target.value
  }

  @action dateOptionValueChange (e) {
    this.dateOptionValue = e.target.value
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


}

export default AnalyticalStore