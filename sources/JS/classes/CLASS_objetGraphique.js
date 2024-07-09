


//=================================================
// OBJET GRAPHIQUE
//=================================================
/** Classe mère d'un objet à graphique qui sera représenté sur les graphes
 * @extends createjs.Container*/
class ObjetGraphique extends createjs.Container
{


	
	//Membres **************************
		//Infos
		#zoomLimite = 1;
		#diagramme = null;
		TYPE = "Objet Graphique"
		
		
		
		
	// ****************************************************
	/** Constructeur
	 * @param {string} [_titre_=""] - Titre à afficher sur le bloc
	*/
		constructor(_options_)
		{
			super();
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



