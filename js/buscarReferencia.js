$(document).bind("pageinit", function(){
	var menuMostrado = false;
	$("#campoBusqueda").css("left", $("#listadoReferencia").width());
	
	
	$(".buscarButtom").on("click", function(){
		
		if(menuMostrado == false){
			$("#campoBusqueda").css("left", ($("#listadoReferencia").width()-208)+"px");
			menuMostrado = true;
		}
		else if(menuMostrado == true){
			$("#campoBusqueda").css("left", $("#listadoReferencia").width());
			menuMostrado = false;
		}
	});
	
	
	$(window).resize(function() {
		if(menuMostrado == false){
			
			$("#campoBusqueda").css("left", $("#listadoReferencia").width());
			
		}
		else if(menuMostrado == true){
			$("#campoBusqueda").css("left", ($("#listadoReferencia").width()-208)+"px");
			
		}
		
	});
});