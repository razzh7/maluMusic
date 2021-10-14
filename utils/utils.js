export default {
    handleHotSongs(res,arr) { // 处理热歌数据
        let obj = {},
        {name, tracks} = res.playlist;
        let result = tracks.slice(0,3);
        obj.name = name;
        obj.tracks = result;
        arr.push(obj);
    },
    /**
     * cookies数据 
     * 0: "MUSIC_A_T=1452645620764; Max-Age=2147483647; Expires=Tue 1 Nov 2089 06:10:28 GMT; Path=/;"
     * 1: "__csrf=3fa3fa98467dd67d3b9b55017ebc48c5; Max-Age=1296010; Expires=Fri 29 Oct 2021 02:56:31 GMT; Path=/;"
     * 2: "NMTID=00OA3kcABeypDc7ekGzlnKqnkS4SYsAAAF8fLqvvQ; Max-Age=315360000; Expires=Sun 12 Oct 2031 02:56:21 GMT; Path=/;"
     * 3: "__remember_me=true; Max-Age=1296000; Expires=Fri 29 Oct 2021 02:56:21 GMT; Path=/;"
     * 4: "MUSIC_R_T=1452645649575; Max-Age=2147483647; Expires=Tue 1 Nov 2089 06:10:28 GMT; Path=/;"
     * 5: "MUSIC_U=6a44f135032fc3c1dd326e15e760473979eefa4c89544846adb8c879c9d4d8bd1e8907c67206e1edd78b6050a17a35e705925a4e6992f61d07c385928f88e8de; Max-Age=1296000; Expires=Fri
     */
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
    }
}