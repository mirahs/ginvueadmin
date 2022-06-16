export const menus = [
    {
        name: 'home',
        desc: '首页',
        children: [
            {
                name: 'Welcome',
                desc: '欢迎',
                key: [1, 2]
            }
        ],
    },
    {
        name: 'sys',
        desc: '系统',
        children: [
            {
                name: 'AdmUserPassword',
                desc: '密码更新',
                key: [1, 2]
            },
            {
                name: 'AdmUser',
                desc: '管理员',
                key: [1]
            },
        ],
    },
    {
        name: 'log',
        desc: '日志',
        children: [
            {
                name: 'AdmUserLogin',
                desc: '管理员登录',
                key: [1],
            },
        ],
    },
]
