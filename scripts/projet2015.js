/***********************************************/
/**                                            */
/**              MINI-PROJET JS 2015           */
/**                                            */
/***********************************************/

/** placez ici votre code javascript réponse aux questions du sujet de projet */
var canvas;
var img;
var hauteur;
var hauteur_canvas;
var ctx;
var largeur=40;

window.onload=function (){
	canvas=document.getElementById("stars");
	//recuperer hauteur canvas
	hauteur_canvas=canvas.height;
	hauteur=hauteur_canvas/2;

	img=document.createElement('img');
	img.src="images/vaisseau-ballon-petit.png";	

	img.onload = function() {
   	 ctx=canvas.getContext('2d');
   	 ctx.drawImage(img,largeur,hauteur);
	}
}

//Capturer entrer clavier
window.addEventListener('keydown',this.check,false);
function check(e) {
    var code = e.keyCode;
    if(code==38){
	    if(hauteur<8)
			return;
	    	ctx.clearRect(largeur, hauteur, 50, 50);
	    	ctx.drawImage(img,largeur,hauteur-8);
	    	hauteur-=8;
    } 
    else if (code==40){
    	if(hauteur>hauteur_canvas-45)
			return;
    	ctx.clearRect(largeur, hauteur, 50, 50);
    	ctx.drawImage(img,largeur,hauteur+8);
    	hauteur+=8;
    }
}

function tir(){

}

/** n'oubliez pas de faire précéder le code de vos fonctions 
    d'un commentaire documentant la fonction                   **/