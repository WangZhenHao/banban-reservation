import { timestampToDate, dateToTimestamp } from '@js/utils/utils'

function getCurrentFiveDate() {
    var stamp = +new Date();

    return getFiveDate(stamp)
}

function getPreviuosFiveDate(stamp) {
    stamp -= 60 * 60 * 24 * 1000 * 5;
    return getFiveDate(stamp);
}

function getNextFiveDate(stamp) {
    stamp += 60 * 60 * 24 * 1000;

    return getFiveDate(stamp);
}

function getFiveDate(stamp, len = 5) {
    var dateList = [];

    for(var i = 0; i < len; i++) {
        var nextStamp = stamp + i * 60 * 60 * 24 * 1000;
        var nextStameDate = timestampToDate('yyyy-MM-DD', nextStamp)
        var isToday = nextStameDate === timestampToDate('yyyy-MM-DD', +new Date())
        var week = oneDay.apply(null, nextStameDate.split('-'));
        
        dateList.push({
            stamp: nextStamp,
            date: nextStameDate,
            tips: isToday ? '今天' : week,
            isToday
        })
    }    
    
    return dateList;
}

function oneDay(y,m,d){
    var myDate=new Date(y, m - 1, d);
    var week = myDate.getDay()

    switch(week){
       case 0:
        return '星期日';
        case 1:
        return '星期一';
        case 2:
        return '星期二';
        case 3:
        return '星期三';
        case 4:
        return '星期四';
        case 5:
        return '星期五';
        case 6:
        return '星期六'; 
   }
}
export {
    getCurrentFiveDate,
    getPreviuosFiveDate,
    getNextFiveDate
}