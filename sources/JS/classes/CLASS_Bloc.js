


//=================================================
// CLASS BLOC
//=================================================
/** Classe représentant un bloc (générique)
 * @extends ObjetGraphique*/
class Bloc extends ObjetGraphique
{


	
	//Membres **************************
		//Infos
		TYPE = "bloc" ;
		#tailleTitre = 12; 
		#titre = "";
		#nomInstance = "";
		#classe = ""
		#epaisseurLigneSeparations=1;
		#epaisseurLigneCadre=2;
		#couleur = "#fff4d2";
		#marge = 5; // Marge en pixel
		#deplacable = false;
		#position = {x:0,y:0}
		#blocsEnfants = []; // Liste d'éléments enfants
		#blocParent = null;
		
		#largeur = 100; // auto
		#hauteur = 100;
		
		#offsetClic = null;
		// Graphisme
		ENTETE = null;
		CADRE = null;
		TEXT_TITRE = null;
		
		
		
		
	// ****************************************************
	/** Constructeur
	 * @param {string} [_titre_=""] - Titre à afficher sur le bloc
	*/
		constructor(_titre_="", _options_)
		{
			super();
			
			this.#titre = "";
			
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
				//Déplacement des blocs enfants
				if(this.#blocsEnfants)
				{
					var dx = _p_.x-this.#position.x
					var dy = _p_.y-this.#position.y
					for(var i=0;i<this.#blocsEnfants.length;i++)
					{
						this.#blocsEnfants[i].dX(dx)
						this.#blocsEnfants[i].dY(dy)
					}
				}
				this.#position = _p_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#position;
		}
		
		
		// ---------------------------------------
		/** Coordonnée sur x de la position souhaitée du bloc pour un zoom de 100% . (getter/setter)
			Si setter : dans le cas où le bloc possède des blocs-enfants (à l'intérieur de lui), le déplacement du bloc se propage à tous ces enfants.
		 * @param {number} [_x_] - Position sur x (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Position sur x (final).
		*/
		X(_x_, _redessine_=true)
		{
			if(typeof(_x_) != 'undefined')
			{
				//Déplacementn des blocs enfants
				if(this.#blocsEnfants)
				{
					var dx = _x_-this.#position.x
					for(var i=0;i<this.#blocsEnfants.length;i++)
					{
						this.#blocsEnfants[i].dX(dx)
					}
				}
				this.#position.x = _x_;
				if(_redessine_)
					{this.x=_x_*this.unite();}
			}
			return this.#position.x;
		}
		
		
		// ---------------------------------------
		/** Coordonnée sur y de la position souhaitée du bloc pour un zoom de 100% . (getter/setter)
			Si setter : dans le cas où le bloc possède des blocs-enfants (à l'intérieur de lui), le déplacement du bloc se propage à tous ces enfants.
		 * @param {number} [_y_] - Position sur x (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Position sur y (final).
		*/
		Y(_y_, _redessine_=true)
		{
			if(typeof(_y_) != 'undefined')
			{
				//Déplacementn des blocs enfants
					var dy = _y_-this.#position.y
					for(var i=0;i<this.#blocsEnfants.length;i++)
					{
						this.#blocsEnfants[i].dY(dy)
					}
			
				this.#position.y = _y_;
				if(_redessine_)
					{this.y = _y_*this.unite();}
			}
			return this.#position.y;
		}
		
		
		// ---------------------------------------
		/** Déplacement sur x de la position souhaitée du bloc pour un zoom de 100% . (getter/setter). Equivalent à :
		 * @example
		 * this.X( this.X() + _dx_ )
		 * @description	Si setter : dans le cas où le bloc possède des blocs-enfants (à l'intérieur de lui), le déplacement du bloc se propage à tous ces enfants.
		 *
		 * @param {number} [_dx_] - Déplacement sur x (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Position sur x (final).
		*/
		dX(_dx_)
		{
			this.X(this.X()+_dx_)
			return this.position.x
		}
		
		
		// ---------------------------------------
		/** Déplacement sur y de la position souhaitée du bloc pour un zoom de 100% . (getter/setter). Equivalent à :
		 * @example
		 * this.Y( this.Y() + _dy_ )
		 * @description	Si setter : dans le cas où le bloc possède des blocs-enfants (à l'intérieur de lui), le déplacement du bloc se propage à tous ces enfants.
		 *
		 * @param {number} [_dy_] - Déplacement sur y (en px). Si absent, la fonction devient un getter.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {number} Position sur y (final).
		*/
		dY(_dy_)
		{
			this.Y(this.Y()+_dy_)
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
		/** Associe un nouveau bloc "enfant" au bloc courant (et inversement).
		 *
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
		/** Place l'objet au z-index (presque) le plus grand. La fonction se propoge aux blocs-enfants (pour qu'il restent dessus).
		*/
		placeAu1erPlan()
		{
			this.parent.setChildIndex( this, this.parent.getNumChildren()-1);
			
			
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
			return {X:this.X(), Y: this.Y() +this.hauteur()/2}
		}
		
		
		// ---------------------------------------
		/** Vérifie si un point est situé à l'intérieur du bloc, pour une zoom de 100%.
		 * @param {number} [_X_] - Coordonnée sur X.
		 * @param {number} [_Y_] - Coordonnée sur Y.
		 * @returns {boolean} Indication de l'appartenance du point (true) ou non (false) dans le bloc.
		*/
		estDansLeBloc(_X_,_Y_)
		{
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
				if(elem.TYPE=="bloc")
				{
					if(niveauEnDessous)
					{
						if(elem.estDansLeBloc(p.X, p.Y))
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
			{
				return {
					X:this.#largeur/2 + this.X(),
					Y:this.#largeur/2 * Math.tan(a*Math.PI/180)+ this.Y(),
					theta:0
					};
			}
			else if(direction==2)
			{
				return {
					X:this.#hauteur/2/Math.tan(a*Math.PI/180)+ this.X(),
					Y:this.#hauteur/2+ this.Y(),
					theta:90
					};
			}
			else if(direction==3)
			{
				return {
					X:-this.#largeur/2+ this.X(),
					Y:-this.#largeur/2 * Math.tan(a*Math.PI/180)+ this.Y(),
					theta:180
					};
			}
			else if(direction==4)
			{
				return {
					X:-this.#hauteur/2/Math.tan(a*Math.PI/180)+ this.X(),
					Y:-this.#hauteur/2+ this.Y(),
					theta:-90
					};
			}
			return {X:0, Y:0, theta:0};
		}
		
	
	//Graphiques *******************************
	
		
		
		// ---------------------------------------
		/** Redessine et replace tout le bloc, de zéro.
		 * @param {boolean} [_update_=false] - Indique s'il faut mettre à jour la scène (stage).
		*/
		redessine(_update_ = false)
		{
		
			var unit = this.unite();
			
			this.x = this.X()*unit;
			this.y = this.Y()*unit;
		
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
	
			this.TEXT_TITRE = new createjs.Text(this.titre(),"bold "+this.#tailleTitre.toString()+"px Arial");
				this.TEXT_TITRE.textBaseline = 'top';
				this.TEXT_TITRE.textAlign = 'center';
				this.TEXT_TITRE.x = 0 ;
				this.TEXT_TITRE.y = this.#marge ;
			this.ENTETE.addChild(this.TEXT_TITRE);
			
			var ligne = new createjs.Shape();
				ligne.graphics.setStrokeStyle(this.#epaisseurLigneSeparations);
				ligne.graphics.beginStroke("black");
				ligne.graphics.moveTo(-this.largeur()/2* unit,this.TEXT_TITRE.y+this.TEXT_TITRE.getBounds().height+this.#marge);
				ligne.graphics.lineTo(this.largeur()/2*unit,this.TEXT_TITRE.y+this.TEXT_TITRE.getBounds().height+this.#marge);
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
	
	//Autre **********************************
	
	
		//cursor = "pointer";
	
	
	//Evénement *******************************
	
	
		
		// ---------------------------------------
		/** Fonction appellée au moment du press-bouton souris
		 * @param {event} [evt] - Événement qui vient d'avoir lieu
		*/
		PRESS(evt)
		{
			this.#offsetClic = {x:this.x-evt.stageX, y:this.y-evt.stageY};
			this.placeAu1erPlan();
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
			var elem = this.elementDirectementEnDessous();
			if(elem) // S'il y a un élément en dessous
			{
				if(this.#blocParent) // S'il y a déjà un parent (potentiellement à remplacer)
					this.#blocParent.supprimeBlocEnfant(this)
				elem.ajouteBlocEnfant(this);
			}
			else // Si pas d'élément en dessous (vide)
			{
				if(this.#blocParent)
					this.#blocParent.supprimeBlocEnfant(this)
			}
		}
		
}



