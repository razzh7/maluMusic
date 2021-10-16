// pages/recommend/recommend.js
import request from "../../http/http";
import utils from "../../utils/utils";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        day: '',
        month: '',
        recommendSongs: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    getRecommendSongs() {
        request('/recommend/songs').then(res => {
            this.setData({
                recommendSongs: res.recommend
            })
        })
    },
    toMusicPlayer(e) {
        let song = e.currentTarget.dataset.song,
            index = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: "/pages/player/player",
            events: {
                triggleType: (data) => {
                    if(data.type === 'next') {
                        index += 1;
                    } else if(data.type === 'pre') {
                        index -= 1;
                    }
                    let songDatas = this.data.recommendSongs[index];
                    try {
                        wx.setStorageSync('songData', JSON.stringify(songDatas))
                    } catch(err) {
                        console.log(err);
                    }
                }
            },
            success: (res) => {
                res.eventChannel.emit('songData',{song, index}); // 传递对应音乐数组下标的数据给播放页面
            }
        })
    },
    onLoad: function (options) {
        this.setData({
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        })
        this.getRecommendSongs(); // 获取每日推荐数据
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