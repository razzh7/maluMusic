import config from "./config";
import utils from "../utils/utils";

export default (url, data={}, method='GET') => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.host + url,
            data,
            method,
           header: {
                cookie: wx.getStorageSync('cookie')
           },
            success: (res) => {
                if(data.isLogin) {   // 如果是登录信息
                    wx.setStorageSync('cookie', utils.handleCookie(res)) // 处理返回回来的cookies
                }
                resolve(res.data);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}