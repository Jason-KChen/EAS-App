import { observable, action } from 'mobx'

export class UIStore {
  @observable userData = new Map()
  @observable username = 'dev'

  constructor (rootStore) {
    this.rootStore = rootStore
    this.BASE = 'http://localhost:4000'
    this.isAdmin = true
  }
}

export default UIStore