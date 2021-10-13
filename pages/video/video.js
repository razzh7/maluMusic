import request from "../../http/http";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoTag: [],
        tagId: ''
    },
    currTag(e) {
        let tagId = e.target.dataset.id;
        console.log(typeof this.data.tagId)
        this.setData({
            tagId
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        request('/video/group/list').then(res => {
            this.setData({
                videoTag: res.data.slice(0,14),
                tagId: res.data.slice(0,14)[0].id // 拿到第一个数组id以便初次渲染激活第一个tag的active
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