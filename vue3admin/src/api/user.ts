import { request, IApiResponse } from "./base"


// 修改密码
export const password = (data: any): Promise<IApiResponse> => {
    return request.patch('adm_users/password', data)
};
