// DESSIN DU DIAGRAMME ==============================


BLOC = ajouteBlocIBD({"zoomLimite":0,"cache":false,"tempsAnimation":200,"X":500,"Y":100,"theta":0,"tailleTitre":12,"titre":"","epaisseurLigneSeparations":1,"epaisseurLigneCadre":2,"couleur":"#fff4d2","marge":5,"deplacable":true,"LARGEUR":400,"HAUTEUR":300,"nomInstance":"instance1","classe":"maClasse"})
BLOC2 = ajouteBlocIBD({"zoomLimite":1.1,"cache":true,"tempsAnimation":200,"X":400,"Y":150,"theta":0,"tailleTitre":12,"titre":"","epaisseurLigneSeparations":1,"epaisseurLigneCadre":2,"couleur":"#fff4d2","marge":5,"deplacable":true,"LARGEUR":100,"HAUTEUR":200,"nomInstance":"","classe":"Alimentation"})
BLOC3 = ajouteBlocIBD({"zoomLimite":1.5,"cache":true,"tempsAnimation":200,"X":400,"Y":200,"theta":0,"tailleTitre":12,"titre":"","epaisseurLigneSeparations":1,"epaisseurLigneCadre":2,"couleur":"#fff4d2","marge":5,"deplacable":true,"LARGEUR":70,"HAUTEUR":50,"nomInstance":"","classe":"Alimentation"})

///BLOC = ajouteBlocIBD({nomInstance:"instance1", classe:"maClasse", X:500, Y:100, largeur:400, hauteur:300});


///BLOC2 = ajouteBlocIBD({classe:"Alimentation", X:400, Y:150, largeur:100, hauteur:200,zoomLimite:1.1});
/*BLOC3 = ajouteBloc("blocs test3", "type test",{X:400, Y:300,zoomLimite:2});/*

/*PORT = new Port(50,70)
DIAGRAMME.CONTENU.addChild(PORT);*/

//FLUX = new Flux({x:100,y:100,theta:-180}, {x:800, y:250, theta:0},BLOC, BLOC2,{zoomLimite:2})
/*FLUX = new Flux(null,null,BLOC, BLOC2,{zoomLimite:2})
DIAGRAMME.CONTENU.addChild(FLUX);
FLUX.sens("un",false);

FLUX2 = new Flux(null,null,BLOC, BLOC3,{zoomLimite:1.5})
DIAGRAMME.CONTENU.addChild(FLUX2);
FLUX2.sens("DOUBLE",false);
*/

DIAGRAMME.redessine();
SCENE.update();

