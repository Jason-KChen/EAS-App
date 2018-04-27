import { observable, action } from 'mobx'
import moment from 'moment'


class AuthenticationStore {

  @observable username = ''
  @observable password = ''

  @observable desiredUsername = ''
  @observable desiredPassword = ''
  @observable desiredPasswordRepeat = ''

  constructor (rootStore) {
    this.rootStore = rootStore
    this.BASE = 'http://localhost:4000'
  }

  @action updateInfo (e) {
    this[e.target.id] = e.target.value
  }

  @action async registerNewUser () {
    if (this.desiredUsername.length < 6 || this.desiredPassword.length < 6) {
      window.toastr.warning('Both username and the password must be 6 characters long!')
      return
    }

    if (this.desiredUsername.includes(' ')) {
      window.toastr.warning('Username cannot contain space')
      return
    }

    try {

      let res = await fetch(this.BASE + '/auth/new-user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.desiredUsername,
          password: this.desiredPassword
        })
      })

      let d = await res.json()

      if (d.status) {
        console.log(d)
        window.toastr.success('You are all set')
      } else {
        window.toastr.warning('Failed to register')
      }
    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to contact the server')
    }
  }

  @action async loginUser () {
    if (this.username === '' || this.password === '') {
      window.toastr.warning('Something is empty')
      return
    }

    try {
      let res = await fetch(this.BASE + '/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
      let d = await res.json()

      if (d.status) {
        window.toastr.success('You are good!')
      } else {
        window.toastr.warning('Failed to authenticate')
      }
    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to contact the server')
    }
  }
}

export default AuthenticationStore