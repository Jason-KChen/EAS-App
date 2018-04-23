import { observable, action } from 'mobx'


class ManagementStore {
  @observable userList = []
  @observable flaggedComments = []

  constructor (rootStore) {
    this.rootStore = rootStore
    this.BASE = 'http://localhost:4000'
  }

  @action async fetchFlaggedComments () {
    try {
      let res = await fetch(this.BASE + '/api/comment/get-flagged-comments', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      let d = await res.json()

      if (d.status) {
        this.flaggedComments.clear()
        this.flaggedComments = d.data.map((obj) => {
          let temp = {}
          let when = (((new Date).getTime() - obj['time']) / (1000 * 60 * 60)).toFixed(1)

          temp['content'] = obj.content
          temp['username'] = obj.username
          temp['time'] = obj.time
          temp['when'] = when

          return temp
        })
      } else {
        window.toastr.warning('Failed to load flagged data')
      }
    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to load flagged data')
    }
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

  @action async deleteUser (username) {
    window.toastr.info('Processing')

    try {
      let res = await fetch(this.BASE + '/api/auth/delete-user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
        })
      })

      let d = await res.json()

      if (d.status) {
        await this.fetchNonAdminUsers()
      } else {
        window.toastr.warning('Failed to delete user data')
      }

    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to delete user data')
    }
  }

  @action async deleteSelected (username, time) {
    window.toastr.info('Processing')

    try {
      let res = await fetch(this.BASE + '/api/comment/delete-comment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          time: time
        })
      })

      let d = await res.json()

      if (d.status) {
        await this.fetchFlaggedComments()
      } else {
        window.toastr.warning('Failed to unflag comment')
      }

    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to unflag comment')
    }
  }

  @action async unflagSelected (username, time) {
    window.toastr.info('Processing')

    try {
      let res = await fetch(this.BASE + '/api/comment/unflag-comment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          time: time
        })
      })

      let d = await res.json()

      if (d.status) {
        await this.fetchFlaggedComments()
      } else {
        window.toastr.warning('Failed to unflag comment')
      }

    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to unflag comment')
    }
  }



}

export default ManagementStore