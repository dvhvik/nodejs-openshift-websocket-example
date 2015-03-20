var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0" || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var WebSocketServer = require('ws').Server;
var express = require('express');
var app = express();
var server = app.listen(port,ipaddress, function () {

  var host = ipaddress
  var port = port

  console.log('Example app listening ')

})


wss = new WebSocketServer({
    server: server,
    autoAcceptConnections: false
});

function sws (id) {
    this.ws = id
}
sws.prototype = {
    ws: function() {
        return this.ws
    }
}
var clients = [];

function sendall(data) {
  for (var i in clients)
try{
//console.log(data)
    clients[i].ws.send(data);
}
catch(ex)
{
	clients.splice(i);
}
}
var a=0;
var xx=0;


wss.on('connection', function(ws) {
a++;
  ws.send('Welcome!');

clients.push(new sws(ws));
  console.log("New connection");
  ws.on('message', function(message) {
    //ws.send(message);
	//console.log(message)
	sendall(message);
  });

ws.on('close', function() {
	for(var i=0;i<clients.length;i++)
    	{
		if(clients[i].ws==ws)
		clients.splice(i);		
    	}
	xx=clients.length;
      console.log('Connection closed!');
	a--;
    });
});

console.log("Listening to " + ipaddress + ":" + port + "...");
