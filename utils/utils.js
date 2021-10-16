export default {
    handleHotSongs(res,arr) { // 处理热歌数据
        let obj = {},
        {name, tracks} = res.playlist;
        let result = tracks.slice(0,3);
        obj.name = name;
        obj.tracks = result;
        arr.push(obj);
    },
    handleCookie(res) { // 处理cookies数据 去除出Max-Age等无用数据 MUSIC_A_T=1452645620764; __csrf=3fa3fa98467dd67d3b9b55017ebc48c5...
        let cookies = {},str = '';
        let newRes = res.cookies.map(item => {
            return item.split(';').slice(0,1);
        })
        newRes.flat().forEach(item => {
                if(item.indexOf('=') !== -1) {
                    var i = item.indexOf('=');
                    cookies[item.substring(0,i)] = item.substring(i,item.length);
                }
            })
        for(let key in cookies) {
            str += key + cookies[key] + '; '
        }
        return str;
    },

}