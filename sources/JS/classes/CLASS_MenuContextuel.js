


//=================================================
// CLASS BLOC
//=================================================
/** Classe représentant un bloc (générique)
 * @extends ObjetGraphique*/
class MenuContextuel extends ObjetGraphique
{


	
	//Membres **************************
		//Infos
		TYPE = "menu contextuel" ;
		#listeBoutons = [];
		#listeBoutonsGraphiques = [];
		#tailleTexte = 12;
		#rayonPositionIcone=150;
		#diametreIcone=60;
		#target=null;
		
		
		
		
	// ****************************************************
	/** Constructeur
	 * @param {array} _listeBoutons_ - Liste des boutons du menu
	 * @param {ObjetGraphique} [_target_=null] - Liste des boutons du menu
	 * @param {object} [_options_] - Options
	*/
		constructor(_listeBoutons_, _target_=null , _options_)
		{
			super(_options_);
			
			this.#listeBoutons = _listeBoutons_;
			
			this.#target = _target_;
			
			this.redessine();
			
			
			this.on("rollout",this.referme)
 			
			
		}
	
	

	// Getters / Setters ******************************
	
	
		// ---------------------------------------
		/** Liste des boutons à afficher. Chaque bouton est de la forme : {nom: , action:, icone}
		 *
		 * @param {Array} [_l_] - Liste des boutons
		 * @param {boolean} [_redessine_=true] - Redessine le menu de zéro.
		 * @return {Array} Liste des boutons (final).
		*/
		listeBoutons(_l_, _redessine_=true)
		{
			if(typeof(_l_) != 'undefined')
			{
				this.#listeBoutons = _l_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#listeBoutons;
		}
		
	
		// ---------------------------------------
		/** Taille du texte à afficher
		 *
		 * @param {number} [_t_] - Taille du texte à afficher
		 * @param {boolean} [_redessine_=true] - Redessine le menu de zéro.
		 * @return {number} Taille du texte (final).
		*/
		tailleTexte(_t_, _redessine_=true)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#tailleTexte = _t_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#tailleTexte;
		}
		
	
		// ---------------------------------------
		/** Distance où positionner l'icone (centre du bouton) par rapport au point de clic.
		 *
		 * @param {number} [_r_] - Rayon (en pixel) de la marge
		 * @param {boolean} [_redessine_=true] - Redessine le menu de zéro.
		 * @return {number} Rayon (final).
		*/
		rayonPositionIcone(_r_, _redessine_=true)
		{
			if(typeof(_r_) != 'undefined')
			{
				this.#rayonPositionIcone = _r_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#rayonPositionIcone;
		}
		
	
		// ---------------------------------------
		/** Diamètre de l'icone (=hauteur)
		 *
		 * @param {number} [_d_] - Diamètre (en px)
		 * @param {boolean} [_redessine_=true] - Redessine le menu de zéro.
		 * @return {number} Diamètre (final).
		*/
		diametreIcone(_d_, _redessine_=true)
		{
			if(typeof(_d_) != 'undefined')
			{
				this.#diametreIcone = _d_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#diametreIcone;
		}
		
	
		// ---------------------------------------
		/** Element rattaché au menu (getter/setter)
		 *
		 * @param {ObjetGraphique} [_t_] - Référence à l'objet
		 * @return {ObjetGraphique} Référence (final).
		*/
		target(_t_)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#target = _t_;
			}
			return this.#target;
		}
		
		
		
		
		
		
	// Graphismes
	
		redessine(_update_=false)
		{
			this.removeAllChildren();			 			
 			
 			// Arriere plan
 			var circle = new createjs.Shape();
 				var ray = this.#rayonPositionIcone+this.#diametreIcone
				circle.graphics.beginRadialGradientFill(["rgba(255,255,255,0.75)","rgba(255,255,255,0)"], [0, 1], 0, 0, ray/2, 0, 0, ray).drawCircle(0, 0, ray);
				//circle.alpha=0.01;
				this.addChild(circle);
				circle.on("click",function(){this.parent.referme()})
 			
 			
			// Liste des objets
			if(this.#listeBoutons.length>5)
			{
				var thetaMin = -0.5*Math.PI
				var dtheta = 2*Math.PI/(this.#listeBoutons.length+1)
			}
			else
			{
				var thetaMin = -Math.PI
				var dtheta = Math.PI/(this.#listeBoutons.length+1)
			}
			
			for(var i=0; i<this.#listeBoutons.length; i++)
			{
				var b = this.#listeBoutons[i];
				var bouton = new createjs.Container();
					bouton.x = 0;//this.#rayonPositionIcone*Math.cos(Math.PI+(i+1)*dtheta);
					bouton.y = 0;//this.#rayonPositionIcone*Math.sin(Math.PI+(i+1)*dtheta);
					bouton.alpha=0;
					bouton.cursor = "pointer" ;
					bouton.on("click",b.action);
					bouton.addEventListener("click",this.referme.bind(this));
					bouton.on("mouseover",function(){this.children[0].shadow = new createjs.Shadow('#F00', 0, 0, 10);})
					bouton.on("mouseout",function(){this.children[0].shadow = null;})
					this.#listeBoutonsGraphiques.push(bouton);
					
					
				var icone = new createjs.Bitmap(b.icone);
					icone.scaleX = this.#diametreIcone/200;
					icone.scaleY = icone.scaleX ;
					icone.x=-this.#diametreIcone/2;
					icone.y=-this.#diametreIcone/2;
					bouton.addChild(icone);
					
				var texte = new createjs.Text(b.nom, "12px Arial", "black");
					texte.textAlign = "center";
					texte.y = this.#diametreIcone*0.55;
					bouton.addChild(texte);
					
					
				this.addChild(bouton);
				
				// Animation
				createjs.Tween.get(bouton).wait(50*i)
					.to({ x: this.#rayonPositionIcone*Math.cos(-thetaMin+(i+1)*dtheta), y: this.#rayonPositionIcone*Math.sin(-thetaMin+(i+1)*dtheta), alpha:1 }, 100, createjs.Ease.getPowInOut(2));	
			}
			
			
			if(_update_)
				this.stage.update();
		}
		
		
		
		
	
		// ---------------------------------------
		/** Fonction qui referme et détruit le menu
		 *
		 * @param {event} - Evenement
		*/
		referme(evt)
		{
			this.removeAllEventListeners();
			for(var i=0;i<this.#listeBoutonsGraphiques.length; i++)
			{
				var boutonGraphique = this.#listeBoutonsGraphiques[i];
				createjs.Tween.get(boutonGraphique).wait(100*i)
					.to({ x: 0, y: 0, alpha:0 }, 200, createjs.Ease.getPowInOut(2));	
			}
			this.#target.deselectionne();
			setTimeout(this.destroy.bind(this), this.#listeBoutonsGraphiques.length*100, this);
			
		}
		
}



