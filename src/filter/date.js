export default function(time){
    let date = new Date(time);
    return `${ date.getFullYear()}年${ date.getMonth()+1}月${date.getDate()}日`;
}