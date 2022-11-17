

<?php
	$conn = new PDO("mysql:host=localhost;dbname=test", "root", "");
	$sql = "SELECT * FROM users";
	$result = $conn->prepare($sql);
	$result->execute([]);
	$users = $result->fetchAll();
?>

<table>
	<thead>
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Action</th>
		</tr>
	</thead>

	<tbody>
		<?php foreach ($users as $user): ?>
			<tr>
				<td><?php echo $user['id']; ?></td>
				<td><?php echo $user['name']; ?></td>
				<td>
					<form method="POST" onsubmit="return sendEvent(this);">
						<input type="hidden" name="id" value="<?php echo $user['id']; ?>" required />
						<input type="text" name="message" id="message" required />
						<input type="submit" value="Send Message" />
					</form>
				</td>
			</tr>
		<?php endforeach; ?>
	</tbody>
</table>

<h3 id="my-id"></h3>
<ul id="messages"></ul>
<ul id="messages2"></ul>

<script src="socket.io.js"></script>
<script>

	var userId = prompt("Enter user ID");

	var socketIO = io("http://localhost:3000");
	socketIO.emit("connected", userId);

	document.getElementById("my-id").innerHTML = "Your ID is: " + userId;

	socketIO.on("messageReceived", function (data) {
		var html = "<li>" + data + "</li>";
		document.getElementById("messages").innerHTML = html + document.getElementById("messages").innerHTML;
	});
	socketIO.on("messageSent", function (data) {
		var html = "<li>" + data + "</li>";
		document.getElementById("messages2").innerHTML = html + document.getElementById("messages2").innerHTML;
	});
	
	// let message;
	function sendEvent(form) {
		event.preventDefault();

		// let message = prompt("Enter message");
		socketIO.emit("sendEvent", {
			"myId": userId,
			"userId": form.id.value,
			"message": form.message.value
		});
		form.message.value = '';
	}
	
</script>
