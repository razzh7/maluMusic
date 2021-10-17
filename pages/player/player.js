// pages/player/player.js
import request from "../../http/http";
import utils from "../../utils/utils"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        backgroundImage: '', // 背景图片
        isPlay: false, // 控制播放状态标识
        song: [], // 歌曲详情
        songUrl: '', // 歌曲播放url地址
        checkSongId: '', // 校验是否是同一首歌，用于监听状态
        songIndex: '', // 歌曲数组下标 （用于切换歌曲）
        currentTime: '0:00',
        durationTime: '',
        processWidth: 0, // 进度条长度
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            currentTime: '0:00', // 首先初始化开始进度条
        })
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('songData', (data) => { // 监听recommend传进来的数据
            this.setData({
                song: data.song,
                backgroundImage: data.song.album.blurPicUrl,
                checkSongId: data.song.id,
                songIndex: data.songIndex,
                durationTime: utils.millisToMinutesAndSeconds(data.song.duration) //格式化时间min:s
            })
            this.getSongUrl(data.song.id); // 获取歌曲url 
            this.mannerPlayInGobal(); // 管理系统后台状态     
        })

    },
    mannerPlayInGobal() { // 管理系统后台状态
        this.backgroundAudioManager = wx.getBackgroundAudioManager();  // 创建全局音频播放管理器
        this.backgroundAudioManager.onPlay(() => { // 监听后台是否点击播放
            this.controlPlay(true);
        })
        this.backgroundAudioManager.onPause(() => {  // 监听后台是否点击暂停
            this.controlPlay(false);
        })
        this.backgroundAudioManager.onStop(() => { // 监听微信背景音频是否关闭
            this.controlPlay(false);
        })
        this.backgroundAudioManager.onTimeUpdate(utils.throttle(() => { // 监听背景音频播放进度更新事件
            let currentTime = utils.SecondsToMinutesAndSeconds(this.backgroundAudioManager.currentTime),
                duration = utils.SecondsToMinutesAndSeconds(this.backgroundAudioManager.duration),
                processWidth = (this.backgroundAudioManager.currentTime / this.backgroundAudioManager.duration) * 542
            this.setData({
                currentTime,
                duration,
                processWidth
            })
        },800))
        this.backgroundAudioManager.onEnded(() => { // 监听音频是否结束
            console.log('onEnded')
            this.wacther('next');
        })
    },
    controlPlay(bool) { // 控制播放状态
        this.setData({
            isPlay: bool
        })
    },
    handlePlay() { // 点击按钮切换播放状态
        let isPause = !this.data.isPlay; // 播放暂停切换
        
        this.setData({
            isPlay: isPause
        })

        if(!isPause) { 
            this.backgroundAudioManager.pause(); // 播放暂停
        } else {
            this.backgroundAudioManager.play(); // 继续播放
        }
    },
    getSongUrl(id) { // 获取歌曲url
        request('/song/url',{id}).then(res => {
            this.setData({
                songUrl: res.data[0].url
            })
            this.startPlay(); //拿到歌词url后直接开始播放
        })
    },
    startPlay() { // 进来就开始播放音乐
        if(this.data.checkSongId == this.data.song.id) {
            this.setData({
                isPlay: true
            })
            this.setAudioSrc(this.data.songUrl,this.data.song.name);
            return;
        }
        this.setAudioSrc(this.data.songUrl,this.data.song.name);
    },
    setAudioSrc(src,title) {
        this.backgroundAudioManager.src = src;
        this.backgroundAudioManager.title = title;
    },
    triggleSongs(e) { // 切换歌曲
        /**
         * 思路：
         * 来源获取index
         * 通过点击上一首下一首向来源传递pre/next字段
         * 来源接受到pre/next字段后通过判断，再把找到数组中index+1的数据存入Storage
         * player取出Storage中的数据就是下一首/上一首的歌曲
         */
        let type = e.currentTarget.id; //获取切换类型
        this.wacther(type);
    },
    wacther(type) {
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit('triggleType', {type});
        let songDatas = JSON.parse(wx.getStorageSync('songData')),
            currentTime = '0:00',
            durationTime = utils.millisToMinutesAndSeconds(songDatas.duration);
        this.setData({
            song: songDatas,
            currentTime,
            durationTime
        })
        this.getSongUrl(this.data.song.id);
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