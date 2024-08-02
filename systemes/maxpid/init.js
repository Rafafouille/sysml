// DESSIN DU DIAGRAMME ==============================


BLOC = ajouteBlocIBD({"zoomLimite":0,"cache":false,"tempsAnimation":200,"X":764.5,"Y":42,"theta":0,"tailleTitre":12,"titre":"","epaisseurLigneSeparations":1,"epaisseurLigneCadre":2,"couleur":"#fff4d2","marge":5,"deplacable":true,"LARGEUR":1437,"HAUTEUR":604,"taillePoignees":20,"nomInstance":"Maxpid","classe":"Système"})
/*BLOC1 = ajouteBlocIBD({"zoomLimite":0,"cache":false,"tempsAnimation":200,"X":356.83759688827615,"Y":108.8,"theta":0,"tailleTitre":12,"titre":"","epaisseurLigneSeparations":1,"epaisseurLigneCadre":2,"couleur":"#fff4d2","marge":5,"deplacable":true,"LARGEUR":501.2751937765522,"HAUTEUR":144.00000000000023,"taillePoignees":20,"nomInstance":"Alimentation","classe":""})
ajouteBlocIBD({"zoomLimite":2.1435888100000065,"cache":false,"tempsAnimation":200,"X":524.31374638357,"Y":192.11963469803703,"theta":0,"tailleTitre":12,"titre":"","epaisseurLigneSeparations":1,"epaisseurLigneCadre":2,"couleur":"#fff4d2","marge":5,"deplacable":true,"LARGEUR":66.41146862489927,"HAUTEUR":50.55021769776839,"taillePoignees":20,"nomInstance":"Voyant de puissance","classe":""})
ajouteBlocIBD({"zoomLimite":2.1435888100000065,"cache":false,"tempsAnimation":200,"X":554.6367260972029,"Y":126.80860146867447,"theta":0,"tailleTitre":12,"titre":"","epaisseurLigneSeparations":1,"epaisseurLigneCadre":2,"couleur":"#fff4d2","marge":5,"deplacable":true,"LARGEUR":55.2152914998657,"HAUTEUR":47.75117341651,"taillePoignees":20,"nomInstance":"Fusible de sortie","classe":"Protection"})
ajouteBlocIBD({"zoomLimite":2.143588810000003,"cache":false,"tempsAnimation":200,"X":481.24470552139695,"Y":130.34788886563715,"theta":0,"tailleTitre":12,"titre":"","epaisseurLigneSeparations":1,"epaisseurLigneCadre":2,"couleur":"#fff4d2","marge":5,"deplacable":true,"LARGEUR":53.734805268456256,"HAUTEUR":44.867309611577035,"taillePoignees":20,"nomInstance":"Condensateur","classe":"Filtre"})
ajouteBlocIBD({"zoomLimite":2.143588810000003,"cache":false,"tempsAnimation":200,"X":406.7315250599305,"Y":128.16147287128254,"theta":0,"tailleTitre":12,"titre":"","epaisseurLigneSeparations":1,"epaisseurLigneCadre":2,"couleur":"#fff4d2","marge":5,"deplacable":true,"LARGEUR":68.58284843096638,"HAUTEUR":45.605239467545154,"taillePoignees":20,"nomInstance":"Redresseur","classe":"Convertisseur"})
ajouteBlocIBD({"zoomLimite":2.143588810000003,"cache":false,"tempsAnimation":200,"X":330.50113478734437,"Y":126.26884086347359,"theta":0,"tailleTitre":12,"titre":"","epaisseurLigneSeparations":1,"epaisseurLigneCadre":2,"couleur":"#fff4d2","marge":5,"deplacable":true,"LARGEUR":56.587825610234844,"HAUTEUR":44.867309611577,"taillePoignees":20,"nomInstance":"Transformateur","classe":"Filtre"})
ajouteBlocIBD({"zoomLimite":2.1435888100000056,"cache":false,"tempsAnimation":200,"X":177.5291238403904,"Y":122.82208385597315,"theta":0,"tailleTitre":12,"titre":"","epaisseurLigneSeparations":1,"epaisseurLigneCadre":2,"couleur":"#fff4d2","marge":5,"deplacable":true,"LARGEUR":49.9564810320469,"HAUTEUR":48.6841881769295,"taillePoignees":20,"nomInstance":"Fusible d'entrée","classe":"Protection"})
ajouteBlocIBD({"zoomLimite":2.1435888100000073,"cache":false,"tempsAnimation":200,"X":249.7741531301424,"Y":126.80860146867498,"theta":0,"tailleTitre":12,"titre":"","epaisseurLigneSeparations":1,"epaisseurLigneCadre":2,"couleur":"#fff4d2","marge":5,"deplacable":true,"LARGEUR":65.9449612446896,"HAUTEUR":50.0837103175587,"taillePoignees":20,"nomInstance":"Bouton M/A","classe":"Interrupteur"})
*/

///BLOC = ajouteBlocIBD({nomInstance:"instance1", classe:"maClasse", X:500, Y:100, largeur:400, hauteur:300});


///BLOC2 = ajouteBlocIBD({classe:"Alimentation", X:400, Y:150, largeur:100, hauteur:200,zoomLimite:1.1});
/*BLOC3 = ajouteBloc("blocs test3", "type test",{X:400, Y:300,zoomLimite:2});/*

/*PORT = new Port(50,70)
DIAGRAMME.CONTENU.addChild(PORT);*/

/*FLUX = new Flux(new Position(100,100), new Position(300, 400),null,null,{"sens":"un"})
DIAGRAMME.CONTENU.addChild(FLUX);
*/

/*FLUX2 = new Flux(null,null,BLOC, BLOC3,{zoomLimite:1.5})
DIAGRAMME.CONTENU.addChild(FLUX2);
FLUX2.sens("DOUBLE",false);
*/

DIAGRAMME.redessine();
SCENE.update();




