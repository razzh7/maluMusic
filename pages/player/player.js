// pages/player/player.js
import request from "../../http/http";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // backgroundImage: 'http://p1.music.126.net/KS0TddHKX8c3atG3CkmdUw==/109951166264542938.jpg?imageView&thumbnail=50y50&quality=15&tostatic=0',
        backgroundImage: '',
        isPlay: false,
        song: [],
        songUrl: ''
    },
    mannerPlayInGobal() { // 管理系统后台状态
        this.backgroundAudioManager = wx.getBackgroundAudioManager();  // 创建全局音频播放管理器
        this.backgroundAudioManager.onPlay(() => { // 监听后台是否点击播放
            this.controlPlay(true);
        })
        this.backgroundAudioManager.onPause(() => {  // 监听后台是否点击暂停
            this.controlPlay(false);
        })
        BackgroundAudioManager.onStop(() => { // 监听微信背景音频是否关闭
            this.controlPlay(false);
        })
    },
    controlPlay(bool) { // 控制播放状态
        this.setData({
            isPlay: bool
        })
    },
    handlePlay() {
        let isPause = !this.data.isPlay; // 播放暂停切换
        this.setData({
            isPlay: isPause
        })
        this.backgroundAudioManager.src = this.data.songUrl;
        this.backgroundAudioManager.title = this.data.song.name;
        if(!isPause) { // 播放暂停
            this.backgroundAudioManager.pause();
        }
    },
    getSongUrl(id) {
        request('/song/url',{id}).then(res => {
            console.log(res);
            this.setData({
                songUrl: res.data[0].url
            })
        })
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
            this.getSongUrl(data.id); // 获取歌曲url 
            this.mannerPlayInGobal(); // 管理系统后台状态      
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