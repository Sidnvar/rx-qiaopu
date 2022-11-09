import request from '@/lib/request'

// const BASR_API = 'http://192.168.0.60:9103/'
export function getData(data) {
  return request({
    url: 'https://mockapi.eolink.com/euFXgKb4b91e47244f9521623518ab7165ef05a4d411886/zupu',
    method: 'get',
    data
  })
}
