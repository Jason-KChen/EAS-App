import { observable, action } from 'mobx'

export class MainMapStore {
  @observable recentEarthquakes = []
  @observable selectedEarthquake = new Map()
  @observable comments = []
  @observable news = new Map()
  @observable selectedEarthquakeId = null
  // @observable refreshMap = false

  // user submission here
  @observable userComment = ''
  @observable mediaURL = ''


  constructor (rootStore) {
    this.rootStore = rootStore
    this.BASE = 'http://localhost:4000'
  }

  @action async refreshMap () {
    await this.fetchRecentEarthquakes()
  }

  @action async fetchRecentEarthquakes () {
    try {
      let res = await fetch(this.BASE + '/api/earthquake/get-live-earthquakes', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      const data = await res.json()

      if (data.status) {
        this.recentEarthquakes.clear()
        this.recentEarthquakes = data.data.map((obj) => {
          let temp = {}
          temp.latitude = obj['latitude']
          temp.longitude = obj['longitude']
          temp.id = obj['id']

          return temp
        })
        // this.refreshMap = true
        window.toastr.info('Earthquakes loaded')
      } else {
        window.toastr.warning('Failed to load Earthquake data')
      }
    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to load Earthquake data')
    }
  }

  @action async pinOnClick (id) {
    if (this.selectedEarthquakeId === id) {
      return
    }

    this.selectedEarthquakeId = id
    await this.fetchDetailedInfo()
    await this.fetchComments()
  }


  @action async fetchDetailedInfo () {

    try {
      let res = await fetch(this.BASE + '/api/earthquake/get-earthquake-info?earthquakeId=' + this.selectedEarthquakeId, {
        Method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      let data = await res.json()

      if (data.status) {
        let utcDate = new Date(data.data[0]['time'])
        let utcFormatted = window.moment(utcDate).format("MMMM Do YYYY, h:mm:ss a")
        let localTime = new Date(data.data[0]['time'] + data.data[0]['tz'] * 60 * 1000)
        let localFormatted = window.moment(localTime).format("MMMM Do YYYY, h:mm:ss a")
        let when = (((new Date).getTime() - data.data[0]['time']) / (1000 * 60 * 60)).toFixed(1)

        this.selectedEarthquake.set('id', data.data[0]['id'])
        this.selectedEarthquake.set('place', data.data[0]['place'])
        this.selectedEarthquake.set('country', data.data[0]['country'])
        this.selectedEarthquake.set('url', data.data[0]['url'])
        this.selectedEarthquake.set('utc', utcFormatted)
        this.selectedEarthquake.set('local', localFormatted)
        this.selectedEarthquake.set('latitude', data.data[0]['latitude'])
        this.selectedEarthquake.set('longitude', data.data[0]['longitude'])
        this.selectedEarthquake.set('mag', data.data[0]['mag'])
        this.selectedEarthquake.set('when', when)
        this.selectedEarthquake.set('ready', true)
        window.toastr.info('Loading')
      } else {
        window.toastr.warning('Failed to load data')
      }
    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to load data')
    }
  }

  @action async fetchComments () {
    console.log('comments')
    try {
      let res = await fetch(this.BASE + '/api/comment/get-comments-with-earthquake?earthquakeId=' + this.selectedEarthquakeId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })
      const data = await res.json()

      if (data.status) {
        // this.comments.clear()
        this.comments = data.data.sort((a, b) => {return (a['time'] < b['time'])}).map((obj) => {

          let postMediaURL = obj['media_url'] === 'N/A' ? '' : obj['media_url']

          if (postMediaURL !== '' && !(obj['media_url'].startsWith('http://') || obj['media_url'].startsWith('http://'))) {
            postMediaURL = 'http://' + obj['media_url']
          }

          let temp = {}
          temp.mediaURL = postMediaURL
          temp.content = obj['content']
          temp.poster = obj['username']
          temp.when = (((new Date).getTime() - obj['time']) / (1000 * 60)).toFixed(0)
          temp.time = obj['time']
          temp.earthquakeId = obj['earthquake_id']
          temp.flagged = obj['flagged']
          console.log(temp)
          return temp
        })
      } else {
        window.toastr.warning('Failed to load comments')
      }
    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to load comments')
    }
  }

  @action userCommentChange (e) {
    if (e.target.value !== null) {
      this.userComment = e.target.value
    } else {
      this.userComment = e.target.value
    }
  }

  @action async flagComment (poster, time, index) {
    try {
      let res = await fetch(this.BASE + '/api/comment/flag-comment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: poster,
          time: time
        })
      })
      const data = await res.json()
      console.log(data)

      if (data.status) {
        this.comments[index].flagged = true
        window.toastr.info('Comment under review')
      } else {
        window.toastr.warning('Failed to flag comment.')
      }
    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to flag comment..')
    }
  }

  @action mediaURLChange (e) {
    if (e.target.value !== null) {
      this.mediaURL = e.target.value
    } else {
      this.mediaURL = e.target.value
    }
  }

  @action async userCommentOnSubmit () {
    await this.submitComment()
    await this.fetchComments()
  }

  @action async submitComment () {
    try {
      let res = await fetch(this.BASE + '/api/comment/new-comment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          media: this.mediaURL.length === 0 ? 'N/A' : this.mediaURL,
          username: this.rootStore.uiStore.username,
          content: this.userComment,
          earthquakeId: this.selectedEarthquakeId
        })
      })
      const data = await res.json()

      if (data.status) {
        this.userComment = ''
        this.mediaURL = ''
        window.toastr.info('Your comment is submitted')
      } else {
        window.toastr.warning('Failed to submit comment')
      }
    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to submit comment')
    }
  }
}

export default MainMapStore