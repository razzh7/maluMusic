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
    millisToMinutesAndSeconds(millis) { // 毫秒转分秒
        var minutes = Math.floor(millis / 60000); // 10000ms <-> 1min
        var seconds = ((millis % 60000) / 1000).toFixed(0); // 1s <-> 1000ms
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    SecondsToMinutesAndSeconds(seconds) { // 秒转分秒
        var minutes = Math.floor(seconds / 60);
        var seconds = (seconds % 60).toFixed(0);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    },
    throttle(fnc,delay) { // 节流函数
        let context,args,
            previous = 0;
        
        return function() {
            context = this;
            args = arguments;
            let begin = +new Date();

            if(begin - previous > delay) {
                fnc.apply(context,args);
                previous = begin;
            }
        }
    }
}