function mobilePhoneFormat(phoneNumber) {
  const re = /^1[2-9][0-9]{9}$/;
  // var re = /^1(3|4|5|7|8)[0-9]{9}$/;
  return re.test(phoneNumber);
}

function dateToTimestamp(data) {
  return Date.parse(data);
}

/**
* Unix时间戳转成时间
* @param {[type]} format     格式: 	 			必填
* 如: YY/MM/DD hh:mm:ss   
*     YY年MM月DD日 hh时mm分ss秒
*     Y-M-D h:m:s
* @param {[type]} timestamp '时间戳: 1525147931'	可填(默认当前时间)
*/
function timestampToDate(format, timestamp) {
  var date = timestamp ? new Date(parseInt(timestamp)) : new Date(+new Date());
  var	year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds();
  var str = format.replace(/[YyMmDdHhSs]+/g, function(w) {
      if(w == 'yy' || w == 'YY' || w == 'y' || w == 'Y') {
          return year.toString().substring(2);

      } else if(w == 'yyyy' || w == 'YYYY') {
          return year;

      } else if(w == 'MM') {
          return month >= 10 ? month : '0' + month; 

      } else if(w == 'M') {
          return month;

      } else if(w == 'DD' || w == 'dd') {
          return day >= 10 ? day : '0' + day;

      } else if(w == 'D' || w == 'd') {
          return day;

      } else if(w == 'HH' || w == 'hh') {
          return hour >= 10 ? hour : '0' + hour;

      } else if(w == 'H' || w == 'h') {
          return hour;

      } else if(w == 'mm') {
          return minute >= 10 ? minute : '0' + minute;

      } else if(w == 'm') {
          return minute;

      } else if(w == 'ss' || w == 's') {
          return second >= 10 ? second : '0' + second;
      }
  });
  return str;
}

export { 
  mobilePhoneFormat,
  dateToTimestamp,
  timestampToDate
};
