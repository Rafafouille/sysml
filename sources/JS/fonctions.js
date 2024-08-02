/** Crée le loc IBD, l'ajoute au contenu, et l'ajoute à un bloc parent s'il y a lieu
 * @return {BlocIBD} Référence du bloc nouvellement créé.
*/
ajouteBlocIBD = function(_options_)
{
	var bloc = new BlocIBD(_options_)

	// Ajout sur la scene
	DIAGRAMME.CONTENU.addChild(bloc);
	bloc.redessine(false);
		
	// Appartenance à un bloc parent
	var elem = bloc.elementDirectementEnDessous();
	if(elem) // S'il y a un élément en dessous
		elem.ajouteBlocEnfant(bloc);
	
	return bloc
}




/** Crée un flux
 * @return {Flux} Référence du flux nouvellement créé.
*/
ajouteFlux = function(_p1_, _p2_, _options_)
{
	var flux = new Flux(_p1_,_p2_)
	
	DIAGRAMME.CONTENU.addChild(flux);
	flux.redessine();

	return flux
}




/** Fonction qui dit si une courbe (composée de 3 points consécutifs (X1,Y1), (X2,Y2) et (X3,Y3))
possède une tangeante horizontale ou vertical en (X2,Y2) (c'est à dire qu'il y a un extremim entre (X1,X2,X3) ou (Y1,Y2,Y3)
 * @param {number} Coordonnée sur x du point 1
 * @param {number} Coordonnée sur y du point 1
 * @param {number} Coordonnée sur x du point 2
 * @param {number} Coordonnée sur y du point 2
 * @param {number} Coordonnée sur x du point 3
 * @param {number} Coordonnée sur y du point 3
 * @return {Object} Position du point (X2,Y2) muni de sa direction ("h" pour "horizontal" et "v" pour "vertical"), de la forme : {X: , Y: , d:}
*/
isExtremum= function(X1,Y1,X2,Y2,X3,Y3)
{
	if((X2-X1)*(X2-X3)>0)
		return {X:X2, Y:Y2, d:"v"}
	if((Y2-Y1)*(Y2-Y3)>0)
		return {X:X2, Y:Y2, d:"h"}
	return null;
}










/** Fonction qui dit si une courbe (composée de 3 points consécutifs (X1,Y1), (X2,Y2), (X3,Y3) et (X4,Y4))
possède un point d'inflexion entre (X1,Y1) et (X4,Y4). Par défaut, on supposera qu'il est au milieu de (X2,Y2) et (X3,Y3).
 * @param {number} Coordonnée sur x du point 1
 * @param {number} Coordonnée sur y du point 1
 * @param {number} Coordonnée sur x du point 2
 * @param {number} Coordonnée sur y du point 2
 * @param {number} Coordonnée sur x du point 3
 * @param {number} Coordonnée sur y du point 3
 * @param {number} Coordonnée sur x du point 4
 * @param {number} Coordonnée sur y du point 4
 * @return {Object} Position du point d'inflexion supposé, muni de sa tendance de direction ("h" pour "horizontal" et "v" pour "vertical"), de la forme : {X: , Y: , d:}
*/
isPointInflexion= function(X1,Y1,X2,Y2,X3,Y3,X4,Y4)
{
	var v1 = {x:X2-X1, y:Y2-Y1}
	var v2 = {x:X3-X2, y:Y3-Y2}
	var v3 = {x:X4-X3, y:Y4-Y3}

	var PV1 = v1.x*v2.y-v1.y*v2.x;
	var PV2 = v2.x*v3.y-v2.y*v3.x;
	
	if(PV1*PV2<=0)
	{
		{return {X:0.5*(X2+X3), Y:0.5*(Y2+Y3), d:verticalOuHorizontal(Math.atan2(Y3-Y2,X3-X2)*180/Math.PI)}}
	}
	return null;
}


// 
/** Renvoie si l'angle (en °) est plutot horizontal ("h") ou vertical ("v");
 * @param {number} Angle (en °)
 * @return {string} Direction "h" ou "v".
*/
verticalOuHorizontal = function(_angle_)
{
	_angle_ = _angle_%360;
	if(_angle_<0)
		_angle_+=360;
		
	if(_angle_<=45 || _angle_>=135 && _angle_<=225 || _angle_>=315)
		return "h";
	return "v";
}






		
// ---------------------------------------
/** Fonction qui définit le zoom limite comme étant le zoom actuel
 * @param {integer} [id] - id (au sens de CreateJS) de l'objet graphique concerné
*/
bloqueZoomLimite = function(_obj_)
{
	console.log(_obj_);
	_obj_.x+=100;
}



		
// ---------------------------------------
/** Ouvre la boite de dialogue qui affiche le code de génération du diagramme
*/
ouvreBoiteGenereCode = function()
{
	var texte = "";
	for(var i=0; i<DIAGRAMME.CONTENU.children.length; i++)
	{
		var obj = DIAGRAMME.CONTENU.children[i];
		if(typeof obj.getCommande !== "undefined")
			texte += obj.getCommande()+"\n";
	}
	

	$("#boiteGenereCode_contenu").text(texte) ;
	$("#boiteGenereCode").dialog("open") ;
}



		
// ---------------------------------------
/** Ouvre la boite de dialogue qui permet de modifier les infos de l'IBD
 * @param {BlocIBD} _obj_ - Référence vers l'objet
*/
ouvreBoiteEditeIBD = function(_obj_)
{
	$("#BOITE_EDITE_IBD_input_nomInstance").val(_obj_.nomInstance());
	$("#BOITE_EDITE_IBD_input_classe").val(_obj_.classe());
	$("#BOITE_EDITE_IBD_input_X").val(_obj_.X());
	$("#BOITE_EDITE_IBD_input_Y").val(_obj_.Y());
	$("#BOITE_EDITE_IBD_input_LARGEUR").val(_obj_.LARGEUR());
	$("#BOITE_EDITE_IBD_input_HAUTEUR").val(_obj_.HAUTEUR());

	$("#boiteEditeBlocIBD").data("nomBloc",_obj_.name); // Stocke la donnée dans le code HTML (mais ou ?)
	$("#boiteEditeBlocIBD").dialog("open");
}
		
// ---------------------------------------
/** Fonction qui récupère les données du formulaire "#boiteEditeBlocIBD" pour les mettre dans le blocIBD
*/
updateBlocIBDFromDialog = function()
{
	var elem = DIAGRAMME.CONTENU.getChildByName($("#boiteEditeBlocIBD").data("nomBloc"));
	
	elem.nomInstance($("#BOITE_EDITE_IBD_input_nomInstance").val(),false)
	elem.classe($("#BOITE_EDITE_IBD_input_classe").val(),false)
	elem.X(Number($("#BOITE_EDITE_IBD_input_X").val()),false);
	elem.Y(Number($("#BOITE_EDITE_IBD_input_Y").val()),false);
	elem.LARGEUR(Number($("#BOITE_EDITE_IBD_input_LARGEUR").val()),false);
	elem.HAUTEUR(Number($("#BOITE_EDITE_IBD_input_HAUTEUR").val()),false);
	
	elem.redessine();
}



		
// ---------------------------------------
/** Renvoie la reférence du bloc dont le bord est le plus proche d'un point
 * @param {Position} _pos_ - La position
 * @return {object} Référence vers le bloc le plus proche {"bloc":reference_vers_le_bloc, "dist": distance_au_bord}
*/
getBlocBordProche = function(_pos_)
{
	var best = null
	var distBest = Infinity
	for(i=0; i<DIAGRAMME.CONTENU.children.length; i++)
	{
		obj = DIAGRAMME.CONTENU.children[i];
		if(obj instanceof Bloc)
		{
			var dist = obj.getDistanceFromBords(_pos_)
			if(dist<distBest)
			{
				distBest = dist;
				best = obj
			}
		}
	}
	return {"bloc":best, "dist":distBest*DIAGRAMME.unite()}
}
