export default {
    set(key,val){
        localStorage.setItem(key,JSON.stringify(val));
    },
    get(key){
        let val = localStorage.getItem(key);
        // 转json格式时，如果字符串不是键值对格式可能会解析错误所以
        //先尝试着解析数据, 成功了就返回解析后的值, 不成功就原物返回
        try {
            val = JSON.parse(val)
        } finally {
            return val;
        }
    },
    clear(){
        localStorage.clear();
    }
}