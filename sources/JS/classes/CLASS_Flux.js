


//=================================================
// FLUX
//=================================================
/** Flux entre deux blocs
 * @extends ObjetGraphique*/
class Flux extends ObjetGraphique
{


	
	//Membres **************************
		//Infos
		/** Donne l'information du type d'objet
		* @public
		* @type {string}
		* @default "FLUX"*/
			TYPE = "Flux"

		/** Objet (graphique) du port (extrémité) 1
		* @public
		* @type {Port}
		* @default null*/
		PORT1 = null;

		/** Objet (graphique) du port (extrémité) 2
		* @public
		* @type {Port}
		* @default null*/
		PORT2 = null;

		/** Objet (graphique) Contenant le tracé de la ligne
		* @public
		* @type {createjs.Container}
		* @default null*/
		LIGNE = null;

		/** Orientation du flux. Peut être "un" / "deux" / "double" / null
		* @private
		* @type {string}
		* @default "un"*/
		#sens = "un"; //
		
		/** Epaisseur du trait (null pour prendre l'épaisseur associée à la #nature (énergie, etc.))
		* @private
		* @type {string}
		* @default null*/
		#epaisseur = null;

		/** Couleur imposée du trait (null pour prendre la couleur associée à la #nature (énergie, etc.))
		* @public
		* @type {string}
		* @default null*/
		#couleur = null;

		/** Méthode pour traver la ligne du port 1 vers le port 2. Peut être : "lineaire" / "bezier" / "bezier_droit"
		* @private
		* @type {string}
		* @default "bezier_droit"*/
		#methode = "bezier" ;
		 

		/** Longueur de la ligne qui sort d'un port, avant de "tourner" (en px, pour un zoom de 100%)
		* @private
		* @type {number}
		* @default "50"*/
		#longueurQueue = 50;
		 

		/** Distance du point de contrôle pour la courbe de bézier, pour faire la tangente au port.
		 * Si -1, la valeur est automatiquement calculée à partir de la distance entre les points
		* @private
		* @type {number}
		* @default -1*/
		#distancePointControleBezier = -1;

		/** Pas du paramètre t pour bezier ( 0 < t < 1). Cela revient à 1/(nombre de points).
		* @private
		* @type {number}
		* @default 0.1*/
		#pasBezier = 0.01 // 

		/** Tableau contenant la liste des coordonnées de la courbe de bézier
		* @private
		* @type {array}
		* @default []*/
		#courbeBezier = []; // Liste des points 

		/** Tableau contenant la liste des "poignées" des lignes, c'est à dire la liste des points "particuliers" où doit
		* @private
		* @type {array}
		* @default []*/
		#poigneesLignes = []; // Liste des points (de la forme {x:, y:, d:})

		/** Largeur (diamètre) de la bande sélectionnable pas la souris, autour de la ligne
		* @private
		* @type {number}
		* @default 20*/
		#largeurSelectionnable = 20;

		/** Période (en pixel) des tirets d'animation
		* @private
		* @type {number}
		* @default 100*/
		#periodeTiretsAnimation = 100;

		/** Dit si on affiche l'animation du flux ou pas
		* @private
		* @type {boolean}
		* @default true*/
		#anime = true;

		/** Nature du flux ("energie" / "information" / "matiere")
		* @private
		* @type {string}
		* @default "energie"*/
		#nature = "energie";
		
		
		/** Liste des paramètres graphiques en fonction de la nature.
		* @private
		* @type {string}
		* @default "energie"*/
		#parametresParNature = {
							"energie" : {"couleur" : "#FF0000", "epaisseur":4},
							"information" : {"couleur" : "#0000FF", "epaisseur":2},
							"matiere" : {"couleur" : "#00AA00", "epaisseur":6}
		}
		
		
		
		
	// ****************************************************
	/** Constructeur
	 * Les arguments vont par deux : _p1_ avec _bloc1_, et _p2_ avec _bloc2_.<br/>
	 * Si on ne donne que _p1_ (respctivement _p2_) _bloc1_=null (respectivement _bloc2_=null): le port 1 (resp.2) sera placé à la position _p1_ (resp._p2_) ;
	 * Si on ne donne que _bloc1_ (resp._bloc2_) et _p1_=null (resp. _p2_= nuls) : le ports se mettra sur le bloc1, au plus prés du bloc2 (resp. sur le bloc2 au plus prés du bloc1) ;
	 * Si on donne _p1_ et _bloc1_ (resp. _p2_ et _bloc2_), le ports se mettront sur le bloc1, au plus prés de _p1_ (resp. sur le bloc2 au plus prés de _p2_).
	 *
	 * @param {Position} _p1_ - Position du départ
	 * @param {Position} _p2_ - Position d'arrivée
	 * @param {Bloc} [_bloc1_=null] - Bloc auquel rattacher le port de départ
	 * @param {Bloc} [_bloc2_=null] - Bloc auquel rattacher le port d'arrivée
	*/
		constructor(_p1_,_p2_, _bloc1_=null, _bloc2_=null, _options_=null)
		{
			super(_options_);
			
			// Chargement des paramètres -----------------
			if(_options_ && typeof(_options_)=="object")
				{
					if("sens" in _options_)
						this.#sens = _options_.sens ;
					if("epaisseur" in _options_)
						this.#epaisseur = _options_.epaisseur ;
					if("couleur" in _options_)
						this.#couleur = _options_.couleur ;
					if("methode" in _options_)
						this.#methode = _options_.methode ;
					if("longueurQueue" in _options_)
						this.#longueurQueue = _options_.longueurQueue ;
					if("distancePointControleBezier" in _options_)
						this.#distancePointControleBezier = _options_.distancePointControleBezier ;
					if("pasBezier" in _options_)
						this.#pasBezier = _options_.pasBezier ;
					if("largeurSelectionnable" in _options_)
						this.#largeurSelectionnable = _options_.largeurSelectionnable ;
					if("periodeTiretsAnimation" in _options_)
						this.#periodeTiretsAnimation = _options_.periodeTiretsAnimation ;
					if("anime" in _options_)
						this.#anime = _options_.anime ;
				}






			this.LIGNE = new createjs.Container();
			//this.LIGNE.cursor="crosshair"; <-- Cette ligne fait BUGGER à cause de la ligne en pointiller (animation). Du coup, elle est reporté dans la fonction redessineLigne

			if(!_p1_ && _bloc2_)
				_p1_ = _bloc2_.getPointMilieu();
			if(!_p2_ && _bloc1_)
				_p2_ = _bloc1_.getPointMilieu();
			

			// Création des ports
			this.PORT1 = new Port(_p1_, _bloc1_,_options_.p1) ;
			this.PORT2 = new Port(_p2_, _bloc2_,_options_.p2) ;

			this.PORT1.portJumeau(this.PORT2);
			this.PORT2.portJumeau(this.PORT1);


			// Choix du sens des ports
			if(this.#sens=="un")
			{
				this.PORT1.sens("out",false);
				this.PORT2.sens("in",false);
			}
			else if(this.#sens=="deux")
			{
				this.PORT1.sens("in",false);
				this.PORT2.sens("out",false);
			}
			else if(this.#sens=="double")
			{
				this.PORT1.sens("double",false);
				this.PORT2.sens("double",false);
			}
			else
			{
				this.PORT1.sens(null,false);
				this.PORT2.sens(null,false);
			}
			

			
			this.addChild(this.LIGNE);
			this.addChild(this.PORT1);
			this.addChild(this.PORT2);


			//this.on("click",this.UNPRESS);<-- Cette ligne fait BUGGER à cause de la ligne en pointiller (animation). Du coup, elle est reporté dans la fonction redessineLigne
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
		/** Epaisseur de trait du flux. (getter/setter) Si on affecte l'épaisseur null, elle sera automatiquement recherchée en fonction de la nature du flux (information, matière, etc.)
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
			if(this.#epaisseur)
				return this.#epaisseur;
			return this.#parametresParNature[this.#nature].epaisseur
		}
		
		
		// ---------------------------------------
		/** Couleur du trait du flux. (getter/setter). Si on affecte la couleur null, elle sera automatiquement recherchée en fonction de la nature du flux (information, matière, etc.)
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
			if(this.#couleur)
				return this.#couleur;
			return this.#parametresParNature[this.#nature].couleur
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
		/** Longueur du trait qui débute/fini le flux, dans le sens du port, pour un zoom de 100%.  (getter/setter).
		 * Si la longueur est supérieure à 1/3 de la distance entre les ports, elle est réduite pour rester à 1/3
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
			if(this.#longueurQueue> this.distanceEntrePorts()/3)
				return this.distanceEntrePorts()/3
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
			if(this.#distancePointControleBezier<0)
				return this.distanceEntrePorts()/3;
			return this.#distancePointControleBezier;
		}
		
		
		
		// ---------------------------------------
		/** Renvoie la distance (en pixel) entre les deux ports. Si _distanceVraie_ est true, cela renverra la vrai distance, telle qu'affichée à l'écran.
		 * Par défaut, c'est la distance dans le cas d'un zoom de 100% qui est renvoyée
		 * @param {boolean} [_distanceVraie_=false] - Indique si on prend en comtpe le zoom ou non.
		 * @return {number} La longueur entre les ports(final).
		*/
		distanceEntrePorts(_distanceVraie_=false)
		{
			var d = Math.sqrt(Math.pow(this.PORT1.X()-this.PORT2.X(),2)+Math.pow(this.PORT1.Y()-this.PORT2.Y(),2))
			if(_distanceVraie_)
			{
				return d*this.unite()
			}
			return d
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
				X:this.PORT1.X()+this.longueurQueue()*Math.cos(this.PORT1.rotation*Math.PI/180),
				Y:this.PORT1.Y()+this.longueurQueue()*Math.sin(this.PORT1.rotation*Math.PI/180),
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
				X:this.PORT2.X()+this.longueurQueue()*Math.cos(this.PORT2.rotation*Math.PI/180),
				Y:this.PORT2.Y()+this.longueurQueue()*Math.sin(this.PORT2.rotation*Math.PI/180),
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
		/** Largeur (diamètre) de la zone sélectionnable (Getter/Setter)
		 * @param {number} [_l_] - La largeur
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} La largeur (final).
		*/
		largeurSelectionnable(_l_, _redessine_=true)
		{
			if(typeof(_l_) != 'undefined')
			{
				this.#largeurSelectionnable = _l_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#largeurSelectionnable;
		}
		
		
		
		// ---------------------------------------
		/** Période (en pixel) des tirets d'animation (Getter/setter)
		 * @param {number} [_p_] - Période (en px)
		 * @param {boolean} [_redessine_=true] - Redessine le flux de zéro.
		 * @return {number} Période (final).
		*/
		periodeTiretsAnimation(_p_, _redessine_=true)
		{
			if(typeof(_p_) != 'undefined')
			{
				this.#periodeTiretsAnimation = _p_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#periodeTiretsAnimation;
		}
		
		
		
		// ---------------------------------------
		/** Indique s'il faut afficher l'animation ou pas(Getter/setter)
		 * @param {boolean} [_a_] - Autorisation d'afficher l'animation
		 * @param {boolean} [_redessine_=true] - Redessine le flux de zéro.
		 * @return {number} Autorsiation (finale) d'afficher l'animation.
		*/
		anime(_a_, _redessine_=true)
		{
			if(typeof(_a_) != 'undefined')
			{
				this.#anime = _a_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#anime;
		}

		
		
		
		// ---------------------------------------
		/** Nature du flux (Getter/Setter)
		 * @param {string} [_n_] - Nature ( "energie" / "matiere" / "information")
		 * @param {boolean} [_redessine_=true] - Redessine le flux de zéro.
		 * @return {string} Nature (finale)
		*/
		nature(_n_, _redessine_=true)
		{
			if(typeof(_n_) != 'undefined')
			{
				this.#nature = _n_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#nature;
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
			var P1C = {X : P1.X+this.distancePointControleBezier()*Math.cos(this.PORT1.rotation*Math.PI/180), Y : P1.Y+this.distancePointControleBezier()*Math.sin(this.PORT1.rotation*Math.PI/180)}
			var P2C = {X : P2.X+this.distancePointControleBezier()*Math.cos(this.PORT2.rotation*Math.PI/180), Y : P2.Y+this.distancePointControleBezier()*Math.sin(this.PORT2.rotation*Math.PI/180)}
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



		// --------------------------------------
		/* Fonction qui renvoie un objet contenant les valeurs des parmètres de this
		 *
		 * @return {object}
		 */
		getListeParametres()
		{
			var tab= super.getListeParametres();
			
			tab.p1 = this.PORT1.getListeParametres() ;
			tab.p2 = this.PORT2.getListeParametres() ;
			/*tab.bloc1 = null ;
			if(this.PORT1.blocParent())
					tab.bloc1 = this.PORT1.blocParent().name
			tab.bloc2 = null ;
			if(this.PORT2.blocParent())
				tab.bloc2 = this.PORT2.blocParent().name*/
			tab.sens = this.#sens;
			tab.epaisseur = this.#epaisseur;
			tab.couleur = this.#couleur;
			tab.methode = this.#methode;
			tab.longueurQueue = this.#longueurQueue;
			tab.distancePointControleBezier = this.#distancePointControleBezier;
			tab.pasBezier = this.#pasBezier;
			tab.largeurSelectionnable = this.#largeurSelectionnable ;
			tab.periodeTiretsAnimation = this.#periodeTiretsAnimation ;
			tab.anime = this.#anime ;
			tab.nature = this.#nature
			return tab;
		}
		 
		 
		// --------------------------------------
		/* Fonction qui renvoie (sous forme de chaîne de caractère) le NOM de la fonction qui génère l'objet.
		 * Va de paire avec this.getCommande().
		 * @return {string} Le nom de la fonction.
		 */
		 getFonctionCommande()
		 {
			return "ajouteFlux"
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
			
			tab.push({nom:"Supprimer", action:this.autoDetruit.bind(this), icone:'./sources/images/bouton_menu_supprime.png'});
			tab.push({nom:"Éditer flux", action:this.DOUBLECLICK.bind(this), icone:'./sources/images/bouton_menu_editeBloc.png'});
			tab.push({nom:"Zoom Limite", action:this.bloqueZoomCourant.bind(this), icone:'./sources/images/bouton_menu_blocVisible.png'});
			tab.push({nom:"Toujours visible", action:this.libereZoomCourant.bind(this), icone:'./sources/images/bouton_menu_visible.png'});
					
			return tab;
		}


		// ---------------------------------------
		/** Fonction qui ouvre le menu contextuel
		*/
		ouvreMenuContextuel(evt)
		{
			var menu = new MenuContextuel(this.getItemsMenuContextuel(),this);
			menu.x = evt.stageX;
			menu.y = evt.stageY;
			this.stage.addChild(menu);
		}



	


		 // --------------------------------------
		/* Fonction qui supprime l'objet.
		 */
		autoDetruit()
		{
			// On décroche les ports (s'ils sont accrochés)
			this.PORT1.decrocheDuBloc()
			this.PORT2.decrocheDuBloc()
			
			this.parent.removeChild(this);	// On le supprime du container createjs
		}
		
		



		// --------------------------------------
		/* Fonction qui indique si l'objet est en dehors du canvas ou pas (fonction générique, peut être remplacée dans les fonctions filles)
		 *
		 * @return {boolean}
		 */
		estDansLaFenetre()
		{
			var xMin = Math.min(this.PORT1.x+DIAGRAMME.CONTENU.x-this.PORT1.taille()/2  ,  this.PORT2.x+DIAGRAMME.CONTENU.x-this.PORT2.taille()/2 )
			var xMax = Math.max(this.PORT1.x+DIAGRAMME.CONTENU.x+this.PORT1.taille()/2  ,  this.PORT2.x+DIAGRAMME.CONTENU.x+this.PORT2.taille()/2 )
			var yMin = Math.min(this.PORT1.y+DIAGRAMME.CONTENU.y-this.PORT1.taille()/2  ,  this.PORT2.y+DIAGRAMME.CONTENU.y-this.PORT2.taille()/2 )
			var yMax = Math.max(this.PORT1.y+DIAGRAMME.CONTENU.y+this.PORT1.taille()/2  ,  this.PORT2.y+DIAGRAMME.CONTENU.y+this.PORT2.taille()/2 )

			if(xMax<0 || xMin > document.getElementById('canvas').width || yMax < 0 || yMin > document.getElementById('canvas').height )
				return false

			return true
		}
		   
		 


	//Graphiques *******************************
	
		
		
		// ---------------------------------------
		/** Redessine et replace tout le bloc, de zéro.
		 * @param {boolean} [_update_=false] - Indique s'il faut mettre à jour la scène (stage).
		*/
	redessine(_update_=false)
	{
		var unit = this.unite();
		
		this.PORT1.redessine();
		this.PORT2.redessine();
		
		this.redessineLigne();
		
			
		if(_update_)
			this.stage.update();
	}
	

	redessineLigne(_update_=false)
	{
		var unit = this.unite();

		this.LIGNE.removeAllChildren();

		// Point au bout de la queue :
		var P1 = {X:this.PORT1.X()+this.longueurQueue()*Math.cos(this.PORT1.rotation*Math.PI/180),	Y:this.PORT1.Y()+this.longueurQueue()*Math.sin(this.PORT1.rotation*Math.PI/180)}
		var P2 = {X:this.PORT2.X()+this.longueurQueue()*Math.cos(this.PORT2.rotation*Math.PI/180),	Y:this.PORT2.Y()+this.longueurQueue()*Math.sin(this.PORT2.rotation*Math.PI/180)}
		

		// Ligne "visible"
		var ligne = new createjs.Shape(); // Ligne principale
		ligne.graphics.setStrokeStyle(this.epaisseur());
		ligne.graphics.beginStroke(this.couleur());

		// Ligne Invisible (pour la sélection avec la souris)
		var ligneSelect = new createjs.Shape(); // Ligne invisible large pour être capté par la souris
		ligneSelect.graphics.setStrokeStyle(this.#largeurSelectionnable);
		ligneSelect.graphics.beginStroke("green");
		ligneSelect.alpha=(0.01)
		ligneSelect.cursor="crosshair"
		ligneSelect.on("click",this.UNPRESS.bind(this));

		// Ligne en pointillet (animation)
		var ligneDashed = new createjs.Shape(); // Ligne principale
		if(!this.#sens || !this.#anime)
			ligneDashed.visible=false;
		ligneDashed.graphics.setStrokeStyle(this.epaisseur()*2);
		ligneDashed.graphics.beginStroke(this.couleur());
		ligneDashed.graphics.setStrokeDash([this.epaisseur()*2,this.#periodeTiretsAnimation-this.epaisseur()*2]); // Ca fait des petits carrés
 		

		if(this.#sens=="un" || this.#sens=="double")
			createjs.Tween.get( ligneDashed.graphics._strokeDash,{loop:true}).to({offset:-this.#periodeTiretsAnimation},500)
		if(this.#sens=="deux")
			createjs.Tween.get( ligneDashed.graphics._strokeDash,{loop:true}).to({offset:this.#periodeTiretsAnimation},500)



		ligne.graphics.moveTo(this.PORT1.X()*unit, this.PORT1.Y()*unit);
		ligne.graphics.lineTo(P1.X*unit, P1.Y*unit);
		ligneSelect.graphics.moveTo(this.PORT1.X()*unit, this.PORT1.Y()*unit);
		ligneSelect.graphics.lineTo(P1.X*unit, P1.Y*unit);
		ligneDashed.graphics.moveTo(this.PORT1.X()*unit, this.PORT1.Y()*unit);
		ligneDashed.graphics.lineTo(P1.X*unit, P1.Y*unit);


		
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
				ligneSelect.graphics.lineTo(P.X*unit, P.Y*unit);
				ligneDashed.graphics.lineTo(P.X*unit, P.Y*unit);
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
				ligneSelect.graphics.lineTo(P.X*unit, P.Y*unit);
				ligneDashed.graphics.lineTo(P.X*unit, P.Y*unit);
					P.Y = PE.Y;
					P.X = PE.X;
				ligne.graphics.lineTo(P.X*unit, P.Y*unit);
				ligneSelect.graphics.lineTo(P.X*unit, P.Y*unit);
				ligneDashed.graphics.lineTo(P.X*unit, P.Y*unit);
			}
		}
		
		ligne.graphics.lineTo(P2.X*unit, P2.Y*unit);
		ligne.graphics.lineTo(this.PORT2.X()*unit, this.PORT2.Y()*unit);
		ligneSelect.graphics.lineTo(P2.X*unit, P2.Y*unit);
		ligneSelect.graphics.lineTo(this.PORT2.X()*unit, this.PORT2.Y()*unit);
		ligneDashed.graphics.lineTo(P2.X*unit, P2.Y*unit);
		ligneDashed.graphics.lineTo(this.PORT2.X()*unit, this.PORT2.Y()*unit);

	
		this.LIGNE.addChild(ligne);
		this.LIGNE.addChild(ligneDashed);
		this.LIGNE.addChild(ligneSelect);


		// Cas du sens "double" => on fait un aller-retour pour l'animation
		if(this.#sens=="double") // Sens double
		{
			var taille = ligneDashed.graphics._activeInstructions.length
			for(var i=0; i<taille-1; i++)
			{
				var P = ligneDashed.graphics._activeInstructions[taille-2-i];
				ligneDashed.graphics.lineTo(P.x, P.y);
			}
		}
	}
	
	//Autre **********************************
	
	
		//cursor = "pointer";
	
	
	//Evénement *******************************
	
	
		
		
		// ---------------------------------------
		/** Fonction appellée au moment du relâchement de la souris
		 * @param {event} [evt] - Événement qui vient d'avoir lieu
		*/
		UNPRESS(evt)
		{
			
			if(evt.nativeEvent.button==0)
			{
				
			}
			else if(evt.nativeEvent.button==2)
			{
				//this.selectionne();
				this.ouvreMenuContextuel(evt);
			}
		}



		
		
		// ---------------------------------------
		/** Fonction appellée au moment du relâchement de la souris
		 * @param {event} [evt] - Événement qui vient d'avoir lieu
		*/
		DOUBLECLICK(evt)
		{
			
// A FAIRE
		}
		
}



