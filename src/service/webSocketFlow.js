/*
* @Author: web.duanzhaozhao
* @Date: 2020-11-12 15:48:06
* @LastEditors: web.范庆龙
* @LastEditTime: 2020-11-24 18:09:08
*/
class Socket {
    constructor() {
        this.socket = null;//定义一个实例
        this.lockReconnet = false; //避免重复连接
        this.wsUrl = "ws://test-eachbot.easyliao.net/ws";
        this.isReconnet = false;//判断是否链接
        this.globalCallback = null;//全局回调函数
        this.sendData = null; //把要发送给socket的数据和处理socket返回数据的回调保存起来
        this.timeout = 60;
        this.timeoutObj = null;
        this.serverTimeoutObj = null;

    }

    //创建socket
    createReconnet() {
        try {
            if ('WebSocket' in window) {
                this.socket = new WebSocket(this.wsUrl);
            } else if ('MozWebSocket' in window) {
                this.socket = new WebSocket(this.wsUrl);
            }
            this.websocketInit();
        } catch (e) {
            this.reconnet(this.wsUrl);
        }
    }

    /* 心跳事件 */
    onheartbeat() {
        if(this.timeoutObj) {
            clearInterval(this.timeoutObj)
        }
        /* 心跳计时器 */
        this.timeoutObj = setInterval(() => {
            //发送数据，如果onmessage能接收到数据，表示连接正常,然后在onmessage里面执行reset方法清除定时器
            let msg = {}
            msg.cmd = 'HEARTBEAT';
            this.sendMsg(msg);
        }, this.timeout * 1000);
    }

    // 发送消息
    sendMsg(data, callback) { //发送数据,接收数据
        if (this.socket.readyState === 1) {
            this.globalCallback = callback;
            this.sendData = data;
            data = JSON.stringify(data);
            this.socket.send(data);
        } else {
            setTimeout(() => {
                this.sendMsg(data, callback)
            }, 200)
            return false;
        }
        this.socket.onmessage = ev => {
            callback && callback(ev)
        }
    }

    //初始化websocket
    websocketInit() {
        this.socket.onopen = () => {
            console.log('socket连接成功')
            this.isReconnet = true;
            if (this.isReconnet) {//执行全局回调函数
                this.sendMsg(this.sendData, this.globalCallback);
                this.isReconnet = false;
            }
            this.onheartbeat()
        }
        this.socket.onmessage = (ev) => {
            console.log(ev, '连接正常');
            this.onheartbeat();
        }
        this.socket.onerror = () => {
            console.log('websocket服务出错了---onerror');
            this.reconnet(this.wsUrl);
        }
        this.socket.onclose = () => {
            this.closeReconnet();
            this.reconnet(this.wsUrl);
        }
    }

    //关闭连接websocket
    closeReconnet() {
        this.socket.close();
    }

    //重新连接websocket
    reconnet(url) {
        if (this.lockReconnet) return false;
        this.isReconnet = true;
        this.lockReconnet = true;
        setTimeout(() => {
            this.createReconnet(url)
            this.lockReconnet = false;
        }, 5000)
    }
}


export default new Socket();

