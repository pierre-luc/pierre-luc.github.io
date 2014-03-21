<?php 
	if ( $root === './' ) {
		?>
			<header id="header">
		<?php
	} else {
		?>
			<header id="header" class="global">
		<?php
	}
?>		
		<a class="clear" href="<?php echo $root;?>">		
				<div id="title">
					<span class="ink-green">Pierre-Luc BLOT</span>
					<span class="ink-blue">Concepteur web</span>
				</div>
			</a>
		</header>