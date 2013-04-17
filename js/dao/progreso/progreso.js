
//$("#nuevaReferencia").live("pageinit", function(){
 $(document).on('pageinit', '#nuevaReferencia',  function(){	
	
	   TolitoProgressBar('progressbar')
       .setOuterTheme('b')
       .setInnerTheme('e')
       .isMini(true)
       .setMax(100)
       .setStartFrom(0)
       .showCounter(true)
       .logOptions()
       .build()
	
	
	$("#estadoRefSelect").on("change", function(){
		var estadoLib = $("#estadoRefSelect").val();
		if(estadoLib== 5){
			$("#progresoLibroDiv").css("display", "block");
			$("#prestamoLibDiv").css("display", "none");
		}
		else if(estadoLib == 2){
			$("#prestamoLibDiv").css("display", "block");
			$("#progresoLibroDiv").css("display", "none");
			
		}
		else{
			$("#prestamoLibDiv").css("display", "none");
			$("#progresoLibroDiv").css("display", "none");
		}
	});
	
	$("#totalPaginas").on("keyup",function(){
		var progresoLib = parseFloat((($("#paginaActual").val()*100)/$("#totalPaginas").val()).toFixed(2));
	    TolitoProgressBar('progressbar')
	        .setOuterTheme('b')
	        .setInnerTheme('e')
	        .isMini(true)
	        .setMax(100)
	        .setStartFrom(progresoLib)
	        .showCounter(true)
	        .logOptions()
	        .build()
	});
	
	
	$("#paginaActual").on("keyup",function(){
		
		var progresoLib = parseFloat((($("#paginaActual").val()*100)/$("#totalPaginas").val()).toFixed(2));
	    TolitoProgressBar('progressbar')
	        .setOuterTheme('b')
	        .setInnerTheme('e')
	        .isMini(true)
	        .setMax(100)
	        .setStartFrom(progresoLib)
	        .showCounter(true)
	        .logOptions()
	        .build()
	});
	


});