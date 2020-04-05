<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
 "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head><title>Account Creation</title></head>
	<body>
		<h1>New account created.</h1>
		<p>
<?php
$name = $_REQUEST["name"];
$email = $_REQUEST["email"];
?>
			Thank you, "<?= $name ?>", for creating an account with <?= $email ?>.
		</p>
	</body>
</html>
