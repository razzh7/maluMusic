export default {
    handleHotSongs(res,arr) { //处理热歌数据
        let obj = {},
        {name, tracks} = res.playlist;
        let result = tracks.slice(0,3);
        obj.name = name;
        obj.tracks = result;
        arr.push(obj);
    }
}