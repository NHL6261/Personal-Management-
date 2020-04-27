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
export const getMenusList = () => ajax({
    url:'/menus'
})