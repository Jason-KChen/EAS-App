import { observable, action } from 'mobx'


class AnalyticalStore {
  @observable searchResults = []

  constructor (rootStore) {
    this.rootStore = rootStore
    this.BASE = 'http://localhost:4000'
  }


}

export default AnalyticalStore