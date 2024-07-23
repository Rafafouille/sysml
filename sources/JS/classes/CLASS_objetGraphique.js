


//=================================================
// OBJET GRAPHIQUE
//=================================================
/** Classe mère d'un objet à graphique qui sera représenté sur les graphes
 * @extends createjs.Container*/
class ObjetGraphique extends createjs.Container
{


	
	//Membres **************************
		//Infos
		/** Zoom en deça duquel l'objet est invisible. Nombre compris dans ]0, infini[.
		* @private
		* @type {number}
		* @default 0 */
			#zoomLimite = 0;
			
		/** Indique si l'objet est cencé être caché ou non (Je dis "censé" car il peut y avoir des animations de transition).
		* @private
		* @type {boolean}
		* @default false*/
			#cache = false ;
			
		/** Temps d'animation d'apparition/disparition lorsqu'on cache un objet (en milliseconde).
		* @private
		* @type {integer}
		* @default 200*/
			#tempsAnimation = 200; // en ms
			
		/** Référence vers le container "diagramme" dont il fait partie
		* @private
		* @type {creatjs.Container}
		* @default null*/
			#diagramme = null;
			
		/** Donne l'information du type d'objet
		* @public
		* @type {string}
		* @default "Objet Graphique"*/
			TYPE = "Objet Graphique"
			
		/** Position de l'objet, pour un zoom de 100%
		* @private
		* @type {Position} 
		* @default Position nulle*/
			#position = new Position();
		
		
		
		
	// ****************************************************
	/** Constructeur
	 * @param {string} [_titre_=""] - Titre à afficher sur le bloc
	*/
		constructor(_options_)
		{
			super();
			
			//this.position = 
			
			// Prise en compte des paramètres
			if(typeof(_options_)=="object")
			{
			 	if("zoomLimite" in _options_)
			 		this.#zoomLimite = _options_.zoomLimite ;
			 		this.alpha = Number(this.#zoomLimite < DIAGRAMME.unite()) ;
			 		this.#cache = !Boolean(this.#zoomLimite < DIAGRAMME.unite()) ;
			 	if("cache" in _options_)
			 		this.#cache = _options_.cache ;
			 	console.log( _options_.cache );
			 	if("tempsAnimation" in _options_)
			 		this.#tempsAnimation = _options_.tempsAnimation ;
			 	if("position" in _options_)
			 		this.#position = _options_.position ; 
			 	if("position" in _options_)
			 		this.#position = _options_.position ; 
			}
			
			
			
			this.name="element_"+String(this.id);
			
			
		}
	
	

	// Getters / Setters ******************************
	
	
		
		
		
		
		// ---------------------------------------
		/** Valeur du zoom en deça duquel l'objet sera invisible (Getter/Setter).
		 * @param {number} [_z_] - Zoom limite. Si absent, la fonction sera considérée comme getter.
		 * @return {number} Zoom limite (final).
		*/
		zoomLimite(_z_, _redessine_=true)
		{
			if(typeof(_z_) != 'undefined')
			{
				this.#zoomLimite = _z_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#zoomLimite;
		}
		
		
		
		
		// ---------------------------------------
		/** Fonction qui choisit la limite de zoom actuel comme zoom limite
		 * @return {number} Zoom limite (final).
		*/
		bloqueZoomCourant()
		{
			this.#zoomLimite = this.#diagramme.unite();
			return this.#zoomLimite;
		}
		
		
		
		
		
		// ---------------------------------------
		/** Fonction qui enlève la limite de zoom
		 * @return {number} Zoom limite (final).
		*/
		libereZoomCourant()
		{
			this.#zoomLimite = 0;
		}
		
		
		
		
		
		// ---------------------------------------
		/** Renvoie une reference vers le diagramme (si première appel, on cherche cette référence)
		 * @return {Diagramme} Référent vers le diagrame
		*/
		diagramme()
		{
			if(!this.#diagramme)
			{
				var obj = this;
				while( !(obj instanceof Diagramme))
				{
					obj = obj.parent
				}
				this.#diagramme = obj;
			}
			return this.#diagramme
		}
		
		
		
		// ---------------------------------------
		/** Renvoie la longueur de l'unité de longueur utilisée par les objets (inscrite dans diagramme()).
		Cette unité change avec le zoom.
		 * @return {number} longueur unite (en px)
		*/
		unite()
		{
			return this.diagramme().unite();
		}
		
		
		
		
		
		
		// ---------------------------------------
		/** Coordonnée sur x de la position souhaitée de l'élément pour un zoom de 100% . (getter/setter)
		 *
		 * @param {number} [_x_] - Position sur x (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Position sur x (final).
		*/
		X(_x_, _redessine_=true)
		{
			if(typeof(_x_) != 'undefined')
			{
				this.#position.X(_x_);
				if(_redessine_)
					{this.x=this.#position.x();}//_x_*this.unite();}
			}
			return this.#position.X();
		}
		
		
		// ---------------------------------------
		/** Coordonnée sur y de la position souhaitée du bloc pour un zoom de 100% . (getter/setter)
		 *
		 * @param {number} [_y_] - Position sur x (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Position sur y (final).
		*/
		Y(_y_, _redessine_=true)
		{
			if(typeof(_y_) != 'undefined')
			{
				this.#position.Y(_y_);
				if(_redessine_)
					{this.y = this.#position.y();}
			}
			return this.#position.Y();
		}
		
		
		// ---------------------------------------
		/** Déplacement sur x de la position souhaitée du bloc pour un zoom de 100% . (getter/setter). Equivalent à :
		 * @example
		 * this.X( this.X() + _dx_ )
		 *
		 * @param {number} [_dx_] - Déplacement sur x (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Position sur x (final).
		*/
		dX(_dX_)
		{
			this.X(this.X()+_dX_)
			return this.#position.X()
		}
		
		
		// ---------------------------------------
		/** Déplacement sur y de la position souhaitée du bloc pour un zoom de 100% . (getter/setter). Equivalent à :
		 * @example
		 * this.Y( this.Y() + _dy_ )
		 *
		 * @param {number} [_dy_] - Déplacement sur y (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Position sur y (final).
		*/
		dY(_dY_)
		{
			this.Y(this.Y()+_dY_)
			return this.#position.Y()
		}
		
		
	
		// ---------------------------------------
		/** Place l'objet au z-index (presque) le plus grand.
		*/
		placeAu1erPlan()
		{
			this.parent.setChildIndex( this, this.parent.getNumChildren()-1);
		}
		
		
	
		// ---------------------------------------
		/** Dit si le bloc est censé être caché ou non.
		 * (à ne pas confondre avec this.visible car le bloc peut être considéré "caché", tout en étant visible le temps d'une animation
		 *
		 * @param {boolean} [_c_] - Dit si caché ou pas.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {boolean} Etat de visibilité (final).
		*/
		cache(_c_)
		{
			if(typeof(_c_) != 'undefined')
			{
				this.#cache = Boolean(_c_);
				if(_redessine_)
					{this.redessine();}
			}
			return this.#cache;
		}
		
		
	
		
		
	
		
		// ---------------------------------------
		/** Temps de l'animation (tween) pour rendre le l'objet visible / caché.
		 *
		 * @param {number} [_t_] - Temps (en ms). Si absent, la fonction devient un getter.
		 * @return {number} Le temps d'animation (final).
		*/
		tempsAnimation(_t_)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#tempsAnimation = _t_;
			}
			return this.#tempsAnimation;
		}
		
		
		
		
		
		
		// ---------------------------------------
		/** Fonction qui vérifie si l'élément est censé être affiché ou non.
		*/
		checkZoom(_zoom_)
		{
			if(_zoom_<this.#zoomLimite) // si on zoom moins que la limite
			{
				if(!this.#cache)
				{
					createjs.Tween.get(this).to({alpha:0},this.#tempsAnimation);
					this.#cache = true;	
				}
			}
			else // si on zoom plus que la limite
			{
				if(this.#cache)
				{
					createjs.Tween.get(this).to({alpha:1},this.#tempsAnimation);
					this.#cache = false;	
				}
			}
		}
		
		
		
		
		
		
		
		
		// ---------------------------------------
		/** Fonction qui auto-détruit l'objet.
		*/
		destroy()
		{
			this.parent.removeChild(this);
		}
		
		
		
		// --------------------------------------
		/* Fonction qui renvoie un objet contenant les valeurs des parmètres de this
		 *
		 * @return {object}
		 */
		 getListeParametres()
		 {
		 	return {
		 		"zoomLimite":this.#zoomLimite,
		 		"cache" : this.#cache,
		 		"tempsAnimation":this.#tempsAnimation,
		 		"X":this.#position.X(),
		 		"Y":this.#position.Y(),
		 		"theta":this.#position.theta(),
		 		};
		 }
		 
		 
		// --------------------------------------
		/* Fonction qui renvoie (sous forme de chaîne de caractère) le NOM de la fonction qui génère l'objet.
		 * Va de paire avec this.getCommande().
		 * @return {string} Le nom de la fonction.
		 */
		 getFonctionCommande()
		 {
			return "new ObjetGraphique"
		 }
		// --------------------------------------
		/* Ecrit la commande à taper pour recréer l'objet
		 *
		 * @return {object}
		 */
		 getCommande()
		 {
			return this.getFonctionCommande()+"("+JSON.stringify(this.getListeParametres())+")";
		 }
			
	//Graphiques *******************************
	
		
		
		
		// ---------------------------------------
		/** Fonction abstraite qui redessine tout.
		 * @param {boolean} [_update_=false] - Indique si on doit mettre à jour le stage ou non.
		*/
		redessine(_update_ = false)
		{
			
		
		
		
		
			if(_update_)
				this.stage.update();
		}
	
	
	
	//Autre **********************************
	
	
	//Evénement *******************************
}



