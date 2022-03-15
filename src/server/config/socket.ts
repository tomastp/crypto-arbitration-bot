import app from './server'
import http from 'http'
import {Server as WebSockerServer} from 'socket.io'
import Logger from '../middleware/winston-middleware'
import { env } from '../environment/env'

const PORT_WEB_SOCKET = env().webSocketPort ?? 8001
const PORT = env().port ?? 8000

// setup WebSockerServer
const httpServer = http.createServer(app)
const io = new WebSockerServer(httpServer, {
    cors: { 
        origin: `${env().domain}:${PORT}`,
        methods: ["GET", "POST"],
        credentials: true
    },
    allowEIO3: true
  })

// listen
httpServer.listen(PORT_WEB_SOCKET,  () => {
    Logger.debug(`WebSockerServer listening @ ${env().domain}:${PORT_WEB_SOCKET}`)
})

// socket event connection
io.on('connection', (socket) => {
    Logger.debug(`Client connected! Socket: ${socket.id}`)    
})

export default io