


//=================================================
// PORT
//=================================================
/** Port de connexion d'un flux
 * @extends ObjetGraphique*/
class Port extends ObjetGraphique
{


	
	//Membres **************************
		/** Donne l'information du type d'objet
		* @public
		* @type {string}
		* @default "port"*/
		TYPE = "port"

		/** Position cible du port.
		* @private
		* @type {Position}
		* @default new Position()*/
		#position = new Position()

		/** Taille carré (en px)
		* @private
		* @type {number}
		* @default 15*/
		#taille = 15; // Taille du port (coté)

		/** Couleur du fond
		* @private
		* @type {string}
		* @default "#ccfdff"*/
		#couleur = "#ccfdff";

		/** Epaisseur du contour
		* @private
		* @type {number}
		* @default 2*/
		#epaisseurLigne = 2;

		/** Par rapport au flux, indique le sens de la flèche, parmis "out" / "in" / "double" / null
		* @private
		* @type {string}
		* @default "out"*/
		#sens = "out";

		/** Lorsque le port est attaché à un bloc, ce paramètre indique si le flux doit partir vers l'extérieur (false) ou vers l'intérieur (true).
		* @private
		* @type {boolean}
		* @default false*/
		#interieur = false;

		/** Bloc parent qui indique (le cas échéant) si le port est attaché à un bloc
		* @private
		* @type {Bloc}
		* @default null*/
		#blocParent = null;

		/** Si attaché à un bloc parent, indique le coté : 1 = droite, 2 = bas, 3= gauche, 4=haut
		* @private
		* @type {number}
		* @default 0*/
		#bordParent = 0;	// 1 = droite, 2 = bas, 3= gauche, 4=haut
		
		/** Position de la souris au début d'un clic
		* @private
		* @type {object}
		* @default null*/
		#posInitClic = null;

		/** Différence entre la position de l'objet et de la souris au début d'un clic
		* @private
		* @type {object}
		* @default null*/
			#offsetClic = null;


		/** Distance (en px) de proximité mini pour être aimanté à un bloc
		* @private
		* @type {number}
		* @default 20*/
			#distanceAccroche = 20

		/** Référence vers le port jumeau (à l'autre bout du flux)
		* @private
		* @type {Port}
		* @default null*/
		#portJumeau = null

		
		
	// ****************************************************
	/** Constructeur
	 * @param {Position} _pos_ - Position cible du port.
	 * @param {Bloc} [_bloc_=null] - Bloc auquel on souhaite se rattaché. Si null, la position finale du port sera celle passée par _pos_. Sinon, _pos_ sera remplacé par une position du bord du _bloc_, au plus prés de _pos_.
	 * @param {object} [_options_=null] - Options diverses
	*/
		constructor(_pos_, _bloc_=null , _options_=null)
		{
			super(_options_);

			// Chargement des paramètres -----------------
			if(_options_ && typeof(_options_)=="object")
				{
					if("taille" in _options_)
						this.#taille = _options_.taille ;
					if("couleur" in _options_)
						this.#couleur = _options_.couleur ;
					if("epaisseurLigne" in _options_)
						this.#epaisseurLigne = _options_.epaisseurLigne ;
					if("sens" in _options_)
						this.#sens = _options_.sens ;
					if("interieur" in _options_)
						this.#interieur = _options_.interieur ;
					if("distanceAccroche" in _options_)
						this.distanceAccroche = _options_.distanceAccroche ;
				}

			this.#position = _pos_;

			// Si le port est attaché à un bloc
			if(_bloc_)
			{
				this.#blocParent = _bloc_; // On associe le bloc au port
				_bloc_.ajoutePort(this); // et inversement

				this.raccrocheAuBloc(_bloc_,false);
			}

			// Evenements souris
			this.cursor = "grab" ;
			this.on("mousedown", this.PRESS);
			this.on("pressmove", this.PRESSMOVE);
			//this.on("click",this.UNPRESS);
			//this.on("dblclick",this.DOUBLECLICK)
		}
	
	

	// Getters / Setters ******************************
	
	
		// ---------------------------------------
		/** Position souhaitée de la boite pour un zoom de 100%.
		 *
		 * @param {Position} [_p_] - Objet contenant les coordonnées (position et rotation) du port. Si absent, la fonction est un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le port de zéro.
		 * @return {Position} Coordonnées (finales)
		*/
		//  
		position(_p_, _redessine_=true)
		{
			if(typeof(_p_) != 'undefined')
			{
				this.#position = _p_;
				if(_redessine_)
					{
						this.x=_p_.X()*this.unite();
						this.y=_p_.Y()*this.unite();
						this.rotation=_p_.theta() + this.#interieur * 180;
					}
			}
			return this.#position;
		}
		
		
		// ---------------------------------------
		/** Coordonnée sur x de la position souhaitée du port pour un zoom de 100% . (getter/setter)
		 *
		 * @param {number} [_X_] - Position sur x (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le port de zéro.
		 * @return {number} Position sur x (final).
		*/
		X(_X_, _redessine_=true)
		{
			if(typeof(_X_) != 'undefined')
			{
				this.#position.X(_X_);
				if(_redessine_)
					{this.x=_X_*this.unite();}
			}
			return this.#position.X();
		}
		
		
		// ---------------------------------------
		/** Coordonnée sur y de la position souhaitée du port pour un zoom de 100% . (getter/setter)
		 *
		 * @param {number} [_Y_] - Position sur y (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le port de zéro.
		 * @return {number} Position sur y (final).
		*/
		Y(_Y_, _redessine_=true)
		{
			if(typeof(_Y_) != 'undefined')
			{
				this.#position.Y(_Y_);
				if(_redessine_)
					{this.y = _Y_*this.unite();}
			}
			return this.#position.Y();
		}
		
		
		// ---------------------------------------
		/** Position angulaire. (getter/setter)
		 *
		 * @param {number} [_t_] - Orientation (en degré). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le port de zéro.
		 * @return {number} Orientation (final).
		*/
		theta(_t_, _redessine_=true)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#position.theta(_t_);
				if(_redessine_)
					{this.rotation = _t_ + this.#interieur * 180;}
			}
			return this.#position.theta() + this.#interieur * 180;
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
		/**  Distance (en px) de proximité mini pour être aimanté à un bloc, quelque soit le zoom (Getter/Setter)
		 *
		 * @param {number} [_d_] - Distance (en px). Si absent, la fonction devient un getter.
		 * @return {number} Distance (finale).
		*/
		distanceAccroche(_d_)
		{
			if(typeof(_d_) != 'undefined')
			{
				this.#distanceAccroche = _d_;
			}
			return this.#distanceAccroche;
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
	
	
	
		
		
		// ---------------------------------------
		/** Référence vers le bloc parent, s'il y a lieu. (getter/setter)
		 * @param {Bloc} [_b_] - Référence vers le bloc parent (peut être null)
		 * @return {Bloc} Référence (finale).
		*/
		blocParent(_b_)
		{
			if(typeof(_b_) != 'undefined')
			{
				this.#blocParent = _b_;
			}
			return this.#blocParent;
		}
		
		
		
	
		
		
		// ---------------------------------------
		/** Référence vers le flux parent
		 * @return {Flux} Flux parent.
		*/
		flux()
		{
			return this.parent;
		}
		
		
		
		
		
		
		
		// ---------------------------------------
		/** Dans le cas où le port est attaché à un bloc, getter/setter du coté de ce bloc
		 *
		 * @param {number} [_b_] - Bord (1=droite, 2=bas, 3=gauche, 4=haut, et 0 si pas attaché)
		 * @return {number} Bord attaché (final).
		*/
		bordParent(_b_)
		{
			if(typeof(_b_) != 'undefined')
			{
				this.#bordParent = _b_;
				
			}
			if(this.#blocParent)
				return this.#bordParent;
			return 0;
		}
		
		// ---------------------------------------
		/** Fonction qui modifie les coordonnées du port pour le raccrocher au bloc (s'il y a un bloc) et fait le lien. Cette fonction met à jour interieur/extérieur de ce port.
		 * @param {Bloc} _bloc_ - Référence vers le bloc auquel on souhaite de rattacher
		 * @param {boolean} [_redessine_=true] - Dit si on repositionne le bloc graphiquement toute de suite ou pas.
		 * @return {Position} - Nouvelle position (une fois rattaché)
		*/
		raccrocheAuBloc(_bloc_, _redessine_=true)
		{

			if(this.#blocParent != _bloc_)
			{
				//this.#blocParent = _bloc_; // On associe le bloc au port
				_bloc_.ajoutePort(this); // et inversement
				this.updateInterieur(false)
			}

				var centre = _bloc_.getPointMilieu();
				var angle = Math.atan2(this.#position.y() - centre.y(), this.#position.x() - centre.x())*180/Math.PI;
				this.position(_bloc_.getCoordBord(angle),_redessine_); // On remplace la position

			
			return this.position()
		}
		
		// ---------------------------------------
		/** Fonction qui supprime le lien entre le port et un bloc
		 */
		decrocheDuBloc()
		{
			if(this.#blocParent)
			{
				this.#blocParent.supprimePort(this); // et inversement
				this.updateInterieur()
			}
		}


		
		
		// ---------------------------------------
		/** Port jumeau, situé à l'autre bout du flux. (getter/setter)
		 * @param {Port}} [_p_] - Rérérence vers le port jumeau
		 * @return {Port} Référence vers le port (final).
		*/
		portJumeau(_p_, _redessine_=true)
		{
			if(typeof(_p_) != 'undefined')
			{
				this.#portJumeau = _p_;
			}
			return this.#portJumeau;
		}


		
		
		// ---------------------------------------
		/** Lorsque le port est attaché à un bloc, ce paramètre indique si le flux doit partir vers l'extérieur (false) ou vers l'intérieur (true). (getter/setter)
		 * @param {Boolean}} [_i_] - Indique s'il faut être vers l'intérieur ou non.
		 * @return {Boolean} Dit finalement si c'est intérieur ou extérieur.
		*/
		interieur(_i_, _redessine_=true)
		{
			if(typeof(_i_) != 'undefined')
			{
				this.#interieur = _i_;
			}
			return this.#interieur;
		}



		
		
		// ---------------------------------------
		/** Met à jour le membre this.#interieur
		 * @param {boolean} [_redessine_=true] Dit s'il faut redessiner le port
		 * @return {boolean} Renvoie la valeur finale de this.#interieur
		*/
		updateInterieur(_redessine_=true)
		{
			this.#interieur=false; // par défaut
			// Sens du flux (intérieur / extérieur)
			if(this.blocParent())
			{
				if(this.blocParent().estDansLeBloc(this.#portJumeau.position()))
					this.#interieur=true ;
			}
			if(_redessine_)
			{
					this.parent.redessineLigne();
					this.rotation = this.theta();
			}
			return this.#interieur
		}

		


		// --------------------------------------
		/* Fonction qui renvoie un objet contenant les valeurs des parmètres de this
		 *
		 * @return {object}
		 */
		getListeParametres()
		{
			var tab= super.getListeParametres();
			
			tab.X = this.#position.X() ;
			tab.Y = this.#position.Y() ;
			tab.theta = this.#position.theta() ;
			tab.taille = this.#taille ;
			tab.couleur = this.#couleur ;
			tab.epaisseurLigne = this.#epaisseurLigne ;
			tab.sens = this.#sens = "out" ;
			tab.interieur = this.#interieur ;
			tab.blocParent = null;
				if(this.#blocParent)
					tab.blocParent = this.#blocParent.name
			tab.distanceAccroche = this.#distanceAccroche ;

			return tab;
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
			rectangle.graphics.drawRect (-this.#taille/2,-this.#taille/2,this.#taille,this.#taille);
			// rectangle.graphics.drawRect (-this.#taille/2*unit,-this.#taille/2*unit,this.#taille*unit,this.#taille*unit);
		this.addChild(rectangle);
		
		if(this.#sens)
		{
			var fleche = new createjs.Shape();
				fleche.graphics.setStrokeStyle(this.#epaisseurLigne/2);
				fleche.graphics.beginStroke('black');
				//fleche.graphics.moveTo(-this.#taille/3*unit,0);
				fleche.graphics.moveTo(-this.#taille/3,0);
				//fleche.graphics.lineTo(this.#taille/3*unit,0);
				fleche.graphics.lineTo(this.#taille/3,0);
			if(this.#sens=="out" || this.#sens=="double")
			{
				/*fleche.graphics.moveTo((this.#taille/3-this.#taille/4)*unit , -this.#taille/4*unit);
				fleche.graphics.lineTo(this.#taille/3*unit,0);
				fleche.graphics.lineTo((this.#taille/3-this.#taille/4)*unit , this.#taille/4*unit);*/
				fleche.graphics.moveTo((this.#taille/3-this.#taille/4) , -this.#taille/4);
				fleche.graphics.lineTo(this.#taille/3,0);
				fleche.graphics.lineTo((this.#taille/3-this.#taille/4) , this.#taille/4);
			}
			if(this.#sens=="in" || this.#sens=="double")
			{
				/*fleche.graphics.moveTo((-this.#taille/3+this.#taille/4)*unit , -this.#taille/4*unit);
				fleche.graphics.lineTo(-this.#taille/3*unit,0);
				fleche.graphics.lineTo((-this.#taille/3+this.#taille/4)*unit , this.#taille/4*unit);*/
				fleche.graphics.moveTo((-this.#taille/3+this.#taille/4) , -this.#taille/4);
				fleche.graphics.lineTo(-this.#taille/3,0);
				fleche.graphics.lineTo((-this.#taille/3+this.#taille/4) , this.#taille/4);
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
	
	
		
		// ---------------------------------------
		/** Fonction appellée au moment du press-bouton souris
		 * @param {event} [evt] - Événement qui vient d'avoir lieu
		*/
		PRESS(evt)
		{
			if(evt.nativeEvent.buttons==1)
			{
				this.#posInitClic = {x:evt.stageX , y:evt.stageY}
				this.#offsetClic = {x:this.x-evt.stageX, y:this.y-evt.stageY};
				this.parent.placeAu1erPlan();
				this.cursor = "grabbing" ;
			}
		}
		


		// ---------------------------------------
		/** Fonction appellée au moment du press-mouve souris
		 * @param {event} [evt] - Événement qui vient d'avoir lieu
		*/
		PRESSMOVE(evt)
		{
			var u = this.unite();
			if(evt.nativeEvent.buttons==1) // Si clic droit 
			{
					// Mise à jour des coordonnées (sans prendre en compte l'attache à un éventuel bloc)
					this.X((evt.stageX+this.#offsetClic.x)/u)
					this.Y((evt.stageY+this.#offsetClic.y)/u)

					// Attache ou détache d'un bloc (et update des coordonnées en conséquences)
					var blocProche = getBlocBordProche(this.#position)
					if(blocProche.bloc != this.#blocParent || blocProche.dist > this.#distanceAccroche) // Si on est pas sur le même bloc, ou plus loin que #distanceAccroche
					{
						this.decrocheDuBloc();
					}
					if(blocProche.dist < this.#distanceAccroche) // Si on est proche d'un bord
							this.raccrocheAuBloc(blocProche.bloc)

					
					this.#portJumeau.updateInterieur()
					
			}

			this.parent.redessineLigne();
		}
	
		
}



