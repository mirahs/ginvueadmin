import request from '@/util/util_axios'


// 登录
const login = (data) => {
  return request.post('auth/login', data)
};

// 登录(token)
const loginToken = () => {
  return request.post('auth/login_token')
};

// 登出
const logout = () => {
  return request.post('auth/logout')
}


export default {
  login,
  loginToken,
  logout,
}
