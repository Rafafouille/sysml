


//=================================================
// Constructeur
//=================================================
class Diagramme extends createjs.Container
{


	
	//Membres **************************
		//Infos
		#titre = "";
		#systeme = "Système";
		#nature = "Modèle";
		#type = "";
		#taillePoliceCartouche = 12;
		#epaisseurLigne = 2;
		#unite = 1;
		// Graphiqmes
		CADRE = null;
		CARTOUCHE = null;
		CONTENU = null;
		//#dimensionIcone = 50;		//Largeur et hauteur
		//#couleurFoncIcone="#FF0000";
		
		
		
		
		
	// Constructeur ***********************************
		constructor(_titre_, _type_, _systeme_, _options_)
		{
			super();
			
			this.#titre = _titre_;
			this.#type = _type_;
			this.#systeme = _systeme_;
			
			this.CONTENU = new createjs.Container();
				this.addChild(this.CONTENU);
			this.CARTOUCHE = new createjs.Container();
				this.addChild(this.CARTOUCHE);
			this.CADRE = new createjs.Container();
				this.addChild(this.CADRE);
				
			//this.redessineTout();
		}
	
	

	// Getters / Setters ******************************
	
	
		// Titre du diagrame
		titre(_t_, _redessine_=true)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#titre = _t_;
				if(_redessine_)
					this.redessineCartouche(true);
			}
			return this.#titre;
		}
		
		// Nom du système
		systeme(_s_, _redessine_=true)
		{
			if(typeof(_s_) != 'undefined')
			{
				this.#systeme = _s_;
				if(_redessine_)
					this.redessineCartouche(true);
			}
			return this.#systeme;
		}
		
		//  Type de diagramme (req, ...)
		type(_t_, _redessine_=true)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#type = _t_;
				if(_redessine_)
					this.redessineCartouche(true);
			}
			return this.#type;
		}
		
		
		//  Nature ([Modele...])
		nature(_n_, _redessine_=true)
		{
			if(typeof(_n_) != 'undefined')
			{
				this.#nature = _n_;
				if(_redessine_)
					this.redessineCartouche(true);
			}
			return this.#nature;
		}
		
		
		
		// Taille police cartouche
		taillePoliceCartouche(_t_,_redessine_=true)
		{
			if(typeof(_t_) != 'undefined')
			{
				this.#taillePoliceCartouche = _t_;
				if(_redessine_)
					this.redessineCartouche(true);
			}
			return this.#taillePoliceCartouche;
		}
		
		
		
		// Epaisseur ligne
		epaisseurLigne(_e_,_redessine_=true)
		{
			if(typeof(_e_) != 'undefined')
			{
				this.#epaisseurLigne = _e_;
				if(_redessine_)
					this.redessineCartouche(true);
			}
			return this.#epaisseurLigne;
		}
		
		
		
		// Epaisseur ligne
		unite(_u_,_redessine_=true)
		{
			if(typeof(_u_) != 'undefined')
			{
				this.#unite = _u_;
				if(_redessine_)
					this.redessineContenu(true);
			}
			return this.#unite;
		}
	
	//Graphiques *******************************
	
		redessine(_update_ = false)
		{
			this.redessineCadre();
			this.redessineCartouche();
			this.redessineContenu();
			if(_update_)
				this.stage.update();
		}
		
		
		zoom(_u_,_redessine_=true)
		{
			this.#unite *= _u_;
			if(_redessine_)
				this.redessineContenu(true);
		}
	
	
	// --------------------------------------------------------------
	redessineCadre(_update_ = false)
	{		
		this.CADRE.removeAllChildren();
		
		var rectangle = new createjs.Shape();
		rectangle.graphics.setStrokeStyle(this.#epaisseurLigne);
		rectangle.graphics.beginStroke('black');
		rectangle.graphics.drawRect (this.#epaisseurLigne,this.#epaisseurLigne,$("#canvas").width()-this.#epaisseurLigne*2, $("#canvas").height()-this.#epaisseurLigne*2);
		
		this.CADRE.addChild(rectangle);
		
		if(_update_)
			this.stage.update();
	}
	
	
	
	// --------------------------------------------------------------
	redessineContenu(_update_ = false)
	{		
		// redessine chaque enfant
		for(var i=0;i<this.CONTENU.children.length;i++)
		{
			if(typeof this.CONTENU.children[i].redessine === "function")
				this.CONTENU.children[i].redessine();
		}
		if(_update_)
			this.stage.update();
	}
	
	// --------------------------------------------------------------
	redessineCartouche(_update_)
	{
		this.CARTOUCHE.removeAllChildren();
		
		var texteType = new createjs.Text(this.type()+" ","bold "+this.#taillePoliceCartouche.toString()+"px Arial");
			texteType.textBaseline = 'top';
			texteType.x = 5 ;
			texteType.y = 5 ;
		
		var texteReste = new createjs.Text("[ "+this.nature()+" ] "+this.systeme()+" [ "+this.titre()+" ]",this.#taillePoliceCartouche.toString()+"px Arial");
			texteReste.textBaseline = 'top';
			texteReste.x = texteType.x+texteType.getBounds().width ;
			texteReste.y = 5 ;
		
		var ligne = new createjs.Shape();
			ligne.graphics.setStrokeStyle(this.#epaisseurLigne);
			ligne.graphics.beginStroke("black");
			ligne.graphics.beginFill("white");
			ligne.graphics.moveTo(0, texteType.y+texteType.getBounds().height+5);
			ligne.graphics.lineTo(texteReste.x+texteReste.getBounds().width+5, texteType.y+texteType.getBounds().height+5);
			ligne.graphics.lineTo(texteReste.x+texteReste.getBounds().width+15, texteType.y+texteType.getBounds().height-5);
			ligne.graphics.lineTo(texteReste.x+texteReste.getBounds().width+15, 0);
			ligne.graphics.lineTo(0, 0);
			
		this.CARTOUCHE.addChild(ligne);
		this.CARTOUCHE.addChild(texteType);
		this.CARTOUCHE.addChild(texteReste);
		
		if(_update_)
			this.stage.update();
		
	}
	
	//Autre **********************************
	
	
	//Evénement *******************************
}



