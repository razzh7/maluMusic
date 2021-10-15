import request from "../../http/http";
let cache = {}; //数据缓存池
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoTag: [], // 视频标签数据
        tagId: '', // 标签id
        videoInfo: [], //视频主体数据
        videoId: '', // 缓存视频标签数据
        isTriggered: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getVideoTag();
    },
    getVideoTag() { // 获取视频标签数据
        request('/video/group/list').then(res => {
            this.setData({
                videoTag: res.data.slice(0,14),
                tagId: res.data.slice(0,14)[0].id // 拿到第一个数组id以便初次渲染激活第一个tag的active
            })
            this.getVideoMain(this.data.tagId); // 注意不能放在onLoad中，因为getVideoTag是异步任务，这时还没获取到tagId
        })
    },
    getVideoMain(tagId) { // 获取视频主体资源
        request('/video/group',{ id: tagId }).then(res => {
            let index = 0,
                videoInfo = res.datas.map(item => {
                    item.id = index++;
                    return item;
                })
            this.setData({
                videoInfo,
                isTriggered: false
            })
            cache[tagId] = this.data.videoInfo;
            wx.hideLoading();
        })
    },
    currTag(e) { // 获取点击标签的id
        let tagId = e.target.dataset.id;
        if(!(tagId in cache)) { // cache没找到相对应的标签tagId !(false) = true
            wx.showLoading({  // 加载弹框
                title: '正在加载',
              })
            this.setData({
                tagId,
                videoInfo: []
            })
            this.getVideoMain(tagId)
            // cache["tagId"] = this.data.videoInfo;
            return;
        } 
        //cache中找到了相对应的标签tagId
        this.setData({
            videoInfo: cache[tagId],
            tagId
        })
    },
    handleStop(e) { //处理暂停bug
        /**
         * 需求：点击另外一个视频后，上一个视频关闭
         * 思路：1、创建VideoContext实例
         *      2、挂载VideoContext实例，第二次访问的时候就获取到上一个视频的vid，将可以执行&&后面的stop暂停逻辑
         *      3、但这个时候第三次点击的时候发现自己的视频播放不了，是因为这个vid是自己的，又有这个实例，所以把自己暂停了
         *      4、挂载vid，并判断this.vid是否和当前点击的视频vid相同，如果相同，那么就跳过
         */ 
        let vid = e.currentTarget.id;
        this.setData({
            videoId: vid
        })
        // this.vid !== vid && this.videoContext && this.videoContext.stop();
        // this.vid = vid;
        this.videoContext = wx.createVideoContext(vid);  //vid必须是video的id属性
    },
    handleRefresh(e) { // 视频下拉刷新
        this.setData({
            isTriggered: true //开启下拉动画
        })
        this.getVideoMain(this.data.tagId);
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
    onShareAppMessage: function ({from}) {
        console.log(from)
    }
})