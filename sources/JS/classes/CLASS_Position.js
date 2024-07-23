


//=================================================
// Constructeur
//=================================================
class Position
{


	
	//Membres **************************
		//Infos
		/** Coordonnées sur X, pour un zoom de 100%.
		* @private
		* @type {number}
		* @default 0*/
		#X = 0;
		
		/** Coordonnées sur Y, pour un zoom de 100%.
		* @private
		* @type {number}
		* @default 0*/
		#Y = 0;
		
		/** Position angulaire (angle de rotation), en degrés dans le sens anti-trigonométrique.
		* @private
		* @type {number}
		* @default 0*/
		#theta = 0;
		
		
		
		
//		par rapport à l'origine du repère du Container (qui peut éventuellement se translater)
		
	// Constructeur ***********************************
		
		// ---------------------------------------
		/** Initialiser la coordonnées (par rapport à l'origine du calque DIAGRAMME, qui peut translater)
		 * @param {number} [_X_=0] - Coordonnée sur X.
		 * @param {number} [_Y_=0] - Coordonnée sur Y.
		 * @param {number} [_theta_=0] - Position angulaire (sens anti-trigo).
		 * @param {boolean} [_coordReelles_=false] - Si false : coordonnées pour un zoom de 100%. Si true, coordonnées absolues.
		 * @param {boolean} [_radian_=false] - Indique si l'angle est en degré (false) ou en radian (true).
		*/
		constructor(_X_=0,_Y_=0,_theta_=0, _coordReelles_=false, _radian_=false)
		{
			if(_coordReelles_)
				var echelle = this.unite();
			else
				var echelle = 1;
				
			this.#X = _X_/echelle;
			this.#Y = _Y_/echelle;
			if(_radian_)
				this.#theta = _theta_/Math.PI*180;
			else
				this.#theta = _theta_;
				
				
			//this.redessine(false);
		}
	
	

	// Getters / Setters ******************************
	
	
		
		// ---------------------------------------
		/** Coordonnées sur X pour un zoom de 100% (Si le zoom est de 100%, l'unité est le pixel). Getter/Setter
		 * @param {number} [_X_] - Coordonnée. Si absent, la méthode est un getter
		 * @return {number} La coordonnées sur X (finale)
		*/
		X(_X_)
		{
			if(typeof(_X_) != 'undefined')
			{
				this.#X = _X_;
			}
			return this.#X;
		}
		
		
		
		
		// ---------------------------------------
		/** Coordonnées sur Y pour un zoom de 100% (Si le zoom est de 100%, l'unité est le pixel). Getter/Setter
		 * @param {number} [_Y_] - Coordonnée. Si absent, la méthode est un getter
		 * @return {number} La coordonnées sur Y (finale)
		*/
		Y(_Y_)
		{
			if(typeof(_Y_) != 'undefined')
			{
				this.#Y = _Y_;
			}
			return this.#Y;
		}
		
		
		// ---------------------------------------
		/** Position angulaire, dans le sans anti-trigonométrique. Getter/Setter
		 * @param {number} [_t_] - Angle de rotation, dans le sans anti-trigo. L'unité dépend du paramètre "radian" (par défaut : en degré). Si absent, la méthode est un getter
		 * @param {boolean} [_radian_=true] - Dit si l'angle donné (getter) est en radian ou non.
		 * @return {number} L'angle (finale) en degré.
		*/
		theta(_t_, _radian_=false)
		{
			if(typeof(_t_) != 'undefined')
			{
				if(_radian_)
					_t_=_t_/Math.PI*180;
				this.#theta = _t_;
			}
			return this.#theta;
		}
		
		
		
		
		
		// ---------------------------------------
		/** Coordonnées sur x réelle en pixel par rapport à l'origine du repère du Container (qui peut éventuellement se translater). Getter/Setter
		 * @param {number} [_x_] - Coordonnée. Si absent, la méthode est un getter
		 * @return {number} La coordonnées sur x (finale)
		*/
		x(_x_)
		{
			if(typeof(_x_) != 'undefined')
			{
				this.#X = _x_/this.unite();
			}
			return this.#X*this.unite();
		}
		
		
		
		
		
		// ---------------------------------------
		/** Coordonnées sur y réelle en pixelp ar rapport à l'origine du repère du Container (qui peut éventuellement se translater). Getter/Setter
		 * @param {number} [_y_] - Coordonnée. Si absent, la méthode est un getter
		 * @return {number} La coordonnées sur y (finale)
		*/
		y(_y_)
		{
			if(typeof(_y_) != 'undefined')
			{
				this.#Y = _y_/this.unite();
			}
			return this.#Y*this.unite();
		}
		
		
		
		
		
		// ---------------------------------------
		/** Renvoie l'unité du dessin (en px par unité) provenant de l'objet global DIAGRAMME
		 * @return {number} L'unité (finale)
		*/
		unite()
		{
			return DIAGRAMME.unite()
		}
}



