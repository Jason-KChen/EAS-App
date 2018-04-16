import { observable, action } from 'mobx'

export class MainMapStore {
  @observable recentEarthquakes = []
  @observable selectedEarthquake = new Map()
  @observable comments = new Map()
  @observable news = new Map()
  // @observable refreshMap = false

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
    try {
      let res = await fetch(this.BASE + '/api/earthquake/get-earthquake-info?earthquakeId=' + id, {
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

  @action async fetchComments (id) {

  }
}

export default MainMapStore