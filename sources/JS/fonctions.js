ajouteBloc = function(nom="", type="", position={x:200,y:200})
{
	var bloc = new BlocIBD(nom,type)
	bloc.position(position,false);
	DIAGRAMME.CONTENU.addChild(bloc);
	bloc.redessine(false);
	bloc.fit();
	
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
