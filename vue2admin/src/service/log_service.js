import request from '@/util/util_axios'


// 获取管理员登录日志
const getLoginAdmUser = (page, pageSize, search) => {
  return request.get('log/login/adm_user', {params: {_page: page, _page_size: pageSize, ...search}})
}

// 删除管理员登录日志
const delLoginAdmUser = id => {
  return request.delete(`log/login/adm_user/${id}`)
}


export default {
  getLoginAdmUser,
  delLoginAdmUser,
}
