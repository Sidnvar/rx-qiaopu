import request from '@/lib/request'

const BASR_API = '/api';

export const getToken = async () => {
  const formData = {
    AppId: 'zk36cb632fe768fc5b',
    AppSecret: 'a71ae82c36cb632fe768fc5b9e0e4f1e',
    Time: '11'
}
  const req = await request({
    url: `${BASR_API}/Token/GetToken`,
    method: 'POST',
    params: formData
  })

  sessionStorage.setItem('token', req.Data.Ext1)
}

// /api/User/GetUserRelation
export const GetUserRelation = params => {
  return request({
    url: `${BASR_API}/User/GetUserRelation`,
    method: 'POST',
    params
  })
}

export const CheckUserName = data => {
  return request({
    url: `${BASR_API}/User/CheckUserName`,
    method: 'POST',
    data
  })
}

export const EditUserRelation = data => {
  return request({
    url: `${BASR_API}/User/EditUserRelation`,
    method: 'POST',
    data
  })
}
