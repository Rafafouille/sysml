


//=================================================
// Constructeur
//=================================================
class BlocIBD extends Bloc
{


	
	//Membres **************************
		//Infos
		#nomInstance = "";
		#classe = ""
		
		
		
		
		
		
	// Constructeur ***********************************
		constructor(_nomInstance_,_classe_="", _options_)
		{
			super();
			
			this.#nomInstance = _nomInstance_;
			this.#classe = _classe_;
				
				
			//this.redessine(false);
		}
	
	

	// Getters / Setters ******************************
	
	
		
		
		
		//  Nom de l'instance du bloc
		nomInstance(_n_, _redessine_=true)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#nomInstance = _n_;
				if(_redessine_)
					{this.redessine();}
			}
			return this.#nomInstance;
		}
		
		
		
		//  Classe du bloc
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
		
		
		
		
		//  Titre du bloc (ECRASE LE PARENT)
		titre(_t_, _redessine_=true)
		{
			// le setter est ignoré
			if(this.#classe=="")
				return this.#nomInstance;
			return this.#nomInstance+" : "+this.#classe;
		}
		
		
		
		
	
	//Graphiques *******************************
	
	
	
	
	//Autre **********************************
	
	
	//Evénement *******************************
}



