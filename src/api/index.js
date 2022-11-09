import request from '@/lib/request'

const BASR_API = 'http://192.168.0.60:9103';

export const getToken = () => {
  const formData = {
    AppId: 'zk36cb632fe768fc5b',
    AppSecret: 'a71ae82c36cb632fe768fc5b9e0e4f1e',
    Time: '11'
}
  return request({
    url: `${BASR_API}/api/Token/GetToken`,
    method: 'get',
    params: formData
  })
}
