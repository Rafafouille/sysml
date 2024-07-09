


//=================================================
// FLUX
//=================================================
/** Flux entre deux blocs
 * @extends ObjetGraphique*/
class Flux extends ObjetGraphique
{


	
	//Membres **************************
		//Infos
		TYPE = "Flux"
		PORT1 = null;
		PORT2 = null;
		LIGNE = null;
		#sens = "in"; // "un" / "deux" / "double" / null
		#epaisseur = 3;
		#couleur = "#FF0000";
		#methode = "bezier_droit" ; // lineaire / bezier / bezier_droit
		#longueurQueue = 50;
		#distancePointControleBezier = 100;
		#pasBezier = 0.01 // Pas du paramètre t pour bezier ( 0 < t < 1)
		#courbeBezier = []; // Liste des points 
		#poigneesLignes = []; // Liste des points (de la forme {x:, y:, d:})
		
		
		
		
		
		
	// ****************************************************
	/** Constructeur
	 * @param {object} _p1_ - Position du départ (pour un zoom de 100%)
	 * @param {number} _p1_.x - Coordonnées sur x du point de départ
	 * @param {number} _p1_.y - Coordonnées sur y du point de départ
	 * @param {object} _p2_ - Position d'arrivée (pour un zoom de 100%)
	 * @param {number} _p2_.x - Coordonnées sur x du point d'arrivée
	 * @param {number} _p2_.y - Coordonnées sur y du point d'arrivée
	 * @param {Bloc} [_bloc1=null] - Bloc auquel rattacher le port de départ
	 * @param {Bloc} [_bloc2=null] - Bloc auquel rattacher le port d'arrivée
	*/
		constructor(_p1,_p2, _bloc1=null, _bloc2=null, _options_)
		{
			super();
			
			this.LIGNE = new createjs.Container();
			
			if(_bloc1)
			{
				var angle = Math.atan2(_p1.y - _bloc1.Y(), _p1.x - _bloc1.X())*180/Math.PI;
				var P = _bloc1.getCoordBord(angle);
				this.PORT1 = new Port(P.X, P.Y, P.theta);
			}
			else
				this.PORT1 = new Port(_p1.x, _p1.y, _p1.theta);
				
				
			if(_bloc2)
			{
				var angle = Math.atan2(_p2.y - _bloc2.Y(), _p2.x - _bloc2.X())*180/Math.PI;
				var P = _bloc2.getCoordBord(angle);
				this.PORT2 = new Port(P.X, P.Y, P.theta);
			}
			else
				this.PORT2 = new Port(_p2.x, _p2.y, _p2.theta);
			
			this.addChild(this.LIGNE);
			this.addChild(this.PORT1);
			this.addChild(this.PORT2);
			//this.sens("un");
		}
	
	

	// Getters / Setters ******************************
	
	
		// ---------------------------------------
		//  Sens du flux ("un", "deux", "double", null)
		
		
		// ---------------------------------------
		/** Sens du flux. (getter/setter)
		 * @param {string} [_s_] - Sens. Pour un angle nul, "un" = de PORT1 vers PORT2 ; "deux" = de PORT2 vers PORT 1, "double" = Double sens, null = pas de sens)
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Sens (final).
		*/
		sens(_s_, _redessine_=true)
		{
			if(typeof(_s_) != 'undefined')
			{
				this.#sens = _s_;
				if(_s_=="un")
				{
					this.PORT1.sens("out");
					this.PORT2.sens("in");
				}
				else if(_s_=="deux")
				{
					this.PORT1.sens("in");
					this.PORT2.sens("out");
				}
				else if(_s_="double")
				{
					this.PORT1.sens("double");
					this.PORT2.sens("double");
				}
				else
				{
					this.PORT1.sens(null);
					this.PORT2.sens(null);
				}
				
				if(_redessine_)
					{this.redessine();}
			}
			return this.#sens;
		}
		
		
		// ---------------------------------------
		/** Epaisseur de trait du flux. (getter/setter)
		 * @param {number} [_e_] - Epaisseur. Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Epaisseur (final).
		*/
		epaisseur(_e_, _redessine_=true)
		{
			if(typeof(_e_) != 'undefined')
			{
				this.#epaisseur = _e_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#epaisseur;
		}
		
		
		// ---------------------------------------
		/** Couleur du trait du flux. (getter/setter)
		 * @param {number} [_c_] - Couleur (format html). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Couleur (final).
		*/
		couleur(_c_, _redessine_=true)
		{
			if(typeof(_c_) != 'undefined')
			{
				this.#couleur = _c_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#couleur;
		}
		
		
		
		// ---------------------------------------
		/** Méthode de tracé du flux, entre le PORT1 et le PORT2 (getter/setter)
		 * @param {string} [_m_] - Méthode. Peut être : "lineaire", "bezier", "bezier_droit"
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} La méthode utilisée (final).
		*/
		methode(_m_, _redessine_=true)
		{
			if(typeof(_m_) != 'undefined')
			{
				this.#methode = _m_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#methode;
		}
		
		
		
		// ---------------------------------------
		/** Longueur du trait qui débute/fini le flux, dans le sens du port, pour un zoom de 100%.  (getter/setter)
		 * @param {number} [_l_] - Longueur (en px)
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} La longueur (final).
		*/
		longueurQueue(_l_, _redessine_=true)
		{
			if(typeof(_l_) != 'undefined')
			{
				this.#longueurQueue = _l_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#longueurQueue;
		}
		
		
		
		// ---------------------------------------
		/** Distance entre le premier et le deuxième point de contrôle de la courbe de Bézier (dans le prolongement de la queue).
		 * De même pour l'avant dernier point de contrôle par rapport au dernier.
		 * @param {number} [_l_] - Longueur (en px)
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} La longueur (final).
		*/
		distancePointControleBezier(_l_, _redessine_=true)
		{
			if(typeof(_d_) != 'undefined')
			{
				this.#distancePointControleBezier = _d_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#distancePointControleBezier;
		}
		
		
		
		// ---------------------------------------
		/** Pas, pour le tracé discret de la courbe de bézier.
		 * Pour rappel, la courbe de Bézier est une courbe paramétrique, de paramètre t compris entre 0 et 1.
		 * Le pas doit donc être inférieur à 1.
		 * @param {number} [_p_] - Le pas.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Le pas (final).
		*/
		pasBezier(_p_, _redessine_=true)
		{
			if(typeof(_p_) != 'undefined')
			{
				this.#pasBezier = _p_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#pasBezier;
		}
		
		
		
		// ---------------------------------------
		/** Renvoie les coordonnées du point en bout de queue du port 1.
		 * @return {object} Coordonnées de la forme {x:, y:, d: } (d = "h" ou "v" si horizontal ou vertical)
		*/
		pointQueue1()
		{
			return {
				X:this.PORT1.X()+this.#longueurQueue*Math.cos(this.PORT1.rotation*Math.PI/180),
				Y:this.PORT1.Y()+this.#longueurQueue*Math.sin(this.PORT1.rotation*Math.PI/180),
				d:verticalOuHorizontal(this.PORT1.rotation)
				};
		}
		
		
		
		// ---------------------------------------
		/** Renvoie les coordonnées du point en bout de queue du port 2.
		 * @return {object} Coordonnées de la forme {x:, y:, d: } (d = "h" ou "v" si horizontal ou vertical)
		*/
		pointQueue2()
		{
			return {
				X:this.PORT2.X()+this.#longueurQueue*Math.cos(this.PORT2.rotation*Math.PI/180),
				Y:this.PORT2.Y()+this.#longueurQueue*Math.sin(this.PORT2.rotation*Math.PI/180),
				d:verticalOuHorizontal(this.PORT2.rotation)
				};
		}
		
		
		
		// ---------------------------------------
		/** Liste des points du tracé de la courbe de bezier
		 * @return {array} liste des points [ {X:, Y:}, {X:, Y:}, ...]
		*/
		courbeBezier(_p_, _redessine_=true)
		{
			if(typeof(_p_) != 'undefined')
			{
				this.#courbeBezier = _p_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#courbeBezier;
		}
		
		
		
		// ---------------------------------------
		/** Liste des coordonnées des poignées des lignes droites (mode "bezier_droit"), pour un zoom de 100%.
		 * @return {array} liste des points [ {X:, Y:}, {X:, Y:}, ...]
		*/
		poigneesLignes(_p_, _redessine_=true)
		{
			if(typeof(_p_) != 'undefined')
			{
				this.#poigneesLignes = _p_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#poigneesLignes;
		}
		
		
		
		// ---------------------------------------
		/** (re)Calcule la liste des points de la courbe de bezier, pour un zoom de 100%.
		 * @return {array} liste des points [ {X:, Y:}, {X:, Y:}, ...]
		*/
		resetBezier()
		{
			var P1 = this.pointQueue1();
			var P2 = this.pointQueue2();
			
			this.#courbeBezier = [];

			// Points de controle
			var P1C = {X : P1.X+this.#distancePointControleBezier*Math.cos(this.PORT1.rotation*Math.PI/180), Y : P1.Y+this.#distancePointControleBezier*Math.sin(this.PORT1.rotation*Math.PI/180)}
			var P2C = {X : P2.X+this.#distancePointControleBezier*Math.cos(this.PORT2.rotation*Math.PI/180), Y : P2.Y+this.#distancePointControleBezier*Math.sin(this.PORT2.rotation*Math.PI/180)}
			for(var t=this.#pasBezier; t<1; t+=this.#pasBezier)
			{
				var XX = P1.X * Math.pow(1-t,3)   + P1C.X* 3*t*Math.pow(1-t,2)   + P2C.X* 3* t*t*(1-t)  + P2.X * t*t*t;
				var YY = P1.Y * Math.pow(1-t,3)   + P1C.Y* 3*t*Math.pow(1-t,2)   + P2C.Y* 3* t*t*(1-t)  + P2.Y * t*t*t;
				this.#courbeBezier.push({X:XX, Y:YY});
			}
			return this.#courbeBezier;
		}
		
		
		
		// ---------------------------------------
		/** (re)Calcule les points les lignes brisées à partir de la courbe de bezier (mode "bezier_droit"), pour un zoom de 100%.
		 * @param {boolean} [_resetBezier_=true] Permet de recalculer la courbe de Bézier sur laquelle s'appuyer pour faire cette ligne.
		 * @return {array} liste des points [ {X:, Y:}, {X:, Y:}, ...]
		*/
		resetPointsLignesFromBezier(_resetBezier_=true)
		{
			this.#poigneesLignes = [this.pointQueue1()];
			
			if(_resetBezier_)
				this.resetBezier();
			
			
			var tag = true; //<-- Pour faire les pts d'inflexion qu'un coup sur deux
			for(var i=3;i<this.#courbeBezier.length; i++)
			{
				//console.log(this.#courbeBezier[i-2].X, this.#courbeBezier[i-2].Y, this.#courbeBezier[i-1].X, this.#courbeBezier[i-1].Y, this.#courbeBezier[i].X, this.#courbeBezier[i].Y);
				var extremum = isExtremum(this.#courbeBezier[i-2].X, this.#courbeBezier[i-2].Y, this.#courbeBezier[i-1].X, this.#courbeBezier[i-1].Y, this.#courbeBezier[i].X, this.#courbeBezier[i].Y);
				// Si on est une un extremum
				if(extremum)
					this.#poigneesLignes.push(extremum)
					
				if(tag) // Trick pour ne calculer qu'un coup sur 2
				{
					var pInflexion = isPointInflexion(this.#courbeBezier[i-3].X, this.#courbeBezier[i-3].Y,this.#courbeBezier[i-2].X, this.#courbeBezier[i-2].Y, this.#courbeBezier[i-1].X, this.#courbeBezier[i-1].Y, this.#courbeBezier[i].X, this.#courbeBezier[i].Y);
					if(pInflexion)
						tag = false;
				}
				else
				{
					var pInflexion=null;
					tag = true
				}
				// Si on est une un point d'inflexion
				if(pInflexion)
					this.#poigneesLignes.push(pInflexion)
			}
			
			
			// Dernier point
			this.#poigneesLignes.push(this.pointQueue2());
			
			return this.#poigneesLignes;
		}
		
		
	//Graphiques *******************************
	
		
		
		// ---------------------------------------
		/** Redessine et replace tout le bloc, de zéro.
		 * @param {boolean} [_update_=false] - Indique s'il faut mettre à jour la scène (stage).
		*/
	redessine(_update_)
	{
		this.LIGNE.removeAllChildren();
		
		var unit = this.unite();
		
		this.PORT1.redessine();
		this.PORT2.redessine();
		
		// Point au bout de la queue :
		var P1 = {X:this.PORT1.X()+this.#longueurQueue*Math.cos(this.PORT1.rotation*Math.PI/180),	Y:this.PORT1.Y()+this.#longueurQueue*Math.sin(this.PORT1.rotation*Math.PI/180)}
		var P2 = {X:this.PORT2.X()+this.#longueurQueue*Math.cos(this.PORT2.rotation*Math.PI/180),	Y:this.PORT2.Y()+this.#longueurQueue*Math.sin(this.PORT2.rotation*Math.PI/180)}
		
		
		var ligne = new createjs.Shape();
		ligne.graphics.setStrokeStyle(this.#epaisseur);
		ligne.graphics.beginStroke(this.#couleur);
		
		ligne.graphics.moveTo(this.PORT1.X()*unit, this.PORT1.Y()*unit);
		ligne.graphics.lineTo(P1.X*unit, P1.Y*unit);
		
		if(this.#methode=="lineaire") // LINEAIRE ==================
		{
			// rien
		}
		else if(this.#methode=="bezier") // BEZIER ====================
		{
			var courbe = this.resetBezier()
			for(var i=0; i<courbe.length; i++)
			{
				var P = courbe[i];
				ligne.graphics.lineTo(P.X*unit, P.Y*unit);
			}
			
		}
		else if(this.#methode=="bezier_droit") // BEZIER DROIT ==============
		{
			this.resetPointsLignesFromBezier();
			
			var P = {X: P1.X,    Y: P1.Y} // Point qui parcours les lignes
			
			
			for(var i=1; i<this.#poigneesLignes.length; i++)
			{
				var PE = this.#poigneesLignes[i];
				if(PE.d=="v")
					P.X = PE.X;
				if(PE.d=="h")
					P.Y = PE.Y;
					
				ligne.graphics.lineTo(P.X*unit, P.Y*unit);
					P.Y = PE.Y;
					P.X = PE.X;
				ligne.graphics.lineTo(P.X*unit, P.Y*unit);
			}
		}
		
		ligne.graphics.lineTo(P2.X*unit, P2.Y*unit);
		ligne.graphics.lineTo(this.PORT2.X()*unit, this.PORT2.Y()*unit);
	
		this.LIGNE.addChild(ligne);
			
		if(_update_)
			this.stage.update();
	}
		
	
	//Autre **********************************
	
	
		//cursor = "pointer";
	
	
	//Evénement *******************************
	
	
		
		
}



