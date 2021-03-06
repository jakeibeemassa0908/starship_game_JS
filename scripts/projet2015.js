/**                                            */
/**              MINI-PROJET JS 2015           */
/**                                            */
/***********************************************/

/** placez ici votre code javascript réponse aux questions du sujet de projet */
var canvas; //Le canvas html
var img_vaisseau; //La soucoupe
var img_tir;
var Y_vaisseau=0; //La largeur initiale de la soucoupe
var Y_canvas; //La largeur du canvas
var context_canvas; //Le context du canvas
var X_vaisseau=40; //positionement soucoupe en longueur
var X_canvas; //longueur totale canvas
var TOUCHE_HAUT=38;
var TOUCHE_BAS=40;
var TOUCHE_ESPACE=32;
var bouton_nouvelleSoucoupe;
var bouton_flotteSoucoupe;
var flag=false; 
var img_soucoupe;
var score=0;
var intervaleTemps=2000; //intervale temps en milliseconde pour que une nouvelle soucoupe soit creer
var afficheScore;
var tirArray=[];
var soucoupeArray=[];
var soucoupeEchapee=0;


/**
Initalise la soucoupe dans le canvas
**/
window.onload=function (){
	canvas=document.getElementById("stars");
	//recuperer longueur et largeur canvas
	Y_canvas=canvas.height;
	X_canvas=canvas.width;

	//recuperer le score
	afficheScore=document.getElementById("score");
	afficheScore.innerHTML=score;

	//positionner la soucoupe au milieu du canvas
	Y_vaisseau=Y_canvas/2;

	//definir l'image du vaisseau
	img_vaisseau=document.createElement('img');
	img_vaisseau.src="images/vaisseau-ballon-petit.png";	

	img_tir=document.createElement('img');	
	img_tir.src="images/tir.png";

	//definir l'image de la soucoupe
	img_soucoupe = document.createElement('img');
	img_soucoupe.src = "images/flyingSaucer-petit.png";


	//positionner la soucoupe initalement sur le canvas
	img_vaisseau.onload = function() {
   	 context_canvas=canvas.getContext('2d');
   	 context_canvas.drawImage(img_vaisseau,X_vaisseau,Y_vaisseau)
   	 }

   	bouton_nouvelleSoucoupe = document.getElementById("nouvelleSoucoupe");
	bouton_nouvelleSoucoupe.addEventListener("click", function(){
			creerNouvelleSoucoupe();
		});

	bouton_flotteSoucoupe = document.getElementById("flotteSoucoupes");
	bouton_flotteSoucoupe.addEventListener("click", function(){
			flag = !flag;
			bouton_flotteSoucoupe.blur();
			creerSoucoupeTime();
		});
}

//Capturer entrer clavier
window.addEventListener('keydown',this.check,false);

/** 
	Creer une nouvelle soucoupe dans un interval specific de temps
**/
function creerSoucoupeTime(){
	var nombreAleatoire = genererNomberAleatoire(10);//creer un nombre aleatoire entre 0-10
	setTimeout(function(){
		if(flag & soucoupeEchapee<3){
			creerSoucoupeTime();
			//creer la probabilite 0.5 en verifiant si le nombre aleatoirement creer est pair ou impair
			if(nombreAleatoire%2==0){
				creerNouvelleSoucoupe();
			}
		}
	},intervaleTemps);
}

/** 
verifie la touche du clavier et prend l'action correspondante
**/
function check(e) {
	//Ne pas reagir si les soucoupes echapee sont 3 ou plus
	if(soucoupeEchapee>=3)
		return;

    var code = e.keyCode;
    //Touche haut
    if(code==TOUCHE_HAUT){
	    if(Y_vaisseau<8)
			return;
	    	context_canvas.clearRect(X_vaisseau, Y_vaisseau, img_vaisseau.width, img_vaisseau.height); 
	    	Y_vaisseau-=8; //bouger la soucoupe de 8 pixels
	    	context_canvas.drawImage(img_vaisseau,X_vaisseau,Y_vaisseau);
    } 
    //touche bas
    else if (code==TOUCHE_BAS){
    	if(Y_vaisseau>Y_canvas-45)
			return;
    	context_canvas.clearRect(X_vaisseau, Y_vaisseau, 50, 50);
    	Y_vaisseau+=8;
    	context_canvas.drawImage(img_vaisseau,X_vaisseau,Y_vaisseau);
    }
    //touche espace
    else if(code==TOUCHE_ESPACE){
    	//declencher le tir
	    var instance = new tir();
	    instance.initialize(X_vaisseau+50,Y_vaisseau);
	    instance.animationTir();

	    tirArray.push(instance);
    }
}
/** 
Fonction tir: declence le tir et l'annime a chaque fois 
que la touche de tir est presser
**/

function tir(){
	this.initialize = function(x,y){
		this.x = x;
		this.y=y;
		this.width=img_tir.width;
		this.height=img_tir.height;
	}
	this.animationTir=function animationTir(){
		var that=this;
	    setTimeout(function(){
	    	//Si le premier a tire a deja ete fait
	    	if(that.x>100){
	    		context_canvas.clearRect(that.x-50,that.y+10,img_tir.width,img_tir.height);
	    	}
	        context_canvas.drawImage(img_tir,that.x,that.y+10);
	        that.x+=50;

	        var soucoupe_atteinte=tirReussi(that);
	        //La soucoupe a ete etteinte
	        if(soucoupe_atteinte!=null){
	        	context_canvas.clearRect(that.x-50,that.y+10,img_tir.width,img_tir.height);
				//enlever la soucoupe de l'array
				enleverSoucoupe(soucoupe_atteinte);
				soucoupe_atteinte.atteint=true;
				//mettre a jour le score
				score+=200;
				mettreAJourScore();
				//effacer le tir
				that.x=undefined;
				that.y=undefined;
			}

	        if(that.x<=X_canvas + 40){
	            that.animationTir(that.y);
	        }
	    },60);
	}
}

/** 
Creer une nouvelle soucoupe et l'animer vers le vaisseau
**/
function soucoupeVolante(){
	this.x=X_canvas-50; 
	this.width=img_soucoupe.width;
	this.height=img_soucoupe.height;
	this.y = genererNomberAleatoire(Y_canvas-this.height);
	this.atteint=false;
	bouton_nouvelleSoucoupe.blur();

	this.animationSoucoupe =function animationSoucoupe(){
			var that =this;
			setTimeout(function(){
				//Si la soucoupe a deja bouger une premiere fois
				if(that.x<X_canvas- that.width){
					context_canvas.clearRect(that.x+that.width,that.y,that.width,that.height);
				}
				//bouger soucoupe
		        context_canvas.drawImage(img_soucoupe,that.x,that.y);


		        if(soucoupeEchapee<3){
			        //si la soucoupe a ete atteinte ou n'est pas sorti du canvas
			        if(that.x>=-50 && that.atteint==false){
			        	that.x-=50;
			            that.animationSoucoupe(that.y);
			        }else{
		        	
		        	//si la soucoupe est sortie du canvas
		        	if(that.x<=0){
		        		score-=1000;
		        		soucoupeEchapee++;
		        		mettreAJourScore();
		        		enleverSoucoupe(that);
		        		context_canvas.clearRect(that.x+that.width,that.y,that.width,that.height);
		        	}

		        	//Si la soucoupe a ete atteinte, deplacer vers le bas
		        	context_canvas.clearRect(that.x+that.width,that.y,that.width,that.height);
		        	deplacementVersBas(that);
			        }
	        }
	    },400);
	}
}

/** 
	Creer une nouvelle soucoupe et l'animer
**/
function creerNouvelleSoucoupe(){
		var newSoucoupe = new soucoupeVolante();
		newSoucoupe.animationSoucoupe();
		soucoupeArray.push(newSoucoupe);
}

/** 
	Verifier la colision entre le tir et chacune de soucoupes de l'array
**/
function checkColision(t){
	for (var i = 0;i<soucoupeArray.length;i++) {
			if(colision(t,soucoupeArray[i])){
				return soucoupeArray[i];
			}
	}
	return null;
}

/** 
	Verifier si le tir a atteing une cible.
**/
function tirReussi(tir){
	return checkColision(tir);
}

/** 
	verifier si le tir a atteint une soucoupe parmis les nombreuses soucoupes dans l'array
**/
function colision(a,b){
	    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

/** 
	Enlever la soucoupe atteinte de l'array de soucoupe
**/
function enleverSoucoupe(soucoupe){
	var index=soucoupeArray.indexOf(soucoupe);
	if(index >-1){
		soucoupeArray.splice(index,1);
	}
}

/**
Mettre a jour le score
**/
function mettreAJourScore(){
	//reduire l'interval temps au fur et a mesure que le score augmente
	if (intervaleTemps>800 && score >1000) {
		intervaleTemps-= score-800;
	};
	afficheScore.innerHTML=score;
}

//Generer un nombre aleatoire de 0 a limite
function genererNomberAleatoire(limite){
	return Math.floor((Math.random() * limite) + 1);
}

/** 
Deplacer la soucoupe toucher vers le bas
**/
function deplacementVersBas(soucoupeADeplacer){
	var that = soucoupeADeplacer;
	setTimeout(function(){
		context_canvas.clearRect(that.x,that.y-that.height,that.width,that.height);
		context_canvas.drawImage(img_soucoupe,that.x,that.y);
		that.y+=that.height;
		if(that.y>0){
			deplacementVersBas(that);
		}

	},200);

}
/** n'oubliez pas de faire précéder le code de vos fonctions 
    d'un commentaire documentant la fonction  **/