function procesa_envio (event)
{
	event.preventDefault();
	console.log("Procesando envío!!!");	
	let salida = document.getElementById("salida");	
	let nombre = document.getElementById("contacto_name");
	
	if (nombre.value.length < 2){
		salida.value = "El nombre debe de tener al menor 2 caracteres";
		
		nombre.style.color = "#ff0000";
		nombre.style.border = "1px solid #ff0000";
		
		nombre.focus();
		
		return false;
	}
	
	
	document.getElementById("form_contacto").submit();
}