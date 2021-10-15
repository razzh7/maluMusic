// pages/player/player.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // backgroundImage: 'http://p1.music.126.net/KS0TddHKX8c3atG3CkmdUw==/109951166264542938.jpg?imageView&thumbnail=50y50&quality=15&tostatic=0',
        backgroundImage: '',
        isPlay: false,
        song: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('songData', (data) => {
            this.setData({
                song: data,
                backgroundImage: data.album.blurPicUrl
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