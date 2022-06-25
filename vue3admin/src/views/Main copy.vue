<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :xs="19" :sm="20" :md="21" :lg="21" :xl="22">
                    <el-menu :default-active="activeHeader" mode="horizontal" background-color="#23262E"
                        text-color="#fff" active-text-color="#ffd04b" @select="handleHeaderSelect">
                        <el-menu-item index="1">首页</el-menu-item>
                        <el-menu-item index="2">系统</el-menu-item>
                        <el-menu-item index="3">用户</el-menu-item>
                        <el-menu-item index="4">博客</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :xs="5" :sm="4" :md="3" :lg="3" :xl="2" class="user-info">
                    <template v-if="authStore.userInfo">
                        <el-dropdown trigger="click" class="user-info-dd">
                            <span class="el-dropdown-link">
                                <el-icon style="vertical-align: middle">
                                    <icon-user />
                                </el-icon><span style="vertical-align: middle">{{ ' ' + authStore.userInfo.account + ' '
                                }}</span>
                                <el-icon style="vertical-align: middle">
                                    <icon-caret-bottom />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click.native="jumpTo('/home/Welcome')">个人信息</el-dropdown-item>
                                    <el-dropdown-item @click.native="jumpTo('/sys/AdmUserPassword')">修改密码
                                    </el-dropdown-item>
                                    <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </template>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="category" background-color="#393D49" text-color="#fff"
                    active-text-color="#ffd04b" @select="handleAsideSelect">
                    <el-menu-item index="tag">
                        <span>标签</span>
                    </el-menu-item>
                    <el-menu-item index="category">
                        <span>分类</span>
                    </el-menu-item>

                    <el-sub-menu index="article">
                        <template #title>
                            <span>文章</span>
                        </template>
                        <el-menu-item index="1-2">文章列表</el-menu-item>
                    </el-sub-menu>

                </el-menu>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { Action, ElMessageBox } from 'element-plus'
import { User as IconUser, CaretBottom as IconCaretBottom } from '@element-plus/icons-vue'

import useAuthStore from '@/sotre/auth'
import useMenuStore from '@/sotre/menu'


const activeHeader = ref('1')
const router = useRouter()

const authStore = useAuthStore()
const menuStore = useMenuStore()


const handleHeaderSelect = (key: string, keyPath: string[]) => {
    console.log('handleHeaderSelect', key, keyPath)
}

const handleAsideSelect = (key: string, keyPath: string[]) => {
    console.log('handleAsideSelect', key, keyPath)
}

const jumpTo = (path: string) => {
    router.replace({ path: path })
}

const logout = () => {
    ElMessageBox.alert('确认退出吗?', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        showCancelButton: true,
        cancelButtonText: '取消',
        callback: async (action: Action) => {
            if (action != 'confirm') return

            await authStore.logout()
            router.replace({name: 'Login'})
        },
    })
}
</script>


<style scoped>
.el-header {
    padding: 0px;
}

.el-aside {
    background-color: #393d49;
}

.el-main {
    padding: 0px;
    /* background-color: green; */
}

.el-main>.container {
    padding: 9px 15px 15px;
    text-align: left;
}

.user-info {
    padding-right: 15px;
    margin-bottom: 1px;
    background-color: #23262e;

    display: -webkit-flex;
    display: flex;
    justify-content: flex-end;
    /*子元素在水平轴上的对齐方式*/
    align-items: center;
    /*子元素在垂直轴上的对齐方式*/
}

.user-info-dd {
    /* align-self: center; */
    /*如果你元素设置了aligh-items为center就不用设置了*/
    color: #ffffff;
}
</style>
