/**
 * This page is a request page
 * Exposure Chamber: Part Exposure 
 * 
 * 
 * **/
import ajax from './ajax'
// 获取登录信息 get请求  

export const getUserInfo = () => ajax({
    url:'/getListUserInfo'
})
// 获取左侧导航信息
export const getMenusList = () => ajax({
    url:'/menus'
})
// 获取用户列表信息
export const getUser = () => ajax({
    url:'/users'
})