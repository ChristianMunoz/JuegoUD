var x = 350;
var y = 350;
var vida = 0;
var duracion = 0;
var rotacion = 0;
var msg = 0;
var enemigo = [[aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)]];

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	var lienzo = $("#lienzo")[0];
	var contexto = lienzo.getContext("2d");
	var buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");
	contextoBuffer.fillStyle = "#ffffff"; 
	contextoBuffer.clearRect(0,0,700,500);
	contextoBuffer.fillStyle = "#000000";
	contextoBuffer.fillRect(50,150,600,200);
	contextoBuffer.font = "bold 40px impact";
	contextoBuffer.fillStyle = "#ffffff"; 
	contextoBuffer.fillText("¡Bienvenido a un nuevo semestre!", 63, 200);
	contextoBuffer.font = "bold 35px impact";
	contextoBuffer.fillText("<------------------------", 210, 250);
	contextoBuffer.font = "25px impact";
	contextoBuffer.fillText("Esperamos hayas estudiado", 195, 300);
	contextoBuffer.fillText("Empezamos cuando quieras...", 190, 330);
	contexto.clearRect(0,0,700,500);
	contexto.drawImage(buffer, 0, 0);
	$("button").click(function(){	
		x = 350;
		y = 350;	
		vida = 100;
		duracion = 0;
		correr();		
	});
}

function aleatorio(tope){
	return Math.floor((Math.random() * tope) + 1);
} 

function capturaTeclado(event){
	if(event.which==39 || event.which==68)
		x += 10;
	if(event.which==37 || event.which==65)
		x -= 10;
	x = (700 + x)%700;
}

function Estudiante(){
	this.img = [$("#personaje")[0],$("#golpeado")[0]];
	this.msgs = ["Que motivado estoy!", "Cuando vimos esto?", "El profe me tiene en la mira", 
	             "Profe, colaboreme", "Vea que yo le asisto", "Reviseme el taller",
	             "No entiendo nada","Me van a echar","Debo estudiar para el proximo parcial",
	             "Me quiero morir!"];
	
	this.dibujar = function(ctx,i){
		var img = this.img[i];
		ctx.drawImage(img, x, y);
		ctx.save();
		ctx.fillStyle = "#aaaaff";
		ctx.font = "15px arial";
		ctx.fillStyle = "#ffffff";
		ctx.fillText(this.msgs[msg], x - 15, y + 40);
		ctx.restore();
	}
	
	this.colision = function(xx,yy){
		var distancia=0;
		distancia=Math.sqrt( Math.pow( (xx-x), 2)+Math.pow( (yy-y),2));
		if(distancia>40)
		   return false;
		else
		   return true;	
	}
}

function Parcial(){
	this.img = $("#parcial")[0];			
	this.dibujar = function(ctx, x1, y1){
		var img = this.img;
		ctx.save();
		ctx.translate(x1,y1);
		ctx.rotate(rotacion*Math.PI/180);
		ctx.drawImage(img,-img.width/2,-img.height/2);
		ctx.restore();
	}
}

function correr(){ 
	$("button").css("display","none");
	var lienzo = $("#lienzo")[0];
	var contexto = lienzo.getContext("2d");
	var buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");
	contextoBuffer.fillStyle = "#ffffff"; 
	if(vida >= 0){  		
		duracion++;
		var objEstudiante = new Estudiante();
		var objParcial = [new Parcial(),new Parcial(),new Parcial(),
						   new Parcial(),new Parcial(),new Parcial(),
						   new Parcial(),new Parcial(),new Parcial(),
						   new Parcial()]; 
		contextoBuffer.clearRect(0,0,700,500);

		contextoBuffer.font = "25px impact";
		contextoBuffer.fillText("vida = "+vida, 25, 25);
		contextoBuffer.fillText("puntos = "+parseInt(duracion/10), 250, 25);
		objEstudiante.dibujar(contextoBuffer,0);
		rotacion -= 10;
		for(i=0;i<10;i++){
			
			objParcial[i].dibujar(contextoBuffer,enemigo[i][0],enemigo[i][1]);
			if(objEstudiante.colision(enemigo[i][0],enemigo[i][1])){
				vida -=1;
				objEstudiante.dibujar(contextoBuffer,1);
				msg = aleatorio(9);
			}
			enemigo[i][0]-=aleatorio(4);
			enemigo[i][1]+=aleatorio(5)+2;
			enemigo[i][0] = (700 + enemigo[i][0])%700;
			enemigo[i][1] = (500 + enemigo[i][1])%500;
		}
		contexto.clearRect(0,0,700,500);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("correr()",20);
		
	}else{
		
		contextoBuffer.clearRect(0,0,700,500);

		contextoBuffer.font = "bold 50px impact";
		contextoBuffer.fillText("GAME OVER", 225, 180);
		contextoBuffer.fillText("Puntuacion: "+parseInt(duracion/10)+" pts", 160, 250);
		contextoBuffer.font = "30px impact";
		contextoBuffer.fillText("No has logrado salvar el semestre.", 150, 300);
		contexto.clearRect(0,0,700,500);
		contexto.drawImage(buffer, 0, 0);
		$("button").css("display","inline");
		
	}
}


