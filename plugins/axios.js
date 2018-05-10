import * as axios from 'axios'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  // options.baseURL = process.env.kda.url + process.env.kda.m_aid
}

export default axios.create(options)
