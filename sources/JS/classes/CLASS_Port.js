


//=================================================
// PORT
//=================================================
/** Port de connexion d'un flux
 * @extends ObjetGraphique*/
class Port extends ObjetGraphique
{


	
	//Membres **************************
		//Infos
		TYPE = "port"
		#position = {x:0, y:0, theta:0}
		#taille = 15; // Taille du port (coté)
		#couleur = "#ccfdff";
		#epaisseurLigne = 2;
		#sens = "out";
		
		
		
		
	// ****************************************************
	/** Constructeur
	 * @param {number} [_x_=0] - Position sur x, pour un zoom de 100%.
	 * @param {number} [_y_=0] - Position sur y, pour un zoom de 100%.
	 * @param {number} [_theta_=0] - Angle d'orientation du port
	*/
		constructor(_x_=0, _y_=0, _theta_=0 , _options_)
		{
			super();
			this.#position.X = _x_;
			this.#position.Y = _y_;
			this.#position.theta = _theta_;
		}
	
	

	// Getters / Setters ******************************
	
	
		// ---------------------------------------
		/** Position souhaitée de la boite pour un zoom de 100%.
		 *
		 * @param {object} [_p_] - Objet contenant les coordonnées (position et rotation) du port. Si absent, la fonction est un getter.
		 * @param {number} objet.X - Coordonnées sur x (en px)
		 * @param {number} objet.Y - Coordonnées sur y (en px)
		 * @param {number} objet.theta - Orientation (en degré)
		 * @return {object} Coordonnées (finales)
		*/
		//  
		position(_p_, _redessine_=true)
		{
			if(typeof(_p_) != 'undefined')
			{
				this.#position = _p_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#position;
		}
		
		
		// ---------------------------------------
		/** Coordonnée sur x de la position souhaitée du port pour un zoom de 100% . (getter/setter)
		 *
		 * @param {number} [_x_] - Position sur x (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le port de zéro.
		 * @return {number} Position sur x (final).
		*/
		X(_x_, _redessine_=true)
		{
			if(typeof(_x_) != 'undefined')
			{
				this.#position.X = _x_;
				if(_redessine_)
					{this.x=_x_*this.unite();}
			}
			return this.#position.X;
		}
		
		
		// ---------------------------------------
		/** Coordonnée sur y de la position souhaitée du port pour un zoom de 100% . (getter/setter)
		 *
		 * @param {number} [_y_] - Position sur y (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le port de zéro.
		 * @return {number} Position sur y (final).
		*/
		Y(_y_, _redessine_=true)
		{
			if(typeof(_y_) != 'undefined')
			{
				this.#position.Y = _y_;
				if(_redessine_)
					{this.y = _y_*this.unite();}
			}
			return this.#position.Y;
		}
		
		
		// ---------------------------------------
		/** Position angulaire. (getter/setter)
		 *
		 * @param {number} [_t_] - Orientation (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le port de zéro.
		 * @return {number} Orientation (final).
		*/
		theta(_t_, _redessine_=true)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#position.theta = _t_;
				if(_redessine_)
					{this.rotation = _t_;}
			}
			return this.#position.theta;
		}
		
		
		// ---------------------------------------
		/** Dimension du port, d'un coté du carré, pour un zoom de 100%. (getter/setter)
		 *
		 * @param {number} [_t_] - Dimension (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le port de zéro.
		 * @return {number} Dimension (finale).
		*/
		taille(_t_, _redessine_=true)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#taille = _t_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#taille;
		}
		
		
		// ---------------------------------------
		/** Couleur d'arriere plan du port. (getter/setter)
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
		/** Epaisseur du contours du port. (getter/setter)
		 * @param {number} [_e_] - Epaisseur. Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Epaisseur (final).
		*/
		epaisseurLigne(_e_, _redessine_=true)
		{
			if(typeof(_e_) != 'undefined')
			{
				this.#epaisseurLigne = _e_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#epaisseurLigne;
		}
		
		
		// ---------------------------------------
		/** Sens du flux. Cela indique comment dessiner la flèche. (getter/setter)
		 * @param {string} [_s_] - Sens. Pour un angle nul, "in" = vers la droite ; "out" = vers la gauche, "double" = double flèche, null = pas de sens)
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Sens (final).
		*/
		sens(_s_, _redessine_=true)
		{
			if(typeof(_s_) != 'undefined')
			{
				this.#sens = _s_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#sens;
		}
	
	//Graphiques *******************************
	
		
		
		// ---------------------------------------
		/** Redessine et replace tout le flux, de zéro.
		 * @param {boolean} [_update_=false] - Indique s'il faut mettre à jour la scène (stage).
		*/
	redessine(_update_)
	{
		this.removeAllChildren();
		
		var unit = this.unite();
		
		var rectangle = new createjs.Shape();
			rectangle.graphics.setStrokeStyle(this.#epaisseurLigne);
			rectangle.graphics.beginFill(this.#couleur);
			rectangle.graphics.beginStroke('black');
			rectangle.graphics.drawRect (-this.#taille/2*unit,-this.#taille/2*unit,this.#taille*unit,this.#taille*unit);
		this.addChild(rectangle);
		
		if(this.#sens)
		{
			var fleche = new createjs.Shape();
				fleche.graphics.setStrokeStyle(this.#epaisseurLigne/2);
				fleche.graphics.beginStroke('black');
				fleche.graphics.moveTo(-this.#taille/3*unit,0);
				fleche.graphics.lineTo(this.#taille/3*unit,0);
			if(this.#sens=="out" || this.#sens=="double")
			{
				fleche.graphics.moveTo((this.#taille/3-this.#taille/4)*unit , -this.#taille/4*unit);
				fleche.graphics.lineTo(this.#taille/3*unit,0);
				fleche.graphics.lineTo((this.#taille/3-this.#taille/4)*unit , this.#taille/4*unit);
			}
			if(this.#sens=="in" || this.#sens=="double")
			{
				fleche.graphics.moveTo((-this.#taille/3+this.#taille/4)*unit , -this.#taille/4*unit);
				fleche.graphics.lineTo(-this.#taille/3*unit,0);
				fleche.graphics.lineTo((-this.#taille/3+this.#taille/4)*unit , this.#taille/4*unit);
			}
			this.addChild(fleche);
		}
		
		
		
		this.x = this.X()*unit;
		this.y = this.Y()*unit;
		this.rotation = this.theta();
	
		if(_update_)
			this.stage.update();
	}
		
	
	//Autre **********************************
	
	
	
	
	//Evénement *******************************
	
	
		
		
}



