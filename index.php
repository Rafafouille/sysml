
<!DOCTYPE html>
<html>
    <head>
        <!-- En-tête de la page -->
        <meta charset="utf-8" />
        <title>SysML</title>
		<link rel="stylesheet" href="./sources/style/style.css" />
		<script type="text/javascript" src="./sources/JS/fonctions.js"></script>
		
		<!-- JQUERY -->
		<link rel="stylesheet" href="https://libs.allais.eu/jquery/jquery-ui/jquery-ui.css">
		<script type="text/javascript" src="https://libs.allais.eu/jquery/jquery-ui/external/jquery/jquery.js"></script>
		<script type="text/javascript" src="https://libs.allais.eu/jquery/jquery-ui/jquery-ui.min.js"></script>

		<!-- CREATE JS -->
		<script type="text/javascript" src="https://libs.allais.eu/createJS/EaselJS-0.8.2/lib/easeljs-0.8.2.min.js"></script>
		<script type="text/javascript" src="https://libs.allais.eu/createJS/Tweenjs-0.6.2/tweenjs-0.6.2.min.js"></script>
		<script type="text/javascript" src="https://libs.allais.eu/createJS/easelJS-plus.js"></script>
		
		<!-- CLASSES -->
		
		<script type="text/javascript" src="./sources/JS/classes/CLASS_Position.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS_Diagramme.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS_IBD.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS_objetGraphique.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS_Bloc.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS_BlocIBD.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS_Port.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS_Flux.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS_MenuContextuel.js"></script>

		
		
		<!--<script type="text/javascript" src="./sources/JS/main.js"></script>-->


		<script>

		</script>

    </head>

	<body>
		
		<div id="menu">
			<div class="bouton" onclick="ouvreBoiteGenereCode()">
				Génere code
			</div>
			<div class="bouton" onclick="ajouteFlux({  'p1':{'X':(-DIAGRAMME.CONTENU.x+$('#canvas').width()/3)/DIAGRAMME.unite(), 'Y':(-DIAGRAMME.CONTENU.y+$('#canvas').height()/2)/DIAGRAMME.unite()},   'p2':{'X':(-DIAGRAMME.CONTENU.x+$('#canvas').width()/3*2)/DIAGRAMME.unite(), 'Y':(-DIAGRAMME.CONTENU.y+$('#canvas').height()/2)/DIAGRAMME.unite(), 'theta':180}  })">
				Ajoute flux
			</div>
			<div class="bouton" onclick="ajouteBlocIBD({'nomInstance':'nouveau bloc','X':(-DIAGRAMME.CONTENU.x+$('#canvas').width()/2)/DIAGRAMME.unite(), 'Y':(-DIAGRAMME.CONTENU.y+$('#canvas').height()/2-100)/DIAGRAMME.unite(),'LARGEUR':100/DIAGRAMME.unite(), 'HAUTEUR':100/DIAGRAMME.unite()})">
				Ajoute bloc
			</div>
			<div class="bouton" onclick="arreteAnimations()">
				Arreter Animer
			</div>
			<div class="bouton" onclick="animerTout()">
				Animer tout
			</div>
		</div>
		
		
		<h1>SysML</h1>

		<div id="scene">
			 <canvas id="canvas" width="800" height="500" oncontextmenu="event.preventDefault();"></canvas>
		</div>

	</body>


	<script type="text/javascript" src="/sources/JS/main.js"></script>
	
	
	<?php
	include_once("./sources/php/boites.php");
	
	if(isset($_GET['systeme']))
	{
		echo "<script type=\"text/javascript\" src=\"./systemes/".$_GET['systeme']."/init.js\"></script>";
	}
	?>
	
	
	
</html>
