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
ajouteFlux = function(_options_)
{

	// par défaut
	var bloc1 = null
	var bloc2 = null
	var p1={'X':0, 'Y':0, 'theta':0}
	var p2={'X':20, 'Y':0, 'theta':0}

	// On récupère les options de position
	if("p1" in _options_)
	{
		if("X" in _options_.p1)
			p1.X=_options_.p1.X;
		if("Y" in _options_.p1)
			p1.Y=_options_.p1.Y;
		if("theta" in _options_.p1)
			p1.theta = _options_.p1.theta

		if("blocParent" in _options_.p1 && _options_.p1.blocParent)
		{
			bloc1 = DIAGRAMME.CONTENU.getChildByName(_options_.p1.blocParent)
		}
	}

	if("p2" in _options_)
	{
		if("X" in _options_.p2)
			p2.X=_options_.p2.X;
		if("Y" in _options_.p2)
			p2.Y=_options_.p2.Y;
		if("theta" in _options_.p2)
			p2.theta = _options_.p2.theta

		if("blocParent" in _options_.p2 && _options_.p2.blocParent)
		{
			bloc2 = DIAGRAMME.CONTENU.getChildByName(_options_.p2.blocParent)
		}
	}
	var position1 = new Position(p1.X, p1.Y, p1.theta)
	var position2 = new Position(p2.X, p2.Y, p2.theta)

	
	var flux = new Flux(position1, position2, bloc1, bloc2, _options_)
	
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
/** Ouvre la boite de dialogue qui permet de modifier les infos du flux.
 * @param {BlocIBD} _obj_ - Référence vers l'objet
*/
ouvreBoiteEditeFlux = function(_obj_)
{
	if(_obj_.sens())
			$("#BOITE_EDITE_FLUX_input_sens").val(_obj_.sens());
		else
			$("#BOITE_EDITE_FLUX_input_sens").val("aucun");

	if(_obj_.nature())
			$("#BOITE_EDITE_FLUX_input_nature").val(_obj_.nature());
		else
			$("#BOITE_EDITE_FLUX_input_nature").val("aucun");

	$( "#BOITE_EDITE_FLUX_input_imposeCouleur" ).prop( "checked", _obj_.couleurImposee());
	$( "#BOITE_EDITE_FLUX_input_imposeEpaisseur" ).prop( "checked", _obj_.epaisseurImposee());

	$("#boiteEditeFlux").data("nomBloc",_obj_.name); // Stocke la donnée dans le code HTML (mais ou ?)
	$("#boiteEditeFlux").dialog("open")
}


		
// ---------------------------------------
/** Fonction qui récupère les données du formulaire "#boiteEditeFlux" pour les mettre dans le Flux
*/
updateFluxFromDialog = function()
{
	var flux = DIAGRAMME.CONTENU.getChildByName($("#boiteEditeFlux").data("nomBloc"));
	
	var nature = $("#BOITE_EDITE_FLUX_input_nature").val()
	if(nature == "aucune")
		flux.nature(null)
	else
		flux.nature(nature)

	var sens = $("#BOITE_EDITE_FLUX_input_sens").val()
		if(sens == "aucun")
			flux.sens(null)
		else
			flux.sens(sens)
	
	if(!$('#BOITE_EDITE_FLUX_input_imposeCouleur').is(":checked"))
		flux.couleur(null)
	
	if(!$('#BOITE_EDITE_FLUX_input_imposeEpaisseur').is(":checked"))
		flux.epaisseur(null)

	

	flux.redessine();
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



// ---------------------------------------
/** Vérifie si chaque objet est censé être visible ou non (et déclenche l'appariation/la disparition le cas échéant)
*/
checkVisibiliteToutLeMonde = function()
{
	for(var i=0; i<DIAGRAMME.CONTENU.children.length; i++)
	{
		var elem = DIAGRAMME.CONTENU.children[i];
		if(typeof elem.checkVisibilite === "function")
			elem.checkVisibilite();
	}
}




		
// ---------------------------------------
/** Ouvre la boite de dialogue qui permet de modifier les infos du port.
 * @param {Port} _obj_ - Référence vers l'objet
*/
ouvreBoiteEditePort = function(_obj_)
{
	$("#BOITE_EDITE_PORT_input_nom" ).val( _obj_.nom());

	$("#boiteEditePort").data("nomPort",_obj_.name) ; // Stocke la donnée dans le code HTML (mais ou ?)
	$("#boiteEditePort").data("nomFlux",_obj_.parent.name) ; // Stocke la donnée dans le code HTML (mais ou ?)
	$("#boiteEditePort").dialog("open") ;
}


		
// ---------------------------------------
/** Fonction qui récupère les données du formulaire "#boiteEditePort" pour les mettre dans le Port
*/
updatePortFromDialog = function()
{
	var flux = DIAGRAMME.CONTENU.getChildByName($("#boiteEditePort").data("nomFlux"));
	var port = flux.getChildByName($("#boiteEditePort").data("nomPort"));
	
	port.nom($("#BOITE_EDITE_PORT_input_nom").val());



	flux.redessine();
}