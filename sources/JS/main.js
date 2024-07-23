
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






const DIAGRAMME = new IBD("Teste","mon Systeme");

SCENE.addChild(DIAGRAMME);
SCENE.DIAGRAMME = DIAGRAMME;









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
		
		// Affichage / Caché des objets
		for(var i=0;i<DIAGRAMME.CONTENU.children.length; i++)
		{
			var elem = DIAGRAMME.CONTENU.children[i];
			if(elem instanceof ObjetGraphique)
				elem.checkZoom(DIAGRAMME.unite());
		}
		
		
	});
	



createjs.Ticker.setFPS(40);
createjs.Ticker.addEventListener("tick", SCENE);
