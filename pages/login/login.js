// pages/login/login.js
import request from "../../http/http";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        password: ''
    },
    handleInput(e) {
        let type = e.target.dataset.type,
            value = e.detail.value;
        this.setData({
            [type]: value  // 向phone和password传递input输入的值
        })
    },
    login() {
        let {phone, password} = this.data,
            phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/,
            passwordReg = /^[a-z0-9_-]{6,18}$/;
        if(!phone) { // 验证手机号合法性
            wx.showToast({
                title: '手机号不能为空',
                icon: 'error'
            })
        } else if(!phoneReg.test(phone)) {
            wx.showToast({
                title: '手机号格式错误',
                icon: 'error'
            })
        }
        if(!passwordReg.test(password)) { // 校验密码是否正确
            wx.showToast({
              title: '密码格式不正确',
              icon: 'error'
            })
        }
        // 发送请求
        request('/login/cellphone',{phone,password,isLogin: true}).then(res => {
            wx.setStorageSync('userInfo', JSON.stringify(res.profile));
            wx.showToast({
                title: '正在登陆',
                icon: 'loading',
                success: () => {
                    wx.reLaunch({
                      url: '/pages/personal/personal',
                    })
                }
              })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})