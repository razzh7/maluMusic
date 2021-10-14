import request from "../../http/http";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoTag: [],
        tagId: '',
        videoInfo: []
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
    currTag(e) { // 获取点击标签的id
        let tagId = e.target.dataset.id;
        this.setData({
            tagId
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
                videoInfo
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