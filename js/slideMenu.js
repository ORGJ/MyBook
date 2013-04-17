
$(document).bind("pageinit", function(){
	var menu = 0;

	$(window).resize(function() {
		if(menu == 0){
			$(".contenido").css("width", ($(window).width() -22)+"px");
		}else if(menu == 1){
			$(".contenido").css("width",($(window).width()-$(".menuGlobal").width()-22)+"px");
			
		}
		
			
		if($(window).height() <= 360){
			$(".menuGlobal a").css("height", "18%");
			
		
		}
		else{
			$(".menuGlobal a").css("height", "");
		}
		
	

		});
	$(".menuGlobalButtom").on("click",function(){
		if(menu == 0){
		    $(".menuGlobal").removeClass('cerrarMenu').addClass('abrirMenu');
		    $(".contenido").removeClass('cerrarContenido').addClass('abrirContenido').css("width",($(window).width()-$(".menuGlobal").width()-22)+"px");
		  
		    menu =1;
		}
		else if(menu == 1){
		    $(".menuGlobal").removeClass('abrirMenu').addClass('cerrarMenu');
		    $(".contenido").removeClass('abrirContenido').addClass('cerrarContenido').css("width", ($(window).width() -22)+"px");
		 
		    menu =0;
		}
	});	
	
	$("#inicio").live("pageshow", function(){
		 $(".menuGlobal").removeClass('abrirMenu').addClass('cerrarMenu');
		    $(".contenido").removeClass('abrirContenido').addClass('cerrarContenido').css("width", ($(window).width() -22)+"px");
		 
		    menu =0;

	});
	$("#listadoReferencia").live("pageshow", function(){
		   $(".menuGlobal").removeClass('abrirMenu').addClass('cerrarMenu');
		    $(".contenido").removeClass('abrirContenido').addClass('cerrarContenido').css("width", ($(window).width() -22)+"px");
		 
		    menu =0;

		
	});
	
})
