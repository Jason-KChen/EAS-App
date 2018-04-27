import { observable, action } from 'mobx'

export class UIStore {
  @observable token = localStorage.getItem('token')
  @observable username = localStorage.getItem('username')
  @observable isAdmin = localStorage.getItem('isAdmin')

  constructor (rootStore) {
    this.rootStore = rootStore
    this.BASE = 'http://localhost:4000'
  }

  @action saveUserData (username, isAdmin, token) {
    localStorage.setItem('username', username)
    localStorage.setItem('isAdmin', isAdmin.toString())
    localStorage.setItem('token', token)

    this.username = username
    this.isAdmin = isAdmin.toString()
    this.token = token
  }

  @action cleanUserData () {
    localStorage.clear()

    this.username = null
    this.isAdmin = false
    this.token = null
  }
}

export default UIStore