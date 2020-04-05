<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
 "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head><title>CSE 190 M: Embedded PHP</title></head>
	
	<body>
		<h1>Geneva's Counting Page</h1>
		<p>Watch how high I can count:
<?php
for ($i = 1; $i <= 10; $i++) {
?>			

			<? $i ?>
<?php
}
?>
		</p>
	</body>
</html>
