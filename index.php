
<!DOCTYPE html>
<html>
    <head>
        <!-- En-tête de la page -->
        <meta charset="utf-8" />
        <title>SysML</title>
		<link rel="stylesheet" href="./sources/style/style.css" />
		<script type="text/javascript" src="/sources/JS/fonctions.js"></script>
		
		<!-- JQUERY -->
		<link rel="stylesheet" href="https://libs.allais.eu/jquery/jquery-ui/jquery-ui.css">
		<script type="text/javascript" src="https://libs.allais.eu/jquery/jquery-ui/external/jquery/jquery.js"></script>
		<script type="text/javascript" src="https://libs.allais.eu/jquery/jquery-ui/jquery-ui.min.js"></script>

		<!-- CREATE JS -->
		<script type="text/javascript" src="https://libs.allais.eu/createJS/EaselJS-0.8.2/lib/easeljs-0.8.2.min.js"></script>
		<script type="text/javascript" src="https://libs.allais.eu/createJS/Tweenjs-0.6.2/tweenjs-0.6.2.min.js"></script>
		<script type="text/javascript" src="https://libs.allais.eu/createJS/easelJS-plus.js"></script>
		
		<!-- CLASSES -->
		
		<script type="text/javascript" src="/sources/JS/classes/CLASS_Diagramme.js"></script>
		<script type="text/javascript" src="/sources/JS/classes/CLASS_IBD.js"></script>
		<script type="text/javascript" src="/sources/JS/classes/CLASS_objetGraphique.js"></script>
		<script type="text/javascript" src="/sources/JS/classes/CLASS_Bloc.js"></script>
		<script type="text/javascript" src="/sources/JS/classes/CLASS_BlocIBD.js"></script>
		<script type="text/javascript" src="/sources/JS/classes/CLASS_Port.js"></script>
		<script type="text/javascript" src="/sources/JS/classes/CLASS_Flux.js"></script>

		
		
		<!--<script type="text/javascript" src="./sources/JS/main.js"></script>-->


		<script>

		</script>

    </head>

	<body>
		<h1>SysML</h1>

		<div id="scene">
			 <canvas id="canvas" width="800" height="500"></canvas>
		</div>

	</body>


	<script type="text/javascript" src="/sources/JS/main.js"></script>
	
	
	<?php
	include_once("./sources/php/boites.php");
	?>
	
	
	
</html>
