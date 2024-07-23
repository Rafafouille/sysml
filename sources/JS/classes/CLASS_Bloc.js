


//=================================================
// CLASS BLOC
//=================================================
/** Classe représentant un bloc (générique)
 * @extends ObjetGraphique*/
class Bloc extends ObjetGraphique
{


	
	//Membres **************************
			
		/** Donne l'information du type d'objet
		* @public
		* @type {string}
		* @default "Objet Graphique"*/
			TYPE = "bloc" ;
			
		/** Taille du titre en entête du bloc
		* @private
		* @type {integer}
		* @default 12*/
			#tailleTitre = 12; 
			
		/** Titre en entête du bloc
		* @private
		* @type {string}
		* @default ""*/
			#titre = "";
			
		/** Epaisseur (en px) de la ligne de séparation entre le titre et le reste du bloc
		* @private
		* @type {number}
		* @default 1*/
			#epaisseurLigneSeparations=1;
			
		/** Epaisseur (en px) du contour du bloc
		* @private
		* @type {number}
		* @default 2*/
			#epaisseurLigneCadre=2;

		/** Couleur de l'arrière plan du bloc
		* @private
		* @type {string}
		* @default "#fff4d2"*/
			#couleur = "#fff4d2";
			
		/** Marge en px (équivalent à paddind en css)
		* @private
		* @type {integer}
		* @default 5*/
			#marge = 5; // Marge en pixel
			
		/** Indique si l'objet est déplaçable avec la souris
		* @private
		* @type {boolean}
		* @default true*/
			#deplacable = false;
			
		/** Liste de références vers blocs "enfants", contenus dans ce bloc.
		* @private
		* @type {array}
		* @default []*/
			#blocsEnfants = []; // Liste d'éléments enfants
		
		/** Référence d'un éventuel bloc parent dans lequel ce bloc est contenu.
		* @private
		* @type {Bloc}
		* @default null*/
			#blocParent = null;
			
		/** Liste de références vers des ports.
		* @private
		* @type {array}
		* @default []*/
			#ports = [];
		
		/** Position de l'objet, pour un zoom de 100%
		* @private
		* @type {Position} 
		* @default Position nulle*/
			#position = new Position();
			
		/** Largeur du bloc (en px pour un zoom de 100%)
		* @private
		* @type {array}
		* @default 100*/
			#LARGEUR = 100;
			
		/** Hauteur du bloc (en px pour un zoom de 100%)
		* @private
		* @type {array}
		* @default 100*/
			#HAUTEUR = 100;
		
			
		/** Différence entre la position de l'objet et de la souris au début d'un clic
		* @private
		* @type {object}
		* @default null*/
			#offsetClic = null;
		
			
		/** Position de la souris au début d'un clic
		* @private
		* @type {object}
		* @default null*/
			#posInitClic = null;
		
			
		/** Largeur de la boite au début d'un clic
		* @private
		* @type {object}
		* @default null*/
			#LARGEURInit = 0;

			
		/** Hauteur de la boite au début d'un clic
		* @private
		* @type {object}
		* @default null*/
			#HAUTEURInit = 0;


		/** Objet (graphique) contenant l'entête du bloc (titre, etc...)
		* @public
		* @type {createjs.Container}
		* @default null*/
			ENTETE = null;
		
		/** Objet (graphique) contenant le cadre global du bloc
		* @public
		* @type {createjs.Container}
		* @default null*/
			CADRE = null;
			
		
		/** Objet (graphique) contenant le texte du titre
		* @public
		* @type {createjs.Container}
		* @default null*/
			TEXT_TITRE = null;
		
		
		/** Objet (graphique) la poingée pour étirer l'objet vers la gauche
		* @public
		* @type {createjs.Shape}
		* @default null*/
			BORD_GAUCHE = null;
		
		/** Largeur des poignées transparentes (pour redimensionner)
		* @public
		* @type {number}
		* @default 20*/
			#taillePoignees = 20;
		
	// ****************************************************
	/** Constructeur
	 * @param {object} [_options_] - Liste des paramètres pour intialiser l'objet
	*/
		constructor(_options_)
		{
			super(_options_); // Appel du constructeur parent (héritage)
			
			
			// Chargement des paramètres -----------------
			if(typeof(_options_)=="object")
			{
				if("tailleTitre" in _options_)
		 			this.#tailleTitre = _options_.tailleTitre ;
				if("titre" in _options_)
		 			this.#titre = _options_.titre ;
			 	if("epaisseurLigneSeparations" in _options_)
			 		this.#epaisseurLigneSeparations = _options_.epaisseurLigneSeparations ;
			 	if("epaisseurLigneCadre" in _options_)
			 		this.#epaisseurLigneCadre = _options_.epaisseurLigneCadre ;
			 	if("couleur" in _options_)
			 		this.#couleur = _options_.couleur ;
			 	if("marge" in _options_)
			 		this.#marge = _options_.marge ;
			 	if("deplacable" in _options_)
			 		this.#deplacable = _options_.deplacable ;
			 	if("LARGEUR" in _options_)
			 		this.#LARGEUR = _options_.LARGEUR ;
			 	if("HAUTEUR" in _options_)
			 		this.#HAUTEUR = _options_.HAUTEUR ;
			 	if("X" in _options_)
			 		this.X(_options_.X, false);
			 	if("Y" in _options_)
			 		this.Y(_options_.Y, false) ; 
			 	if("taillePoignees" in _options_)
			 		this.#taillePoignees = _options_.taillePoignees ; 
			}
			
			
			this.CADRE = new createjs.Container()
				this.addChild(this.CADRE);
			this.ENTETE = new createjs.Container()
				this.addChild(this.ENTETE);
				
			var blurFilter = new createjs.BlurFilter(5, 5, 1);

			this.BORD_DROIT = new createjs.Shape();
				this.BORD_DROIT.alpha=0.01;
				this.BORD_DROIT.cursor="ew-resize";
				this.addChild(this.BORD_DROIT);
			this.BORD_GAUCHE = new createjs.Shape();
				this.BORD_GAUCHE.alpha=0.01;
				this.BORD_GAUCHE.cursor="ew-resize";
				this.addChild(this.BORD_GAUCHE);
			this.BORD_HAUT = new createjs.Shape();
				this.BORD_HAUT.alpha=0.01;
				this.BORD_HAUT.cursor="ns-resize";
				this.addChild(this.BORD_HAUT);
			this.BORD_BAS = new createjs.Shape();
				this.BORD_BAS.alpha=0.01;
				this.BORD_BAS.cursor="ns-resize";
				this.addChild(this.BORD_BAS);
				
			this.COIN_HAUT_DROIT = new createjs.Shape();
				this.COIN_HAUT_DROIT.alpha=0.01;
				this.COIN_HAUT_DROIT.cursor="nesw-resize";
				this.COIN_HAUT_DROIT.name="COIN_HAUT_DROIT";
				this.addChild(this.COIN_HAUT_DROIT);
			this.COIN_HAUT_GAUCHE = new createjs.Shape();
				this.COIN_HAUT_GAUCHE.alpha=0.01;
				this.COIN_HAUT_GAUCHE.cursor="nwse-resize";
				this.COIN_HAUT_GAUCHE.name="COIN_HAUT_GAUCHE";
				this.addChild(this.COIN_HAUT_GAUCHE);
			this.COIN_BAS_DROIT = new createjs.Shape();
				this.COIN_BAS_DROIT.alpha=0.01;
				this.COIN_BAS_DROIT.cursor="nwse-resize";
				this.COIN_BAS_DROIT.name="COIN_BAS_DROIT";
				this.addChild(this.COIN_BAS_DROIT);
			this.COIN_BAS_GAUCHE = new createjs.Shape();
				this.COIN_BAS_GAUCHE.alpha=0.01;
				this.COIN_BAS_GAUCHE.cursor="nesw-resize";
				this.COIN_BAS_GAUCHE.name="COIN_BAS_GAUCHE";
				this.addChild(this.COIN_BAS_GAUCHE);

				
			this.deplacable(true);
			// EVENEMENTS 
			
			this.on("mousedown", this.PRESS);
			this.on("pressmove", this.PRESSMOVE);
			this.on("click",this.UNPRESS);
			//this.redessine(false);
		}
	
	

	// Getters / Setters ******************************
	
	
		// ---------------------------------------
		/** Titre du bloc. (getter/setter)
		 * @param {string} [_t_] - Titre que l'on souhaite affecter (setter). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {string} Titre du bloc (final).
		*/
		titre(_t_, _redessine_=true)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#titre = _t_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#titre;
		}
		
		
		// ---------------------------------------
		/** Taille de la police d'affichage du titre. (getter/setter)
		 * @param {number} [_t_] - Taille de la police. Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Taille (final).
		*/
		tailleTitre(_t_, _redessine_=true)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#tailleTitre = _t_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#tailleTitre;
		}
		
		
		// ---------------------------------------
		/** Epaisseur de trait qui séparent les parties du bloc (ex : titre vs contenu). (getter/setter)
		 * @param {number} [_e_] - Epaisseur. Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Epaisseur (final).
		*/
		epaisseurLigneSeparations(_e_, _redessine_=true)
		{
			if(typeof(_e_) != 'undefined')
			{
				this.#epaisseurLigneSeparations = _e_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#epaisseurLigneSeparations;
		}
		
		
		// ---------------------------------------
		/** Epaisseur du contours du bloc. (getter/setter)
		 * @param {number} [_e_] - Epaisseur. Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Epaisseur (final).
		*/
		epaisseurLigneCadre(_e_, _redessine_=true)
		{
			if(typeof(_e_) != 'undefined')
			{
				this.#epaisseurLigneCadre = _e_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#epaisseurLigneCadre;
		}
		
		
		// ---------------------------------------
		/** Largeur du bloc, pour un zoom de 100%. (getter/setter). À ne pas confondre avec this.largeur() (en minuscule) qui est la largeur réelle en pixel (pour le zoom courant).
		 * @param {number} [_l_] - Largeur (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Largeur (final).
		*/
		LARGEUR(_l_, _redessine_=true)
		{
			if(typeof(_l_) != 'undefined')
			{
				this.#LARGEUR = _l_;
				this.updatePositionPorts();
				if(_redessine_)
					{this.redessine();}
			}
			return this.#LARGEUR
		}
		
		
		// ---------------------------------------
		/** Largeur reelle du bloc, pour le zoom courant. (getter/setter).À ne pas confondre avec this.LARGEUR() (en majuscule) qui est la largeur en pixel pour le zoom 100%.
		 * @param {number} [_l_] - Largeur (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Largeur (final).
		*/
		largeur(_l_, _redessine_=true)
		{
			if(typeof(_l_) != 'undefined')
			{
				this.#LARGEUR = _l_/this.unite();
				this.updatePositionPorts();
				if(_redessine_)
					{this.redessine();}
			}
			return this.#LARGEUR*this.unite();
		}
		
		
		// ---------------------------------------
		/** Hauteur du bloc, pour un zoom de 100%. (getter/setter). À ne pas confondre avec this.hauteur() (en minuscule) qui est la hauteur réelle en pixel (pour le zoom courant).
		 * @param {number} [_h_] - Hauteur (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Hauteur (final).
		*/
		HAUTEUR(_h_, _redessine_=true)
		{
			if(typeof(_h_) != 'undefined')
			{
				this.#HAUTEUR = _h_;
				this.updatePositionPorts();
				if(_redessine_)
					{this.redessine();}
			}
			return this.#HAUTEUR
		}
		
		
		// ---------------------------------------
		/** Hauteur du bloc, pour un zoom de 100%. (getter/setter).À ne pas confondre avec this.HAUTEUR() (en majuscule) qui est la hauteur en pixel pour le zoom de 100%.
		 * @param {number} [_h_] - Hauteur (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Hauteur (final).
		*/
		hauteur(_h_, _redessine_=true)
		{
			if(typeof(_h_) != 'undefined')
			{
				this.#HAUTEUR = _h_/this.unite();
				this.updatePositionPorts();
				if(_redessine_)
					{this.redessine();}
			}
			return this.#HAUTEUR*this.unite();
		}
		
		
		
		// ---------------------------------------
		/** Couleur d'arriere plan du bloc. (getter/setter)
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
		/** Marge du bloc pour un zoom de 100% (équivalent à un padding en css). (getter/setter)
		 * @param {number} [_m_] - Marge (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Marge (final).
		*/
		marge(_m_, _redessine_=true)
		{
			if(typeof(_m_) != 'undefined')
			{
				this.#marge = _m_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#marge;
		}
		
		
		
		// ---------------------------------------
		/** Taille des poignées (transparentes) qui permettent de redimensionner la boite (getter/setter)
		 * @param {number} [_m_] - Taille de la poignée (en px)
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Taille de la poignée (final).
		*/
		taillePoignees(_t_, _redessine_=true)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#taillePoignees = _t_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#taillePoignees;
		}
		
		
		// ---------------------------------------
		/** Indique si c'est déplacable (avec la souris) ou non.
		 * @param {boolean} [_d_] - Autorisation de déplacer (true) ou non (false). Si absent, la fonction devient un getter.
		 * @return {boolean} Autorisation (finale) de déplacer.
		*/
		//  
		deplacable(_d_)
		{
			if(typeof(_d_) != 'undefined')
			{
				this.#deplacable = Boolean(_d_);
				if(_d_)
					this.cursor = "grab" ;
				else
					this.cursor = "default" ;
			}
			return this.#deplacable;
		}
		
		
		// ---------------------------------------
		/** Coordonnées de la position souhaitée du bloc, pour un zoom de 100%. Le point positionné est le milieu du bord supérieur (getter/setter).
			Si setter : dans le cas où le bloc possède des blocs-enfants (à l'intérieur de lui), le déplacement du bloc se propage à tous ces enfants.
		 * @param {object} [_p_] - Couple de coordonnées. Si absent, la fonction devient un getter.
		 * @param {number} [_p_.x] - Coordonnées du x, en px.
		 * @param {number} [_p_.y] - Coordonnées du y, en px.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {object} Coordonnées (finales) : {x:, y:}
		*/
		position(_p_, _redessine_=true)
		{
			if(typeof(_p_) != 'undefined')
			{cursor
				if(_p_ instanceof Position)
				{
					//Déplacement des blocs enfants
					if(this.#blocsEnfants)
					{
						var dx = _p_.X()-this.#position.X()
						var dy = _p_.Y()-this.#position.Y()
						for(var i=0;i<this.#blocsEnfants.length;i++)
						{
							this.#blocsEnfants[i].dX(dx)
							this.#blocsEnfants[i].dY(dy)
						}
					}
					this.#position=_p_;
					if(_redessine_)
						{this.redessine();}
				}
				else
					consol.log("Erreur : l'objet n'est pas une position.")
			}
			return this.#position;
		}
		
		
		// ---------------------------------------
		/** Coordonnée sur x de la position souhaitée du bloc pour un zoom de 100% . (getter/setter)
			Si setter : dans le cas où le bloc possède des blocs-enfants (à l'intérieur de lui), le déplacement du bloc se propage à tous ces enfants.
		 * @param {number} [_X_] - Position sur x (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Position sur x (final).
		*/
		X(_X_, _redessine_=true)
		{
			if(typeof(_X_) != 'undefined')
			{
				var dX = _X_-this.#position.X() ;
				//Déplacement des ports 
					for(var i=0;i<this.#ports.length;i++)
					{
						this.#ports[i].dX(dX)
					}
				//Déplacement des blocs enfants
					for(var i=0;i<this.#blocsEnfants.length;i++)
					{
						this.#blocsEnfants[i].dX(dX)
					}
					
				this.#position.X(_X_);
				
				if(_redessine_)
					{this.x=this.#position.x();}
			}
			return this.#position.X();
		}
		
		
		// ---------------------------------------
		/** Coordonnée sur y de la position souhaitée du bloc pour un zoom de 100% . (getter/setter)
			Si setter : dans le cas où le bloc possède des blocs-enfants (à l'intérieur de lui), le déplacement du bloc se propage à tous ces enfants.
		 * @param {number} [_Y_] - Position sur x (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Position sur y (final).
		*/
		Y(_Y_, _redessine_=true)
		{
			if(typeof(_Y_) != 'undefined')
			{
				var dY = _Y_-this.#position.Y();
				//Déplacement des portsdx = _x_-this.#position.x
					for(var i=0;i<this.#ports.length;i++)
					{
						this.#ports[i].dY(dY)
					}
				//Déplacementn des blocs enfants
					for(var i=0;i<this.#blocsEnfants.length;i++)
					{
						this.#blocsEnfants[i].dY(dY)
					}
			
				this.#position.Y(_Y_);
				if(_redessine_)
					{this.y = this.#position.y();}
			}
			return this.#position.Y();
		}
		
		// ---------------------------------------
		/** Ajuste les dimensions de la boite à son contenant.
		 *
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @returns {object} Nouvelles dimensions du bloc {LARGEUR : , HAUTEUR : }
		*/
		fit(redessine_=true)
		{
			this.fitLargeur(false);
			this.fitHauteur(false);
			
			if(redessine_)
				this.redessine();
				
			return {LARGEUR:this.#LARGEUR, HAUTEUR:this.#HAUTEUR}
		}
		
		
		// ---------------------------------------
		/** Ajuste la largeur de la boite à son contenant.
		 *
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @returns {object} Nouvelles largeur.
		*/
		fitLargeur(redessine_=true)
		{
			this.#LARGEUR = Math.max(this.TEXT_TITRE.getBounds().width)+2*this.#marge;
			return this.#LARGEUR;
		}
		
		
		// ---------------------------------------
		/** Ajuste la hauteur de la boite à son contenant.
		 *
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @returns {object} Nouvelles hauteur.
		*/
		fitHauteur(redessine_=true)
		{
			this.#HAUTEUR = Math.max(this.ENTETE.getBounds().height);
			return this.#HAUTEUR;
		}
		
		
		// ---------------------------------------
		/** Liste des blocs associés (qui se déplacent en même temps).
		 *
		 * @returns {array} Liste de blocs.
		*/
		blocsEnfants()
		{
			return this.#blocsEnfants;
		}
		
		
		
		
		// ---------------------------------------
		/** Liste des ports associés (qui se déplacent en même temps).
		 *
		 * @returns {array} Liste de ports.
		*/
		ports()
		{
			return this.#ports;
		}
		
		
		
		
		// ---------------------------------------
		/** Associe un nouveau bloc "enfant" au bloc courant (et inversement).
		 *
		 * @param {Bloc} [_b_] - Référence d'un bloc.
		*/
		ajouteBlocEnfant(_b_)
		{
			this.#blocsEnfants.push(_b_);
			_b_.blocParent(this);
		}
		
		
		// ---------------------------------------
		/** Désassocie un bloc enfant du bloc courant.
		 *
		 * @param {Bloc} [_b_] - Référence d'un bloc supposé enfant.
		*/
		supprimeBlocEnfant(_b_)
		{
			var i = this.#blocsEnfants.indexOf(_b_);
			this.#blocsEnfants.splice(i,1)
			_b_.blocParent(null);
		}
		
		
		
		
		// ---------------------------------------
		/** Bloc parent auquel est associé le bloc courant (Getter/Setter)
		 *
		 * @param {Bloc} [_b_] - Référence d'un bloc supposé enfant. Si absent, la fonction devient un getter.
		 * @returns {Bloc} Référence du bloc parent.
		*/
		blocParent(_b_)
		{
			if(typeof(_b_) != 'undefined')
				this.#blocParent = _b_;
			return this.#blocParent;
		}
		
		
		
		
		// ---------------------------------------
		/** Associe un port (issu d'un flux) à un bloc
		 *
		 * @param {Port} [_p_] - Référence d'un port.
		*/
		ajoutePort(_p_)
		{
			this.#ports.push(_p_);
			_p_.blocParent(this);
		}
		
		
		
		// ---------------------------------------
		/** Désassocie un port enfant du bloc courant.
		 *
		 * @param {Port} [_p_] - Référence d'un port supposé enfant.
		*/
		supprimePort(_p_)
		{
			var i = this.#ports.indexOf(_p_);
			this.#ports.splice(i,1)
			_p_.blocParent(null);
		}
		
		
		
		// ---------------------------------------
		/** Place l'objet au z-index (presque) le plus grand. La fonction se propoge aux blocs-enfants (pour qu'il restent dessus).
		*/
		placeAu1erPlan()
		{
			this.parent.setChildIndex( this, this.parent.getNumChildren()-1);
			
			
			for(var i=0;i< this.#ports.length;i++)
			{
				var flux = this.#ports[i].flux();
				flux.placeAu1erPlan();
			}
			for(var i=0;i< this.#blocsEnfants.length;i++)
			{
				var enfant = this.#blocsEnfants[i];
				enfant.placeAu1erPlan();
			}
		}
		
		
		// ---------------------------------------
		/** Renvoie les coordonnées du point-milieu du bloc, pour un zoom de 100%.
		 * @returns {Object} Coordonnées du centre, de la forme : {X:  ,  Y:}
		*/
		getPointMilieu()
		{
			return new Position(this.X(), this.Y()+this.HAUTEUR()/2, 0)
			//return {X:this.X(), Y: this.Y() +this.hauteur()/2}
		}
		
		
		// ---------------------------------------
		/** Vérifie si un point est situé à l'intérieur du bloc, pour une zoom de 100%.
		 * @param {Position} [_pos_] - Position
		 * @returns {boolean} Indication de l'appartenance du point (true) ou non (false) dans le bloc.
		*/
		estDansLeBloc(_pos_)
		{
			var _X_ = _pos_.X();
			var _Y_ = _pos_.Y();
			return _X_>=this.X()-this.LARGEUR()/2 && _X_<= this.X()+this.LARGEUR()/2 && _Y_>=this.Y() && _Y_<=this.Y()+this.HAUTEUR();
		}
		
		
		// ---------------------------------------
		/** Fonction qui renvoie une référence vers le bloc directement en dessous (celui qui a le plus grand z-index directement inférieur à celui du bloc courant).
		 * @returns {Bloc} Référence vers le bloc en dessous, null sinon.
		*/
		elementDirectementEnDessous()
		{
			var niveauEnDessous= false; // On ne regarde que les éléments "sous" le z-index de l'objet courant
			var p = this.getPointMilieu();
			
			for(var i=this.parent.children.length-1; i>=0; i--)// on parcours la liste des children en partant de la fin pour prendre celui qui est le plus au 1er plan
			{
				var elem = this.parent.children[i];
				if(elem instanceof Bloc) // Si l'enfant est un bloc (ou héritage d'un bloc)
				{
					if(niveauEnDessous)
					{
						if(elem.estDansLeBloc(p))
							return elem
					}
					else if(elem == this) // Si on est au niveau z-index de l'objet lui-même
						niveauEnDessous = true;
				}
			}
			return null;
		}
		
		
		// ---------------------------------------
		/** Fonction qui donne les coordonnées, pour un zoom de 100%, du point du bord du rectangle, ainsi que l'orientation (en degré), à partir d'un coordonnées angulaire par rapport à l'angle par rapport au point central.
		 * @example
		 * this.getCoordBord(0) ; // renverra la coordonnées du point au milieu du bord droit, orienté à 0° (normale au bord vertical)
		 * this.getCoordBord(90) ; // renverra la coordonnées du point au milieu du bord inférieur (normale au bord horizontal)
		 * @returns {object} Coordonnées du point du bord, de la forme : {X:  ,  Y:  , theta:  }
		*/
		getCoordBord(_angle_)
		{
		
			// On cherche sur quel bord on est :
			var a = _angle_%360; //  mod 2pi
			if(a<0)
				a+=360;
		
			//1 = droite, 2/ = bas, 3/ = gauche, 4/=haut;
			
			var l = this.LARGEUR();
			var h = this.HAUTEUR();
			var demiAngleDroit = Math.atan2(h,l)*180/Math.PI;
			if(a<=demiAngleDroit || a>=360-demiAngleDroit)
				var direction = 1
			else if(a>demiAngleDroit && a<=180-demiAngleDroit)
				var direction = 2
			else if(a>180-demiAngleDroit && a<=180+demiAngleDroit)
				var direction = 3
			else
				var direction = 4

			
			if(direction==1)
				return new Position(this.#LARGEUR/2 + this.X(),  this.#LARGEUR/2 * Math.tan(a*Math.PI/180)+ this.Y() + this.#HAUTEUR/2,  0);
			else if(direction==2)
				return new Position(this.#HAUTEUR/2 * Math.tan(a*Math.PI/180)+ this.X(), this.#HAUTEUR+ this.Y(), 90);
			else if(direction==3)
				return new Position(-this.#LARGEUR/2+ this.X(),   -this.#LARGEUR/2 * Math.tan(a*Math.PI/180)+ this.Y() + this.#HAUTEUR/2,   180);
			else if(direction==4)
				return new Position(this.#HAUTEUR/2 * Math.tan((a-270)*Math.PI/180)+ this.X(),   this.Y(), -90);
			return new Position();
		}
		
		
		
		
		// ---------------------------------------
		/** Crée une liste d'objets renfermant les infos de chaque bouton du menu contextuel.
		 * Chaque objet est de la forme {nom: , action: , icone :}
		 * 
		 * @returns {Array} Liste des boutons de la forme {nom: , action: , icone :}
		*/
		getItemsMenuContextuel()
		{
			var tab = [];
			
			tab.push({nom:"Supprimer", action:function(){alert("Pas encore implémenté");}, icone:'./sources/images/bouton_suppr.png'});
			tab.push({nom:"Bloquer zoom", action:this.bloqueZoomCourant.bind(this), icone:'./sources/images/bouton_bloque_zoom.png'});
			tab.push({nom:"Libérer zoom", action:this.libereZoomCourant.bind(this), icone:'./sources/images/bouton_libere_zoom.png'});
					
			return tab;
		}
		
		
		
		
		// ---------------------------------------
		/** Fonction qui ouvre le menu contextuel
		*/
		ouvreMenuContextuel(evt)
		{
			var menu = new MenuContextuel(this.getItemsMenuContextuel());
			menu.x = evt.stageX;
			menu.y = evt.stageY;
			this.stage.addChild(menu);
		}
		
		
		// --------------------------------------
		/* Fonction qui génère les lignes de commande permettant de recréer l'objet (pour une sauvegarde, par exemple)
		 *
		 * @return {string} Commandes
		 */
		 getCommandeGeneration()
		 {
		 	var PARAM = {
		 		// Objet Graphique =========
				'zoomLimite':this.zoomLimite(),
				//'cache':this.#cache,
				//'tempsAnimation':this.#tempsAnimation,
				//'diagramme':this.#diagramme,
		 		'position':this.#position,
				// BLOC =====================
		 		'titre':this.#titre,
		 		'tailleTitre':this.#tailleTitre,
		 		'epaisseurLigneSeprations':this.#epaisseurLigneSeparations,
		 		'epaisseurLigneCadre':this.#epaisseurLigneCadre,
		 		'couleur':this.#couleur,
		 		'marge':this.#marge,
		 		'deplacable':this.#deplacable,
				//'blocsEnfants':this.#blocsEnfants,
				//'blocParent':this.#blocParent,
				//'ports':this.#ports,
				'LARGEUR':this.#LARGEUR,
				'HAUTEUR':this.#HAUTEUR
			}
		 	return "ajouteBloc("+JSON.stringify(PARAM)+")";
		 }
		 
		 
		 
		 
		 
		 
		 
		 
		
	
	//Graphiques *******************************
	
		
		
		// ---------------------------------------
		/** Redessine et replace tout le bloc, de zéro.
		 * @param {boolean} [_update_=false] - Indique s'il faut mettre à jour la scène (stage).
		*/
		redessine(_update_ = false)
		{
		
			var unit = this.unite();
			
			
			this.x = this.#position.x();
			this.y = this.#position.y();
		
			this.redessineEntete();
			this.redessineCadre();
			this.redessinePoingees();
		
		
		
		
			if(_update_)
				this.stage.update();
		}
		
		
		// ---------------------------------------
		/** Redessine les poignées pour étirer le bloc
		 * @param {boolean} [_update_=false] - Indique s'il faut mettre à jour la scène (stage).
		*/
		redessinePoingees(_update_ = false)
		{
		
			// Redessine les poignées droite
			this.BORD_DROIT.graphics.clear();
			this.BORD_DROIT.graphics.setStrokeStyle(this.#taillePoignees).beginStroke("#00FF00").moveTo(this.largeur()/2,0).lineTo(this.largeur()/2,this.hauteur());
			// Redessine les poignées gauche
			this.BORD_GAUCHE.graphics.clear();
			this.BORD_GAUCHE.graphics.setStrokeStyle(this.#taillePoignees).beginStroke("#00FF00").moveTo(-this.largeur()/2,0).lineTo(-this.largeur()/2,this.hauteur());
			// Redessine les poignées haute
			this.BORD_HAUT.graphics.clear();
			this.BORD_HAUT.graphics.setStrokeStyle(this.#taillePoignees).beginStroke("#00FF00").moveTo(-this.largeur()/2,0).lineTo(this.largeur()/2,0);
			// Redessine les poignées bas
			this.BORD_BAS.graphics.clear();
			this.BORD_BAS.graphics.setStrokeStyle(this.#taillePoignees).beginStroke("#00FF00").moveTo(-this.largeur()/2,this.hauteur()).lineTo(this.largeur()/2,this.hauteur());
			
			// Redessine le coin haut droit
			this.COIN_HAUT_DROIT.graphics.clear();
			this.COIN_HAUT_DROIT.graphics.beginFill("red").drawCircle(this.largeur()/2,0,this.#taillePoignees/2);
			// Redessine le coin haut gauche
			this.COIN_HAUT_GAUCHE.graphics.clear();
			this.COIN_HAUT_GAUCHE.graphics.beginFill("red").drawCircle(-this.largeur()/2,0,this.#taillePoignees/2);
			// Redessine le coin bas droit
			this.COIN_BAS_DROIT.graphics.clear();
			this.COIN_BAS_DROIT.graphics.beginFill("red").drawCircle(this.largeur()/2,this.hauteur(),this.#taillePoignees/2);
			// Redessine le coin bas gauche
			this.COIN_BAS_GAUCHE.graphics.clear();
			this.COIN_BAS_GAUCHE.graphics.beginFill("red").drawCircle(-this.largeur()/2,this.hauteur(),this.#taillePoignees/2);
			
			
		}
		
		
		// ---------------------------------------
		/** Redessine l'entête
		 * @param {boolean} [_update_=false] - Indique s'il faut mettre à jour la scène (stage).
		*/
		redessineEntete(_update_ = false)
		{
			this.ENTETE.removeAllChildren();
			
			var unit = this.unite();
	
			this.TEXT_TITRE = new createjs.Text(" "+this.titre()+" ","bold "+this.#tailleTitre.toString()+"px Arial");
				this.TEXT_TITRE.textBaseline = 'top';
				this.TEXT_TITRE.textAlign = 'center';
				this.TEXT_TITRE.x = 0 ;
				this.TEXT_TITRE.y = this.#marge ;
			this.ENTETE.addChild(this.TEXT_TITRE);
			
			if(this.TEXT_TITRE.getBounds().width > this.largeur())
				{
					var bounds = this.TEXT_TITRE.getBounds();
					this.TEXT_TITRE.scaleX = this.largeur() / bounds.width
					this.TEXT_TITRE.scaleY = this.TEXT_TITRE.scaleX;
					this.TEXT_TITRE.setBounds(bounds.x, bounds.y, bounds.width*this.TEXT_TITRE.scaleX, bounds.height*this.TEXT_TITRE.scaleY)
				}
			
			var ligne = new createjs.Shape();
				ligne.graphics.setStrokeStyle(this.#epaisseurLigneSeparations);
				ligne.graphics.beginStroke("black");
				var yLigne = this.TEXT_TITRE.y+this.TEXT_TITRE.getBounds().height+this.#marge;
				if(yLigne>this.hauteur())
					yLigne = this.hauteur();
				ligne.graphics.moveTo(-this.largeur()/2,yLigne);
				ligne.graphics.lineTo(this.largeur()/2,yLigne);
			this.ENTETE.addChild(ligne);
			
			this.ENTETE.setBounds(-this.largeur()/2, 0, this.largeur(), this.TEXT_TITRE.y+this.TEXT_TITRE.getBounds().height+this.#marge);
		
			if(_update_)
				this.stage.update();
		}
		
		
		// ---------------------------------------
		/** Redessine le cadre principal du bloc
		 * @param {boolean} [_update_=false] - Indique s'il faut mettre à jour la scène (stage).
		*/
		redessineCadre(_update_=false)
		{
			this.CADRE.removeAllChildren();
			
			var unit = this.unite();
			
			var rectangle = new createjs.Shape();
				rectangle.graphics.beginFill(this.#couleur);
				rectangle.graphics.drawRect (-this.largeur()/2,0,this.largeur(),this.hauteur()+this.#marge);
				rectangle.shadow = new createjs.Shadow('#555', 4, 4, 5);
		
			var rectangleContour = new createjs.Shape();
				rectangleContour.graphics.setStrokeStyle(this.#epaisseurLigneCadre);
				rectangleContour.graphics.beginStroke('black');
				rectangleContour.graphics.drawRect (-this.largeur()/2,0,this.largeur(),this.hauteur()+this.#marge);
				
			this.CADRE.addChild(rectangle);
			this.CADRE.addChild(rectangleContour);
		}
	
	
	
	
		updatePositionPorts()
		{
			for(var i=0; i<this.#ports.length; i++)
			{
				var port = this.#ports[i];
				// A FINIR
			}
		}
		
		
		
		
		// ---------------------------------------
		/** Renvoie si l'élément graphique est un bord ou pas. Cette fonction est utile pour les événements de redimensionnement.
		 * @param {createjs.DisplayObject} [elem] - Élément dont on souhaite savoir s'il fait partie du bord
		 * @return {boolean} Indique si oui (true) ou non (false) on est sur le bord
		*/
		estUnBord(elem)
		{
			var tab=[this.BORD_GAUCHE,this.BORD_DROIT,this.BORD_HAUT,this.BORD_BAS,this.COIN_HAUT_DROIT, this.COIN_HAUT_GAUCHE, this.COIN_BAS_GAUCHE, this.COIN_BAS_DROIT]
			return tab.includes(elem);
		}
		
		
		
		
		// --------------------------------------
		/* Fonction qui renvoie un objet contenant les valeurs des parmètres de this
		 *
		 * @return {object}
		 */
		 getListeParametres()
		 {
		 	var tab= super.getListeParametres();
		 	
		 	tab.X = this.X() ;
		 	tab.Y = this.Y() ;
		 	tab.tailleTitre = this.#tailleTitre ;
		 	tab.titre = this.#titre ;
		 	tab.epaisseurLigneSeparations = this.#epaisseurLigneSeparations ;
		 	tab.epaisseurLigneCadre = this.#epaisseurLigneCadre ;
		 	tab.couleur = this.#couleur ;
		 	tab.marge = this.#marge ;
		 	tab.deplacable = this.#deplacable ;
		 	tab.LARGEUR = this.#LARGEUR ;
		 	tab.HAUTEUR = this.#HAUTEUR ;
		 	tab.taillePoignees = this.#taillePoignees ;
		 	
		 	return tab;
		 }
		 
		 
		// --------------------------------------
		/* Fonction qui renvoie (sous forme de chaîne de caractère) le NOM de la fonction qui génère l'objet.
		 * Va de paire avec this.getCommande().
		 * @return {string} Le nom de la fonction.
		 */
		 getFonctionCommande()
		 {
			return "new Bloc"
		 }
	//Autre **********************************
	
	
		//cursor = "pointer";
	
	
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
				this.#LARGEURInit = this.LARGEUR();
				this.#HAUTEURInit = this.HAUTEUR();
				this.#offsetClic = {x:this.x-evt.stageX, y:this.y-evt.stageY};
				this.placeAu1erPlan();
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
			if(this.#deplacable && evt.nativeEvent.buttons==1) // Si clic droit et déplacable
			{
				// Si on agrandit par la DROITE (inclut diagonales)
				if(evt.target == this.BORD_DROIT || evt.target == this.COIN_HAUT_DROIT || evt.target == this.COIN_BAS_DROIT) // Si on clique sur le BORD GAUCHE ----
				{
					if(this.#LARGEURInit + (evt.stageX-this.#posInitClic.x) / u >20)
					{
						this.X(((evt.stageX+this.#posInitClic.x)/2+this.#offsetClic.x)/u)
						this.LARGEUR(this.#LARGEURInit + (evt.stageX-this.#posInitClic.x)/u);
					}
				}
				// Si on agrandit par la GAUCHE (inclut diagonales)
				if(evt.target == this.BORD_GAUCHE || evt.target == this.COIN_HAUT_GAUCHE || evt.target == this.COIN_BAS_GAUCHE) // Si on clique sur le BORD GAUCHE ----
				{
					if(this.#LARGEURInit - (evt.stageX-this.#posInitClic.x)/u > 20)
					{
						this.X(((evt.stageX+this.#posInitClic.x)/2+this.#offsetClic.x)/u)
						this.LARGEUR(this.#LARGEURInit - (evt.stageX-this.#posInitClic.x)/u);
					}
				}
				// Si on agrandit par le HAUT (inclut diagonales)
				if(evt.target == this.BORD_HAUT || evt.target == this.COIN_HAUT_DROIT || evt.target == this.COIN_HAUT_GAUCHE) // Si on clique sur le BORD GAUCHE ----
				{
					if(this.#HAUTEURInit - (evt.stageY-this.#posInitClic.y)/u > 40)
					{
						this.Y((evt.stageY+this.#offsetClic.y)/u)
						this.HAUTEUR(this.#HAUTEURInit - (evt.stageY-this.#posInitClic.y)/u);
					}
				}
				// Si on agrandit par le BAS (inclut diagonales)
				if(evt.target == this.BORD_BAS || evt.target == this.COIN_BAS_DROIT || evt.target == this.COIN_BAS_GAUCHE) // Si on clique sur le BORD GAUCHE ----
				{
					if(this.#HAUTEURInit + (evt.stageY-this.#posInitClic.y)/u > 40)
					{
						//Y ne bouge pas
						this.HAUTEUR(this.#HAUTEURInit + (evt.stageY-this.#posInitClic.y)/u);
					}
				}
				if(!this.estUnBord(evt.target)) // Tous les autres cas (si on déplace)
				{
					this.X((evt.stageX+this.#offsetClic.x)/u)
					this.Y((evt.stageY+this.#offsetClic.y)/u)
				}
			}
		}
	
		
		// ---------------------------------------
		/** Fonction appellée au moment du relâchement de la souris
		 * @param {event} [evt] - Événement qui vient d'avoir lieu
		*/
		UNPRESS(evt)
		{
			
			if(evt.nativeEvent.button==0)
			{
				this.cursor = "grab" ;
				var elem = this.elementDirectementEnDessous();
				if(elem) // S'il y a un élément en dessous
				{
					if(this.#blocParent) // S'il y a déjà un parent (potentiellement à remplacer)
						this.#blocParent.supprimeBlocEnfant(this) // On le supprime...
					elem.ajouteBlocEnfant(this); // ... puis on met ce nouveau parent
				}
				else // Si pas d'élément en dessous (vide)
				{
					if(this.#blocParent)
						this.#blocParent.supprimeBlocEnfant(this)
				}
			}
			else if(evt.nativeEvent.button==2)
			{
				this.ouvreMenuContextuel(evt);
			}
		}
		
		
}



