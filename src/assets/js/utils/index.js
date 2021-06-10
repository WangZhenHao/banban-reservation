// import { Toast } from 'mint-ui'

(function() {
    /**
     * JavaScript的工具库,方便使用
     * author   wzh
     * created  2018-4-7 18:06
     * update   2018-4-17 
     */
        var Tools = {
            // tips(msg) {
            // 	Toast(msg)
            // },
            /**
             * 日期时间换成Unix时间戳
             * data  	时间戳    必填
             * @param {[type]} data [description]
             */
            
    
            /**
             * 精确到两位小数
             * @param {[type]} money 数值         必填
             * @param {[type]} num   精确多少位   可填(默认两位)
             */
            ToCurrency: function(money, num = 2) {
                return parseFloat(parseFloat(money).toFixed(num));
            },
    
            /**
             * 设置cookies
             * @param {[type]} name    cookie名称    必填
             * @param {[type]} value   cookie值		 必填
             * @param {[type]} expires 缓存多少秒	 可填
             * @param {[type]} options 对象          可填(默认设置根目录)
             */
            setCookies: function(name, value, expires, options = {}) {
                var cookieText = name + '=' + value;
                options.path = options.path || '/';
                if(expires) {
                    var timestamp = (new Date().getTime()) / 1000 + expires;
                    var dateObj = new Date(timestamp * 1000);
                    cookieText += '; expires=' + dateObj.toGMTString();
                }
    
                if(options.path) {
                    cookieText += '; path=' + options.path;
                }
                if(options.domain) {
                    cookieText += '; domain=' + options.domain;
                }
                document.cookie = cookieText;
            },
            /**
             * 获取cookie的值
             * @param  {[type]} name cookie值
             * @return {[type]}      [description]
             */
            getCookie: function(name) {
                var value = document.cookie,
                    cookieName = name + '=',
                    cookieStart = value.indexOf(cookieName),
                    cookieValue = null;
                if(cookieStart > -1) {
                    var cookieEnd = value.indexOf(';', cookieStart);
                    cookieEnd = cookieEnd > -1 ? cookieEnd : value.length;
                    cookieValue = value.substring(cookieStart + cookieName.length, cookieEnd)
                }
                return cookieValue;
            },
            /**
             * 清除cookies
             * 
             * @return {[type]} [description]
             */
            clearCookies: function(name,options = {}) {
                this.setCookies(name, '', -1, options);
            },
            /**
             * 获取本地缓存
             * @param {[type]} key   	键         必填
             * @return {[type]} [description]
             */
            getLocalStorage: function(key) {
                var json = JSON.parse(localStorage.getItem(key));
                if(json) {
                    if(json.expires) {
                        var timestamp = parseInt(+new Date() / 1000);
                        if(timestamp > json.expires) {
                            this.clearLocalStorage(key)
                            return null;
                        }
                    }
                    return json[key];
                } else {
                    return null;
                }
            },
            /**
             * 设置本地缓存(可设置过期时间)
             * @param {[type]} key   	键           必填
             * @param {[type]} value 	值		     必填
             * @param {[type]} expires  保存多少秒   可填(秒)
             */
            setLocalStorage: function(key, value, expires) {
                var json = {}
                json[key] = value;
                if(expires) {
                    var timestamp = parseInt(+new Date() / 1000) + expires;
                    json['expires'] = timestamp;  
                }
    
                localStorage.setItem(key, JSON.stringify(json));
            },
            /**
             * 清除本地缓存
             * @param {[type]} key 	键		可填(默认清除所有)
             * @return {[type]} [description]
             */
            clearLocalStorage: function(key) {
                if(key) {
                    localStorage.removeItem(key);
                } else {
                    localStorage.clear();
                }
            },
        };
        // export default Tools;
        window.tools = Tools;
    })();