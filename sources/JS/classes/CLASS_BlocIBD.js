


//=================================================
// Constructeur
//=================================================
/** Bloc pour diagrame IBD
 * @extends Bloc*/
class BlocIBD extends Bloc
{

	//Membres **************************
			
		/** Donne l'information du type d'objet
		* @public
		* @type {string}
		* @default "Objet Graphique"*/
			TYPE = "bloc IBD"
			
			
		/** Nom de l'instance de l'objet (exemple : moteur1)
		* @private
		* @type {string}
		* @default "" */
		#nomInstance = "";
		
		
		/** Nom de classe de l'objet (exemple : actionneur)
		* @private
		* @type {string}
		* @default "" */
		#classe = ""
		
		
		/** Titre à afficher sur le bloc. Si chaîne nulle (""), alors le titre est construit à partir du nom de l'instance et de la classe.
		* @private
		* @type {string}
		* @default "" */
		#titre = "";
		
		
		
		
	// Constructeur ***********************************
		// ---------------------------------------
		/** Constructeur
		 * @param {object} [_options_] - Tableau de paramètres (facultatifs) qui initialisent l'objet.
		 * @param {string} [_options_.nomInstance] - Nom de l'instance (nom de l'objet. Ex : "MCC1")
		 * @param {string} [_options_.classe] - Nom de la classe (quel type d'objet. Ex : "actionneur")
		*/
		constructor(_options_)
		{
			super(_options_); // Appel du constructeur parent (héritage)
			
			// Chargement des paramètres -----------------
			if(typeof(_options_)=="object")
			{	
			 	if("titre" in _options_) // <-- Existe dans la classe mere, mais obligé de le redéfinir
			 		this.#titre = _options_.titre ;
			 	if("nomInstance" in _options_)
			 		this.#nomInstance = _options_.nomInstance;
			 	if("classe" in _options_)
			 		this.#classe = _options_.classe ;
			}	
				
			//this.redessine(false);
		}
	
	

	// Getters / Setters ******************************
	
	
		
		
		
		
		
		// ---------------------------------------
		/** Nom de l'instance du bloc. (getter/setter)
		 * @param {string} [_n_] - Nom de l'instance.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {string} Nom de l'instance (final).
		*/
		nomInstance(_n_, _redessine_=true)
		{
			if(typeof(_n_) != 'undefined')
			{
				this.#nomInstance = _n_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#nomInstance;
		}
		
		
		
		
		// ---------------------------------------
		/** Nom de la classe du bloc. (getter/setter)
		 * @param {string} [_c_] - Nom de la classe.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {string} Nom de la classe (final).
		*/
		classe(_c_, _redessine_=true)
		{
			if(typeof(_c_) != 'undefined')
			{
				this.#classe = _c_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#classe;
		}
		
		
		// ---------------------------------------
		/** Titre à afficher en haut du bloc. (getter/setter)
		 * Attention : Dans le cas où le titre est une chaîne de caractère vide (""),
		 * alors, il sera automatiquement construit à partir de this.nomInstance() et this.classe() de la forme suivante :
		 * - Si classe() renvoie une chaîne vide : this.titre() renvoie this.nomInstance().
		 * - sinon, this.titre() renvoie une concaténation de this.nomInstance() et this.classe(), séparés par deux points ":"
		 * @param {string} [_t_] - Le titre.
		 * @param {boolean} [_redessine_=true] - Redessine le bloc de zéro.
		 * @return {string} Le titre (final).
		*/
		titre(_t_, _redessine_=true)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#titre = _t_;
				if(_redessine_)
					{this.redessine();}
			}

			if(this.#titre=="")
			{
				if(this.#classe=="")
					return this.#nomInstance;
				return this.#nomInstance+" : "+this.#classe;
			}
			return this.#titre;
		}
		
		
		// --------------------------------------
		/* Fonction qui génère les lignes de commande permettant de recréer l'objet (pour une sauvegarde, par exemple)
		 *
		 * @return {string} Commandes
		 */
		 getCommandeGeneration()
		 {
		 	return "";
		 }
		
		
		// --------------------------------------
		/* Fonction qui renvoie un objet contenant les valeurs des parmètres de this
		 *
		 * @return {object}
		 */
		 getListeParametres()
		 {
		 	var tab= super.getListeParametres();
		 	
		 	tab.titre = this.#titre ;
		 	tab.nomInstance = this.#nomInstance ;
			tab.classe = this.#classe ;
		 	
		 	return tab;
		 }
		 
		 
		// --------------------------------------
		/* Fonction qui renvoie (sous forme de chaîne de caractère) le NOM de la fonction qui génère l'objet.
		 * Va de paire avec this.getCommande().
		 * @return {string} Le nom de la fonction.
		 */
		 getFonctionCommande()
		 {
			return "ajouteBlocIBD"
		 }
	
	//Graphiques *******************************
	
	
	
	
	//Autre **********************************
	
	
	//Evénement *******************************
}



