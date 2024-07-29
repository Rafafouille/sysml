ajouteBlocIBD = function(_options_)
{
	var bloc = new BlocIBD(_options_)
	//bloc.position(position,false);
	
	// Visibilité
	//bloc.alpha = Boolean(bloc.zoomLimite() < DIAGRAMME.unite());
	
	
	// Ajout sur la scene
	DIAGRAMME.CONTENU.addChild(bloc);
	bloc.redessine(false);
	
	
	
	// Si pas de dimension définie....
	if(typeof(_options_)!="undefined")
	{
	/*	if(typeof(_options_.LARGEUR)=="undefined")
			bloc.fitLargeur();
		if(typeof(_options_.HAUTEUR)=="undefined")
			bloc.fitHauteur();*/
	}
	
	
	
	
	// Appartenance à un bloc parent
	var elem = bloc.elementDirectementEnDessous();
	if(elem) // S'il y a un élément en dessous
		elem.ajouteBlocEnfant(bloc);
	
	
	return bloc
}





isExtremum= function(X1,Y1,X2,Y2,X3,Y3)
{
	if((X2-X1)*(X2-X3)>0)
		return {X:X2, Y:Y2, d:"v"}
	if((Y2-Y1)*(Y2-Y3)>0)
		return {X:X2, Y:Y2, d:"h"}
	return null;
}






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


// Renvoie si l'angle (en °) est plutot horizontal ("h") ou vertical ("v");
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
