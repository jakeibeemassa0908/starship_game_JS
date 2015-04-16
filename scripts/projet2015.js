/***********************************************/
/**                                            */
/**              MINI-PROJET JS 2015           */
/**                                            */
/***********************************************/

/** placez ici votre code javascript réponse aux questions du sujet de projet */
var canvas; //Le canvas html
var img_soucoupe; //La soucoupe
var position_soucoupe; //La largeur initiale de la soucoupe
var largeur_canvas; //La largeur du canvas
var context_canvas; //Le context du canvas
var longueur_soucoupe=40; //positionement soucoupe en longueur
var longueur_canvas; //longueur totale canvas
var TOUCHE_HAUT=38;
var TOUCHE_BAS=40;
var TOUCHE_ESPACE=32;

/**
Initalise la soucoupe dans le canvas
**/
window.onload=function (){
	canvas=document.getElementById("stars");
	//recuperer longueur et largeur canvas
	largeur_canvas=canvas.height;
	longueur_canvas=canvas.width;

	//positionner la soucoupe au milieu du canvas
	position_soucoupe=largeur_canvas/2;

	//definir l'image de la soucoupe
	img_soucoupe=document.createElement('img');
	img_soucoupe.src="images/vaisseau-ballon-petit.png";	

	//positionner la soucoupe initalement sur le canvas
	img_soucoupe.onload = function() {
   	 context_canvas=canvas.getContext('2d');
   	 context_canvas.drawImage(img_soucoupe,longueur_soucoupe,position_soucoupe)
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
	    if(position_soucoupe<8)
			return;
	    	context_canvas.clearRect(longueur_soucoupe, position_soucoupe, 50, 50); 
	    	position_soucoupe-=8; //bouger la soucoupe de 8 pixels
	    	context_canvas.drawImage(img_soucoupe,longueur_soucoupe,position_soucoupe);
    } 
    //touche bas
    else if (code==TOUCHE_BAS){
    	if(position_soucoupe>largeur_canvas-45)
			return;
    	context_canvas.clearRect(longueur_soucoupe, position_soucoupe, 50, 50);
    	position_soucoupe+=8;
    	context_canvas.drawImage(img_soucoupe,longueur_soucoupe,position_soucoupe);
    }
    //touche espace
    else if(code==TOUCHE_ESPACE){
    	//declencher le tir
    	tir(position_soucoupe);
    }
}
/** 
Fonction tir: declence le tir et l'annime a chaque fois 
que la touche de tir est presser
**/
function tir(){
	img_tir=document.createElement('img');	
	img_tir.src="images/tir.png";

	var longueur_tir=longueur_soucoupe+50; //le tir commence 50 px apres la soucoupe.
	animationTir(position_soucoupe);
	//animer le tir
	function animationTir(position_soucoupe){
	    setTimeout(function(){
	    	if(longueur_tir>100){
	    		context_canvas.clearRect(longueur_tir-48,position_soucoupe+10,50,10);
	    	}
	        context_canvas.drawImage(img_tir,longueur_tir,position_soucoupe+10);
	        longueur_tir+=50;
	        if(longueur_tir<=longueur_canvas+40){
	            animationTir(position_soucoupe);
	        }
	    },60)
	}
}
/** n'oubliez pas de faire précéder le code de vos fonctions 
    d'un commentaire documentant la fonction                   **/