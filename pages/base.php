<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title><?php echo $title; ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<link rel="stylesheet" href="<?php echo $root; ?>css/style.css" media="screen"/>

		<script src="<?php echo $root; ?>js/jQuery.1.10.2.min.js"></script>
		<script src="<?php echo $root; ?>js/mustache.js"></script>
		<script src="<?php echo $root; ?>js/global.js"></script>
	</head>
	<body>
		<?php
			include_once ( __DIR__ . '/header.php' );
			if ( file_exists( __DIR__ . '/' . $page ) ) {
				include_once( __DIR__ . '/' . $page );
			} 
			include_once( __DIR__ . '/footer.php' );

		?>
		
	</body>	
</html>