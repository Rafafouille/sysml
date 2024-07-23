


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
			#largeur = 100;
			
		/** Hauteur du bloc (en px pour un zoom de 100%)
		* @private
		* @type {array}
		* @default 100*/
			#hauteur = 100;
		
			
		/** Position de la souris au début d'un clic
		* @private
		* @type {object}
		* @default null*/
			#offsetClic = null;
		
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
			 	if("largeur" in _options_)
			 		this.#largeur = _options_.largeur ;
			 	if("hauteur" in _options_)
			 		this.#hauteur = _options_.hauteur ;
			 	if("X" in _options_)
			 		this.X(_options_.X, false);
			 	if("Y" in _options_)
			 		this.Y(_options_.Y, false) ; 
			}
			
			
			this.CADRE = new createjs.Container()
				this.addChild(this.CADRE);
			this.ENTETE = new createjs.Container()
				this.addChild(this.ENTETE);
				

				
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
		/** Largeur du bloc, pour un zoom de 100%. (getter/setter)
		 * @param {number} [_l_] - Largeur (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Largeur (final).
		*/
		largeur(_l_, _redessine_=true)
		{
			if(typeof(_l_) != 'undefined')
			{
				this.#largeur = _l_;
				this.updatePositionPorts();
				if(_redessine_)
					{this.redessine();}
			}
			return this.#largeur
		}
		
		
		// ---------------------------------------
		/** Hauteur du bloc, pour un zoom de 100%. (getter/setter)
		 * @param {number} [_h_] - Hauteur (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Hauteur (final).
		*/
		hauteur(_h_, _redessine_=true)
		{
			if(typeof(_h_) != 'undefined')
			{
				this.#hauteur = _h_;
				this.updatePositionPorts();
				if(_redessine_)
					{this.redessine();}
			}
			return this.#hauteur
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
					this.cursor = "pointer" ;
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
			{
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
		 * @returns {object} Nouvelles dimensions du bloc {largeur : ,  hauteur : }
		*/
		fit(redessine_=true)
		{
			this.fitLargeur(false);
			this.fitHauteur(false);
			
			if(redessine_)
				this.redessine();
				
			return {largeur:this.#largeur, hauteur:this.#hauteur}
		}
		
		
		// ---------------------------------------
		/** Ajuste la largeur de la boite à son contenant.
		 *
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @returns {object} Nouvelles largeur.
		*/
		fitLargeur(redessine_=true)
		{
			this.#largeur = Math.max(this.TEXT_TITRE.getBounds().width)+2*this.#marge;
			return this.#largeur;
		}
		
		
		// ---------------------------------------
		/** Ajuste la hauteur de la boite à son contenant.
		 *
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @returns {object} Nouvelles hauteur.
		*/
		fitHauteur(redessine_=true)
		{
			this.#hauteur = Math.max(this.ENTETE.getBounds().height);
			return this.#hauteur;
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
			return new Position(this.X(), this.Y()+this.hauteur()/2, 0)
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
			return _X_>=this.X()-this.largeur()/2 && _X_<= this.X()+this.largeur()/2 && _Y_>=this.Y() && _Y_<=this.Y()+this.hauteur();
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
			
			var l = this.largeur();
			var h = this.hauteur();
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
				return new Position(this.#largeur/2 + this.X(),  this.#largeur/2 * Math.tan(a*Math.PI/180)+ this.Y() + this.#hauteur/2,  0);
			else if(direction==2)
				return new Position(this.#hauteur/2 * Math.tan(a*Math.PI/180)+ this.X(), this.#hauteur+ this.Y(), 90);
			else if(direction==3)
				return new Position(-this.#largeur/2+ this.X(),   -this.#largeur/2 * Math.tan(a*Math.PI/180)+ this.Y() + this.#hauteur/2,   180);
			else if(direction==4)
				return new Position(this.#hauteur/2 * Math.tan((a-270)*Math.PI/180)+ this.X(),   this.Y(), -90);
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
				'largeur':this.#largeur,
				'hauteur':this.#hauteur
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
		
		
			if(_update_)
				this.stage.update();
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
			
			if(this.TEXT_TITRE.getBounds().width > this.#largeur*unit)
				{
					var bounds = this.TEXT_TITRE.getBounds();
					this.TEXT_TITRE.scaleX = this.#largeur*unit / bounds.width
					this.TEXT_TITRE.scaleY = this.TEXT_TITRE.scaleX;
					this.TEXT_TITRE.setBounds(bounds.x, bounds.y, bounds.width*this.TEXT_TITRE.scaleX, bounds.height*this.TEXT_TITRE.scaleY)
				}
			
			var ligne = new createjs.Shape();
				ligne.graphics.setStrokeStyle(this.#epaisseurLigneSeparations);
				ligne.graphics.beginStroke("black");
				var yLigne = this.TEXT_TITRE.y+this.TEXT_TITRE.getBounds().height+this.#marge;
				if(yLigne>this.#hauteur*unit)
					yLigne = this.#hauteur*unit;
				ligne.graphics.moveTo(-this.largeur()/2* unit,yLigne);
				ligne.graphics.lineTo(this.largeur()/2*unit,yLigne);
			this.ENTETE.addChild(ligne);
			
			this.ENTETE.setBounds(-this.largeur()/2*unit, 0, this.largeur()*unit, this.TEXT_TITRE.y+this.TEXT_TITRE.getBounds().height+this.#marge);
		
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
				rectangle.graphics.drawRect (-this.largeur()/2*unit,0,this.largeur()*unit,this.hauteur()*unit+this.#marge);
				rectangle.shadow = new createjs.Shadow('#555', 4, 4, 5);
		
			var rectangleContour = new createjs.Shape();
				rectangleContour.graphics.setStrokeStyle(this.#epaisseurLigneCadre);
				rectangleContour.graphics.beginStroke('black');
				rectangleContour.graphics.drawRect (-this.largeur()/2*unit,0,this.largeur()*unit,this.hauteur()*unit+this.#marge);
				
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
		 	tab.largeur = this.#largeur ;
		 	tab.hauteur = this.#hauteur
		 	
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
				this.#offsetClic = {x:this.x-evt.stageX, y:this.y-evt.stageY};
				this.placeAu1erPlan();
			}
		}
	
		
		// ---------------------------------------
		/** Fonction appellée au moment du press-mouve souris
		 * @param {event} [evt] - Événement qui vient d'avoir lieu
		*/
		PRESSMOVE(evt)
		{
			if(this.#deplacable && evt.nativeEvent.buttons==1)
			{
				var u = this.unite();
				this.X((evt.stageX+this.#offsetClic.x)/u)
				this.Y((evt.stageY+this.#offsetClic.y)/u)
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



