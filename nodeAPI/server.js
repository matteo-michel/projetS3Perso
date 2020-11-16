const http = require('http')
const app = require('./app')

const port = 3000

app.set('port', port)

server = http.createServer(app)

server.on('error', (error) => { console.log(error) })
server.on('listening', () => { console.log("L'API est à présent en marche") })

server.listen(port)
