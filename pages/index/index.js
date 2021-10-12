// pages/index/index.js
import request from "../../http/http";
import utils from "../../utils/utils";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [],
        recommendList: [],
        hotRank: [],
        test: '234'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let hotArr = [];
        // 轮播图数据
        request('/banner', {type: 2}).then(res => {
            this.setData({
                bannerList: res.banners
            })
        })
        // 推荐歌单
        request('/personalized', {limit: 10}).then(res => {
            this.setData({
                recoomendList: res.result
            })
        })
        // 热歌榜
        request('/playlist/detail', {id: 3778678}).then(res => {
            utils.handleHotSongs(res,hotArr)
            this.setData({
                hotRank: hotArr
            })
        })
        // 新歌榜
        request('/playlist/detail', {id: 3779629}).then(res => {
            utils.handleHotSongs(res,hotArr)
            this.setData({
                hotRank: hotArr
            })
        })
        // 飙升榜
        request('/playlist/detail', {id: 19723756}).then(res => {
            utils.handleHotSongs(res,hotArr)
            this.setData({
                hotRank: hotArr
            })
        })
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