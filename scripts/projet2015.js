/***********************************************/
/**                                            */
/**              MINI-PROJET JS 2015           */
/**                                            */
/***********************************************/

/** placez ici votre code javascript réponse aux questions du sujet de projet */
var canvas; //Le canvas html
var img_vaisseau; //La soucoupe
var Y_vaisseau; //La largeur initiale de la soucoupe
var Y_canvas; //La largeur du canvas
var context_canvas; //Le context du canvas
var X_vaisseau=40; //positionement soucoupe en longueur
var X_canvas; //longueur totale canvas
var TOUCHE_HAUT=38;
var TOUCHE_BAS=40;
var TOUCHE_ESPACE=32;
var bouton_nouvelleSoucoupe;
var img_soucoupe;


/**
Initalise la soucoupe dans le canvas
**/
window.onload=function (){
	canvas=document.getElementById("stars");

	bouton_nouvelleSoucoupe = document.getElementById("nouvelleSoucoupe");
	bouton_nouvelleSoucoupe.addEventListener("click", function(){soucoupeVolante();});
	//recuperer longueur et largeur canvas
	Y_canvas=canvas.height;
	X_canvas=canvas.width;

	//positionner la soucoupe au milieu du canvas
	Y_vaisseau=Y_canvas/2;

	//definir l'image du vaisseau
	img_vaisseau=document.createElement('img');
	img_vaisseau.src="images/vaisseau-ballon-petit.png";	

	//definir l'image de la soucoupe
	img_soucoupe = document.createElement('img');
	img_soucoupe.src = "images/flyingSaucer-petit.png";

	//positionner la soucoupe initalement sur le canvas
	img_vaisseau.onload = function() {
   	 context_canvas=canvas.getContext('2d');
   	 context_canvas.drawImage(img_vaisseau,X_vaisseau,Y_vaisseau)
   	 	}
}

//Capturer entrer clavier
window.addEventListener('keydown',this.check,false);

/** 
verifie la touche du clavier et prend l'action correspondante
**/
function check(e) {
    var code = e.keyCode;
    //Touche haut
    if(code==TOUCHE_HAUT){
	    if(Y_vaisseau<8)
			return;
	    	context_canvas.clearRect(X_vaisseau, Y_vaisseau, 50, 50); 
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
    	tir(Y_vaisseau);
    }
}
/** 
Fonction tir: declence le tir et l'annime a chaque fois 
que la touche de tir est presser
**/
function tir(){
	img_tir=document.createElement('img');	
	img_tir.src="images/tir.png";

	var longueur_tir=X_vaisseau+50; //le tir commence 50 px apres la soucoupe.
	animationTir(Y_vaisseau);
	//animer le tir
	function animationTir(Y_vaisseau){
	    setTimeout(function(){
	    	//Si le premier a tire a deja ete fait
	    	if(longueur_tir>100){
	    		context_canvas.clearRect(longueur_tir-48,Y_vaisseau+10,50,10);
	    	}
	        context_canvas.drawImage(img_tir,longueur_tir,Y_vaisseau+10);
	        longueur_tir+=50;
	        if(longueur_tir<=X_canvas + 40){
	            animationTir(Y_vaisseau);
	        }
	    },60);
	}
}

/** 
Creer une nouvelle soucoupe et l'animer vers le vaisseau
**/
function soucoupeVolante(){
	var X_soucoupe=X_canvas-50; 
	var Y_soucoupe = Math.floor((Math.random() * Y_canvas) + 1);
   	context_canvas.drawImage(img_soucoupe,X_soucoupe,Y_soucoupe);
	bouton_nouvelleSoucoupe.blur();

	animationSoucoupe(Y_soucoupe);
	function animationSoucoupe(Y_soucoupe){
			setTimeout(function(){
				//Si la soucoupe a deja bouger une premiere fois
				if(X_soucoupe<X_canvas-50){
					context_canvas.clearRect(X_soucoupe+48,Y_soucoupe,50,50);
				}
		        context_canvas.drawImage(img_soucoupe,X_soucoupe,Y_soucoupe);
		        X_soucoupe-=50;
		        if(X_soucoupe>=-50){
		            animationSoucoupe(Y_soucoupe);
		        }
	    },300);
	}
}
/** n'oubliez pas de faire précéder le code de vos fonctions 
    d'un commentaire documentant la fonction                   **/