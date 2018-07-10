var express = require('express');
var app = express();

var args = process.argv.slice(2);
// var storagePath = args.length > 0? args[0] : './';

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send('Videoflow - Signaling server');
});


var port            = process.env.PORT || args[0] ||8888;

var config = {
    "isDev": true,
    "server": {
        "port": port,
        "/* secure */": "/* whether this connects via https */",
        "secure": false,
        "key": null,
        "cert": null,
        "password": null,
        "pingTimeout" : 10000,
        "pingInterval" : 4800
    },
    "rooms": {
        "/* maxClients */": "/* maximum number of clients per room. 0 = no limit */",
        "maxClients": 0
    },
    "stunservers": [
        {
            "url": "stun:stun.l.google.com:19302"
        }
    ],
    "turnservers": []
};
var sockets = require('./medialooks-signaling-server');
sockets.ListenSocket(express().listen(port), config);
console.log('Signaling server running on port:', port);


