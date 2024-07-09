
// Dimensions du CANVAS ====================================
$("#canvas").attr("width",window.innerWidth-10);
$("#canvas").attr("height",window.innerHeight-100);
$(window).on('resize', function(){
		$("#canvas").attr("width",window.innerWidth-10);
		$("#canvas").attr("height",window.innerHeight-100);
		SCENE.DIAGRAMME.redessine(true);
		});


// SCENE ====================================================
var SCENE = new createjs.Stage("canvas");
SCENE.enableMouseOver();
SCENE.mouseMoveOutside = false; 






DIAGRAMME = new IBD("Teste","mon Systeme");

SCENE.addChild(DIAGRAMME);
SCENE.DIAGRAMME = DIAGRAMME;



// DESSIN DU DIAGRAMME ==============================

BLOC = ajouteBloc("blocs test1", "type test");
BLOC.largeur(300);
BLOC.hauteur(100);
BLOC2 = ajouteBloc("blocs test2", "type test",{x:500, y:250});
BLOC3 = ajouteBloc("blocs test3", "type test",{x:400, y:300});

/*PORT = new Port(50,70)
DIAGRAMME.CONTENU.addChild(PORT);*/

FLUX = new Flux({x:100,y:100,theta:-180}, {x:500, y:200, theta:0},null, BLOC2)
DIAGRAMME.CONTENU.addChild(FLUX);
FLUX.sens("un",false);





DIAGRAMME.redessine();
SCENE.update();



// EVENEMENTS ZOOM/DEPLACEMENTS =========================

SCENE.on("stagemousedown", function(evt)
{
	if(evt.nativeEvent.which === 2)
	{
		SCENE.mouseOffset = {x:DIAGRAMME.CONTENU.x-evt.stageX, y:DIAGRAMME.CONTENU.y-evt.stageY}
		
		SCENE.on("stagemousemove", function(evt)
		{
			DIAGRAMME.CONTENU.x = evt.stageX + SCENE.mouseOffset.x;
			DIAGRAMME.CONTENU.y = evt.stageY + SCENE.mouseOffset.y;
		})
		
		
		
		SCENE.on("stagemouseup",function(evt)
		{
			
			SCENE.removeAllEventListeners("stagemousemove");
			SCENE.removeAllEventListeners("stagemouseup");
		})
	}
})


//Souris (zoom)
document.getElementById('canvas').addEventListener("wheel",function(evt)
	{
		if(evt.wheelDelta>0)
			var factor = 1.1;
		else
			var factor = 1/1.1;
			
		var posCancas = evt.target.getBoundingClientRect();
		var x0 = (evt.pageX-posCancas.left -DIAGRAMME.CONTENU.x);
		var y0 = (evt.pageY-posCancas.top -DIAGRAMME.CONTENU.y);
		DIAGRAMME.CONTENU.x += x0*(1-factor);
		DIAGRAMME.CONTENU.y += y0*(1-factor);
		
		DIAGRAMME.zoom(factor,true);
		
		
	});



createjs.Ticker.setFPS(40);
createjs.Ticker.addEventListener("tick", SCENE);
