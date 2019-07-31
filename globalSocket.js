var io = require('socket.io-client')
let socketChat

module.exports = class GlobalSocket {
    constructor() {

    }
    get currentSocketChat (){
        return socketChat
    }

    async activeSocket(isReconnect = true) {
        try {
            if (socketChat) {
                await this.closeCurrentSockets()
            }

            // socketChat = io('http://localhost:5001/skinNofity', {
            //     transports: ['websocket']
            // })
            //http://uladysocket.ktpm489.now.sh/skinNofity
            // https://whispering-woodland-89978.herokuapp.com/skinNofity
            console.log('Call Here')
            // socketChat = io('http://whispering-woodland-89978.herokuapp.com/skinNofity', {
            //     transports: ['websocket']
            // })
            // https://github.com/ktpm489/node-socket.io/blob/master/server.js
            //ws://whispering-woodland-89978.herokuapp.com/skinNofity/?EIO=4&transport=websocket
            // socketChat = io('https://socketdemo1231.herokuapp.com/',{
            //     transports: ['websocket'],
            //     upgrade: false
            // })
            socketChat = io('https://whispering-woodland-89978.herokuapp.com/skinNofity',{
                transports: ['websocket'],
                upgrade: false
            })

            socketChat.on('connect', () => {
                console.log('connect server')
                // msgType: 'hideSkinData','showSkinData','addSkinData'
                let body = {
                    msgType: 'addSkinData',
                    data: JSON.stringify({ 'type': 1, 'data': [12, 3, 4, 35, 3453] })
                }
                socketChat.emit("broadcastSkinToServer", body);
            })

            socketChat.on('broadcastSkinToClient', (e) => {
                console.log('broadcastSkinToClient', e.data)
            })

            socketChat.on('disconnect', (e) => {
                console.log('Disconnect socket')
                this.activeSocket()
            })
            socketChat.on("connect_error", (e)=> {
                console.log('Error Connect', e)
            }) 

        } catch (error) {
            console.log('activeSocket error', eror)
        }
    }
    closeCurrentSockets() {
        if (socketChat) {
            return new Promise((resolve, reject) => {
                socketChat.removeAllListeners()
                socketChat.disconnect()
                socketChat = null
                resolve()
            })
        }
    }
    closeSocket() {
        this.activeSocket(false)
    }
}

