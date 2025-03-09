let num_max = 100;
let num_min = 1;
	
let numero_random = Math.floor(Math.random()*num_max)+num_min;

console.log("El número a adivinar es: "+numero_random);

let info = "Introduce un número entre el 1 y el 100 para adivinar el número";

let veces = 0;
	
function check_number ()
{
	
	let valor = document.getElementById("juego_numero").value;
	
	let resultado = document.getElementById("resultado");
	
	let contador = document.getElementById("contador");
	
	if (valor < num_min) {
	resultado.value = "El número debe ser 1 o mayor";
	return;
	}
	else if (valor > num_max) {
	resultado.value = "El número debe ser 100 o menor";
	return;
	}
	
	let text = " ";
	
	if (valor > numero_random) {
	text = "El número a adivinar es menor a "+valor;
	}
	else if (valor < numero_random){
	text = "El número a adivinar es mayor a "+valor;
	}
	else {
	text = "Has acertado!!";
	}
	
	veces++;
	resultado.value = text;
	contador.value = veces;
}