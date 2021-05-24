const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 1883
const wsPort = 8883

server.listen(port, function () {
  console.log('mqtt server started and listening on port ', port)
})




const httpServer = require('http').createServer()
const ws = require('websocket-stream')
ws.createServer({ server: httpServer }, aedes.handle)

httpServer.listen(wsPort, function () {
  console.log('Aedes MQTT-WS listening on port: ' + wsPort)
  aedes.publish({ topic: 'aedes/hello', payload: "I'm broker " + aedes.id })
});

aedes.on('client', (client) =>
{
  console.log("New client connected")
  // console.log(client)
}
);

module.exports = {
  mqtt : server,
  mqtt_ws: httpServer
}