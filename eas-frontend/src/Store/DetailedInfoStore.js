import { observable, action } from 'mobx'

export class DetailedInfoStore {
  @observable selectedEarthquakeId = null
  @observable selectedEarthquake = new Map()
  @observable latitude = null
  @observable longitude = null
  @observable comments = []
  @observable news = []

  constructor (rootStore) {
    this.rootStore = rootStore
    this.BASE = 'http://localhost:4000'
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
        let when = (((new Date).getTime() - data.data[0]['time']) / (1000 * 60)).toFixed(1)

        this.selectedEarthquake.set('id', data.data[0]['id'])
        this.selectedEarthquake.set('place', data.data[0]['place'])
        this.selectedEarthquake.set('country', data.data[0]['country'])
        this.selectedEarthquake.set('url', data.data[0]['url'])
        this.selectedEarthquake.set('utc', utcFormatted)
        this.selectedEarthquake.set('local', localFormatted)
        this.selectedEarthquake.set('localTime', localTime)
        this.selectedEarthquake.set('latitude', data.data[0]['latitude'])
        this.selectedEarthquake.set('longitude', data.data[0]['longitude'])
        this.selectedEarthquake.set('mag', data.data[0]['mag'])
        this.selectedEarthquake.set('when', when)
        this.selectedEarthquake.set('depth', data.data[0]['depth'])
        this.selectedEarthquake.set('status', data.data[0]['status'])
        this.selectedEarthquake.set('nst', data.data[0]['nst'])
        this.selectedEarthquake.set('tsunami', data.data[0]['tsunami'])
        this.selectedEarthquake.set('magnitude_type', data.data[0]['magnitude_type'])

        this.selectedEarthquake.set('ready', true)

        this.latitude = this.selectedEarthquake.get('latitude')
        this.longitude = this.selectedEarthquake.get('longitude')

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
        this.comments = data.data.sort((a, b) => {return (a['time'] < b['time'])}).map((obj) => {

          let postMediaURL = obj['media_url'] === 'N/A' ? '' : obj['media_url']

          if (postMediaURL !== '' && !(obj['media_url'].startsWith('http://') || obj['media_url'].startsWith('https://'))) {
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

  @action async fetchNews () {

    let country = this.selectedEarthquake.get('country')
    let location = ''
    let splitted = this.selectedEarthquake.get('place').split(', ')

    if (splitted.length <= 1) {
      console.log('Bad location')
      this.news.clear()
      return
    }

    location = splitted[1]
    let timeString = this.selectedEarthquake.get('localTime').getFullYear().toString() + '-' + (this.selectedEarthquake.get('localTime').getMonth() + 1).toString() + '-' + this.selectedEarthquake.get('localTime').getDate().toString()

    try {
      let res = await fetch(this.BASE + '/api/news/get-relevant-news?location=' + location + '&country=' + country + '&time=' + timeString)
      let d = await res.json()

      if (d.status) {
        this.news.clear()
        this.news = d.data.map((object, index) => {
          let temp = {}
          temp['author'] = object.author
          temp['title'] = object.title
          temp['description'] = object.description
          temp['url'] = object.url
          temp['source'] = object.source.name

          return temp
        })
      } else {
        window.toastr.warning('Failed to load news')
      }

    } catch (err) {
      console.log(err)
      window.toastr.warning('Failed to load news')
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

}

export default DetailedInfoStore