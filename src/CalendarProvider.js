export class CalendarProvider {
  constructor (API_URL) {
    this.API_URL = API_URL
  }

  load (dataPath) {
    return this._fetch(dataPath)
  }

  add (data, dataPath) {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }
    return this._fetch(dataPath, options)
  }

  _fetch = (dataPath = '', options, additionalPath = '') => {
    const url = `${this.API_URL}/${dataPath}${additionalPath}`
    return fetch(url, options)
      .then(resp => {
        if (resp.ok) return resp.json()
        return Promise.reject(resp)
      })
  }
}

export default CalendarProvider
