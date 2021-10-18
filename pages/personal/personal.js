import request from "../../http/http";
let startY,moveY,resY;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        translate: 'translateY(0)',
        transition: '',
        userInfo: {},
        recentPlayList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    handleTouchStart(e) {
        startY = e.touches[0].clientY; //获取开始鼠标距离窗口顶部的Y坐标
    },
    handleTouchMove(e) {
        moveY = e.touches[0].clientY; //获取开始鼠标距离窗口顶部的Y坐标
        resY = moveY - startY;
        if(resY < 0) {
            return;
        }
        if(resY >= 80) {
            resY = 80;
        }
        this.setData({
            translate: `translateY(${resY}rpx)`,
            transition: 'transfrom 1s linear'
           })
    },
    handleTouchEnd(e) {
        this.setData({
            translate: `translateY(0rpx)`,
            transition: 'transfrom 1s linear'
           })
    },
    toLogin() {
        wx.navigateTo({
          url: '/pages/login/login'
        })
    },
    getRecord(id) { //获取历史播放记录
        request('/user/record',{uid: id, type: 1}).then(res => {
            let index = 0;
            let result = res.weekData.slice(0,10).map(elem => {
                elem.id = index++;
                return elem;
            })
            this.setData({
                recentPlayList: result
            })
        })
    },
    onLoad: function (options) {
        this.setData({ //保存userInfo数据到data
            userInfo: JSON.parse(wx.getStorageSync('userInfo')) //反序列化取出Storage中的用户信息
        })
        this.getRecord(this.data.userInfo.userId);
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