
    $.fn.buscar = function(opciones){
        
        var defecto ={
           palabra: '', 
       }
       var settings = $.extend(defecto, opciones);
      
  
     this.children().each(function(){
    	 
    	 if($(this).text().indexOf(settings.palabra) == -1){
    		 $(this).hide();
    	 }
    	 else{
    		 $(this).show();
    	 }
     });
        
    }
