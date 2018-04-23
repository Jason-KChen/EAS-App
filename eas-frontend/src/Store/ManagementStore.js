import { observable, action } from 'mobx'


class ManagementStore {
  @observable userList = []

  constructor (rootStore) {
    this.rootStore = rootStore
    this.BASE = 'http://localhost:4000'
  }

  @action async fetchNonAdminUsers () {
    try {
      let res = await fetch(this.BASE + '/api/auth/get-all-users', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      let d = await res.json()

      if (d.status) {
        this.userList.clear()
        this.userList = d.data.map((obj) => {
          return obj.username
        })
      } else {
        window.toastr.warning('Failed to load user data')
      }
    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to load user data')
    }
  }
}

export default ManagementStore