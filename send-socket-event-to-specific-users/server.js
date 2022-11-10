var express = require("express");
var app = express();

var http = require("http").createServer(app);
var socketIO = require("socket.io")(http, {
	cors: {
		origin: "*"
	}
});

var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "localhost",
	// port: 8889,
	user: "root",
	password: "",
	database: "test"
});

app.use(express.static('public'));

app.set('views', './views');

app.set('view engine', 'php');

app.get('/chatRoom', (req, res) =>{
	res.render('index.php')
})
connection.connect(function (error) {
	console.log("Database connected: " + error);
});

var users = [];
	
socketIO.on("connection", function (socket) {

	socket.on("connected", function (userId) {
		users[userId] = socket.id;

		console.log("User connected: " + socket.id + ", userId = " + userId);
	});

	socket.on("sendEvent", async function (data) {
		connection.query("SELECT * FROM users WHERE id = " + data.userId, function (error, receiver) {
			if (receiver != null) {
				if (receiver.length > 0) {

					connection.query("SELECT * FROM users WHERE id = " + data.myId, function (error, sender) {
						if (sender.length > 0) {
							var message = "New message received from: " + sender[0].name + ". Message: " + data.message;
							socketIO.to(users[receiver[0].id]).emit("messageReceived", message);
						}
					});
				}
			}
		});
	});
});

http.listen(process.env.PORT || 3000, function () {
	console.log("Server is started.");
});