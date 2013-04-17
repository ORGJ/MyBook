

//$("#nuevaReferencia").live("pageinit", function(){
	 $(document).on('pageinit', '#nuevaReferencia',  function(){	
	
	$("#fotoRef").on("click", function(){
		foto.tomarFoto();
	});
		
});




    var foto = $.mobile.MyBooks={
    		tomarFoto : function(){
    			navigator.camera.getPicture(function(imageData){
    			
					var url = "data:image/jpeg;base64," + imageData;
					$("#fotoRef").css("background","url("+url+") 50% 50%").data("imag", url);
					
				}, function(message){
					console.log("Error al capturar foto!!!"+ message)
				}, { quality: 50,
			        destinationType: Camera.DestinationType.DATA_URL,
			        saveToPhotoAlbum: false}
				);
    		}
    		
    		
    		
    }
    
    