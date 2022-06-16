import request from '@/util/util_axios'


// 获取用户信息
const info = () => {
  return request.get('adm_users/info')
}


// 获取所有用户
const getAll = (page, pageSize) => {
  return request.get('adm_users', {params: {_page: page, _page_size: pageSize}})
}

// 添加用户
const add = (data) => {
  return request.post('adm_users', data)
}

// 编辑用户
const edit = (id, data) => {
  return request.put(`adm_users/${id}`, data)
}

// 删除用户
const del = id => {
  return request.delete(`adm_users/${id}`)
}

// 锁住用户
const lock = (id) => {
  return request.patch(`adm_users/${id}/lock`)
}

// 重置用户密码
const reset = id => {
  return request.patch(`adm_users/${id}/reset`)
}

// 修改密码
const password = data => {
  return request.patch(`adm_users/password`, data)
}


export default {
  info,
  
  getAll,
  add,
  edit,
  del,
  lock,
  reset,
  password,
}
