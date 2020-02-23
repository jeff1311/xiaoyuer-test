//Date类型添加format方法
Date.prototype.format = function(fmt) { 
    var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt; 
}





//参数加签
function sign(params,secret){
    //按key首字母排序
    //取出json的key组成数组
    var keyArr = [];
    for(var p in params){
        keyArr.push(p);
    }
    //数组排序
    keyArr.sort();
    //头尾加secret
    var sign = secret;
    for(var i in keyArr){
        sign += keyArr[i];
        sign += params[keyArr[i]];
    }
    sign += secret;
    sign = encodeURIComponent(sign);
    console.log(sign);
    //md5加密并转为大写
    var signMd5 = hex_md5(sign).toUpperCase();
    console.log(signMd5);
    return signMd5;
}