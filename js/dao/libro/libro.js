
	
 $(document).on('pageinit', '#nuevaReferencia',  function(){
		
		$('#agregarAutor').on('click', function(){
			
			 if(referencia.modoEdicionLibro.edit == true){
	            	referencia.guardarAutorBD();
			    }
			 
		    if(referencia.modoEdicionAutor.edit ==false){

				referencia.agregarAutor();
			}
			else{
				referencia.editarAutor();
			}
		    
            $("#nombreAutor").val("");
		 
		});
		$('#guardarReferencia').on('click', function(){
			if(referencia.modoEdicionLibro.edit == false){
				
				referencia.agregarLibro();
					
			}
			else{
				referencia.editarLibro(referencia.modoEdicionLibro.val);
			}
			
		})
		$('.btnNuevaRef').on('click', function(){
			
			   $("#tipoRefSelect").val("");
				$("#estadoRefSelect").val("");
				$("#nombreRef").val("");
				$("#fotoRef").val("");
				$("#nombreAutor").val("");
				$("#listadoRef").html("");
				$("#paginaActual").val("");
				$("#ultimaLectura").val(""); 
				$("#totalPaginas").val("");
				$("#fechaPrestamo").val("");
				$("#usuarioPrestamo").val("");
				referencia.modoEdicionLibro.edit = false;
		
		});
	
	});
	 $(document).on('pageinit', '#listadoReferencia',  function(){
		 referencia.verTodasLasReferencias();
	  });
	//$("#listadoReferencia").live("pageinit", function(){
	//	
	//	referencia.verTodasLasReferencias();
	//})
	
	 var referencia = $.mobile.MyBooks={
		modoEdicionAutor: {edit:false, val:'', id: ''},
		modoEdicionLibro: {edit:false, val:''},
		ModoEdicionImagen: false,
		obtenerTipoReferencia: function(){
				 conexion.transaction(function(tx){
						tx.executeSql("select * from Tipo_Referencia",[],
					    function(tx, rs){
							if(rs.rows.length >0){
								var select = $("#tipoRefSelect");
								
								document.getElementById("tipoRefSelect").options.length = 1;

				        		for(var i = 0; i<rs.rows.length; i++){
				        			var item = rs.rows.item(i);
				        			
				        			select.append(
				        					$("<option/>").attr("value", item.id).append(item.tipo)
				        			);
				        		}
				        	
				        	}
						}, function(tx,err){
							console.log("Error al leer libros", tx, err)
						})
						
					});
			 },
	    obtenerEstadoReferencia: function(){
					
				 conexion.transaction(function(tx){
				
						tx.executeSql("select * from Estado_Referencia",[],
					    function(tx, rs){
							if(rs.rows.length >0){
								var select = $("#estadoRefSelect");
								
								document.getElementById("estadoRefSelect").options.length = 1;

				        		for(var i = 0; i<rs.rows.length; i++){
				        			var item = rs.rows.item(i);
				        			
				        			select.append(
				        							$("<option/>").attr("value", item.id).append(item.estado)
				        			);
				        		}
				        	}
						}, function(tx,err){
							console.log("Error al leer libros", tx, err)
						})
						
					});
			 },
			 guardarAutorBD: function(){
				 if(referencia.modoEdicionAutor.edit == false){
				 var autorID;
				 var nomAutor =  $("#nombreAutor").val();
				 
				 conexion.transaction(function(tx){
					 tx.executeSql('insert into Autor (autor) values(?) ',[nomAutor] , 
							 
						
								function(tx, rs){
							        autorID= rs.insertId;
							       //console.log(autorID);

							    	   tx.executeSql('insert into Referencia_Tiene_Autor (referencia_id, autor_id) values(?,?) ',[referencia.modoEdicionLibro.val.id, autorID] , 
														 
											
													function(tx, rs){
							    						//console.log("Transaccion completa!! ",tx);
							    					
											        	 
											         }, function(tx, err){
											        	 console.log("Error en la transaccion!!! ",tx,err);
										});
							      
						        	 
						         }, function(tx, err){
						        	 console.log("Error en la transaccion!!! ",tx,err);
						         });
					 });
				 }
			       
				 //console.log(referencia.modoEdicionLibro);
			 },
		agregarAutor: function(){
				 
				 var nombre = $("#nombreAutor").val();
				 
				 var lista =  $("#listadoRef");
				 
				 lista.append(
						 $("<li/>").append(
						 $("<a/>").append(nombre).attr("href","#").bind('vclick', function(){
							
							 $("#nombreAutor").val($(this).text());
							 referencia.modoEdicionAutor.val=$(this).text();
							 referencia.modoEdicionAutor.edit = true ;
						 })
				  ).append($("<a/>").attr("data-icon","delete").on("click", function(){
					  
					  
					  var itThisss =  $(this);
					    navigator.notification.confirm(
				                'Esta seguro que desea eliminar a esta referencia?',  // message
				                onConfirm,              // callback to invoke with index of button pressed
				                'Eliminacion de referencia',            // title
				                'No, Si'          // buttonLabels
				            );
						
					    
					    	function onConfirm(buttonIndex) {
					    	
					        if(buttonIndex == 2){
					        	itThisss.parent().remove();
					        }
					      }
							
				  }))
				  ) 
				
				 $("#listadoRef").listview("refresh");
				 
				 
			 },
		editarAutor: function(){
				 var nombre = $("#nombreAutor").val();
				
				 for(var i =0; i <$("#listadoRef").children().length; i++){
					 var valAut = $("#listadoRef").children().eq(i).find("a").eq(0);
					 
					 if(valAut.text() == referencia.modoEdicionAutor.val){
						 valAut.text(nombre);
					 }
				 }
				 
				 if(referencia.modoEdicionLibro.edit == true){
					 conexion.transaction(function(tx){ 
					 tx.executeSql('Update Autor set autor = ? where id = ? ',[nombre, referencia.modoEdicionAutor.id] , function(tx,rs){
						 //console.log("La referencia se edito correctamente");
					}, function(tx,err){
						
						console.log("La referencia no pudo editarse",tx,err);
					});
					 });
				 }
				 
				 referencia.modoEdicionAutor.edit = false;
				
			 },
		agregarAutorPar: function(autor){
			 
				 $("#nombreAutor").val("")
				 var lista =  $("#listadoRef");
				 
				 lista.append(
						 $("<li/>").data("autor", autor).append(
						 $("<a/>").append(autor.autor).attr("href","#").bind('vclick', function(){
							
							 $("#nombreAutor").val($(this).text());
							 referencia.modoEdicionAutor.val=$(this).text();
							 referencia.modoEdicionAutor.id = autor.id;
							 referencia.modoEdicionAutor.edit = true ;
							 
						 })
				  ).append(
						  $("<a/>").data("aut", autor).attr("data-icon","delete").on("click", function(){
							  
							  var itThiss =  $(this);
						        navigator.notification.confirm(
						                'Esta seguro que desea eliminar a este autor?',  // message
						                onConfirm,              // callback to invoke with index of button pressed
						                'Eliminacion de autor',            // title
						                'No, Si'          // buttonLabels
						            );
						        
						    function onConfirm(buttonIndex) {
						    	
						        if(buttonIndex == 2){
						        
						        	 referencia.eliminarAutor(autor.id);
						        	 itThiss.parent().remove();
						        }
						    }
					     
				  }))
				  ) 
				
				  $("#listadoRef").listview("refresh");
			
		
				 
			 },
		cargarLibro: function(libro){
			
			//console.log(libro);
				
				   $("#tipoRefSelect").val(libro.fk_tipo_referencia_id);
					$("#estadoRefSelect").val(libro.fk_estado_referencia_id);
					$("#nombreRef").val(libro.nombre);
				
					$("#nombreAutor").val("");
					$("#listadoRef").html("");
					if(libro.fk_estado_referencia_id== 5){
						$("#totalPaginas").val(libro.total_paginas);
						$("#ultimaLectura").val(libro.fecha_ultima_lectura);
						$("#paginaActual").val(libro.pagina_actual);
						$("#progresoLibroDiv").show();
						$("#prestamoLibDiv").hide();
						

						var progresoLib = parseFloat(((libro.pagina_actual*100)/libro.total_paginas).toFixed(2));
		                TolitoProgressBar('progressbar')
		                    .setOuterTheme('b')
		                    .setInnerTheme('e')
		                    .isMini(true)
		                    .setMax(100)
		                    .setStartFrom(progresoLib)
		                    .showCounter(true)
		                    .logOptions()
		                    .build()
		                    
					}
					else if(libro.fk_estado_referencia_id== 2){
						$("#fechaPrestamo").val(libro.fecha);
						$("#usuarioPrestamo").val(libro.usuario_prestamo);
						$("#prestamoLibDiv").show();
						$("#progresoLibroDiv").hide();
						
					}
					else{
						$("#progresoLibroDiv").hide();
					}
					
					if(libro.foto != null){
						$("#fotoRef").css("background-image","url("+libro.foto+")").data("imag", libro.foto);
						
					}else{
						$("#fotoRef").css("background-image","url(img/camera.png)");
						
					}
					
					
			
					
				 conexion.transaction(function(tx){ 
					
						tx.executeSql('Select * from  Referencia_Tiene_Autor rf inner join Autor aut on rf.autor_id = aut.id where rf.referencia_id = (?) ',[libro.id] , function(tx,rs){
							
							
							if(rs.rows.length>0){
							
							 for(var i =0; i < rs.rows.length; i++){
								 var it = rs.rows.item(i);
								
								 
								 tx.executeSql('Select * from  Autor a where a.id = (?) ',[it.autor_id] , function(tx,res){
									
									 
									
										referencia.agregarAutorPar(res.rows.item(0));
									 
										//$.mobile.changePage("#nuevaReferencia");
										$.mobile.changePage('#nuevaReferencia',{transition: 'none'});
									}, function(tx,err){
									
										console.log("Error en la consulta de carga de libro");
									});
							 }
							}
							else{
								//$.mobile.changePage("#nuevaReferencia");
								$.mobile.changePage('#nuevaReferencia',{transition: 'none'});
								
							}
							
							
						}, function(tx,err){
							
							console.log("Error en la consulta de carga de libro");
						});
						
						
						
				 });
				 
				 
			 },
		editarLibro: function(libro){
				 var referen =[
				                  $("#nombreRef").val(),
				                  $("#tipoRefSelect").val(),
				                  $("#estadoRefSelect").val(),
				                  libro.id
				                  ]
				
				 conexion.transaction(function(tx){ 
						
						tx.executeSql('Update Referencia set nombre = ?, fk_tipo_referencia_id=?, fk_estado_referencia_id = ? where id = ? ',referen , function(tx,rs){
							
							var estadoDelLibSelect = $("#estadoRefSelect").val();
							
							
							
						       // Inicio de agregacion de foto
	                         if($("#fotoRef").data("imag") != undefined){
	                        	 tx.executeSql('DELETE FROM Foto where fk_referencia_id= ?', [libro.id] , function(tx,rs){
										
	                        		   tx.executeSql('insert into Foto (foto, fk_referencia_id) values(?,?)', [$("#fotoRef").data("imag"),  libro.id], 
                                               
                                               function(tx, resAut){
                                  
                                                               $("#fotoRef").val("");
                                                               console.log("La imagen se guardo correctamente.");
                                                         
                                        }, function(tx, err){
                                                console.log("Error en la transaccion!!! ",tx,err);
                                        });
									}, function(tx,err){
										
										console.log("La referencia no pudo editarse",tx,err);
									});
	                             
	                          }
	                         //fin de agregacion de foto
							
							if(estadoDelLibSelect == 5){
							//	if($("#proximaLect").val() != ""){
								
								setTimeout(function(){
									
									alert("Usted programo para este momento leer el libro llamado: " + $("#nombreRef").val());
								},6000);
								function notify(){
									
								}
							//	}

								var refLectFK;
								
								tx.executeSql('select * from Referencia_Lectura where fk_referencia_id = ? ',[libro.id] , function(tx,resLect){
									refLectFK = resLect.rows.length;
									
									if(refLectFK == 0){
									
											
												 tx.executeSql('insert into Referencia_Lectura (pagina_actual, fecha_ultima_lectura, total_paginas, fk_referencia_id) values(?,?,?,?)', [$("#paginaActual").val(),$("#ultimaLectura").val(), $("#totalPaginas").val(),  libro.id] , function(tx,rs){
														
														//console.log("La referencia se edito correctamente");
													}, function(tx,err){
														
														console.log("La referencia no pudo editarse",tx,err);
													});
									}
									else{
										tx.executeSql('Update Referencia_Lectura set pagina_actual = ?, fecha_ultima_lectura=?, total_paginas = ? where fk_referencia_id = ? ',[$("#paginaActual").val(), $("#ultimaLectura").val(), $("#totalPaginas").val(), libro.id] , function(tx,rs){
											
											//console.log("La referencia se edito correctamente");
										}, function(tx,err){
											
											console.log("La referencia no pudo editarse",tx,err);
										});
										
									}
									
								}, function(tx,err){
									
								});
								
								
							
							}
							else if(estadoDelLibSelect == 2){
								//alert("entro");
								var refPresFK;
								
								tx.executeSql('select * from Referencia_Prestada where fk_referencia_id = ? ',[libro.id] , function(tx,resPres){
									refPresFK = resPres.rows.length;
									
					
									if(refPresFK == 0){
									
												 tx.executeSql('insert into Referencia_Prestada (usuario_prestamo, fecha, fk_referencia_id) values(?,?,?) ',[$("#usuarioPrestamo").val(), $("#fechaPrestamo").val(), libro.id] , function(tx,rs){
														
													//	console.log("La referencia se edito correctamente");
													}, function(tx,err){
														
													console.log("La referencia no pudo editarse",tx,err);
													});
									}
									else{
										tx.executeSql('Update Referencia_Prestada set fecha = ?, usuario_prestamo=? where fk_referencia_id = ? ',[ $("#fechaPrestamo").val(), $("#usuarioPrestamo").val(), libro.id] , function(tx,rs){
											
										//	console.log("La referencia se edito correctamente");
										}, function(tx,err){
											
											console.log("La referencia no pudo editarse",tx,err);
										});
										
									}
							   
									
								}, function(tx,err){
									
								});
							
							}
							else
							{
								
								
								
							
								
								var refLectFK;
								var refPresFK;
								
								tx.executeSql('select * from Referencia_Lectura where fk_referencia_id = ? ',[libro.id] , function(tx,resLect){
									refLectFK = resLect.rows.length;
									//alert("sdsds");
									if(refLectFK != 0){
									    
										tx.executeSql('DELETE FROM Referencia_Lectura where fk_referencia_id = ? ',[libro.id] , function(tx,rs){
											
										//	console.log("La referencia se edito correctamente");
										}, function(tx,err){
											
										//	console.log("La referencia no pudo editarse",tx,err);
										});
									}
									
									
								}, function(tx,err){
									
								});
								
								
								tx.executeSql('select * from Referencia_Prestada where fk_referencia_id = ? ',[libro.id] , function(tx,resPrest){
									refPresFK = resPrest.rows.length;
									
									if(refPresFK != 0){
									
										tx.executeSql('DELETE FROM Referencia_Prestada where fk_referencia_id = ? ',[libro.id] , function(tx,rs){
											
										//	console.log("La referencia se edito correctamente");
										}, function(tx,err){
											
										//	console.log("La referencia no pudo editarse",tx,err);
										});
									}
									
									
								}, function(tx,err){
									
								});
								
							
							}
							
							
							//console.log("La referencia se edito correctamente");
						}, function(tx,err){
							
							//console.log("La referencia no pudo editarse",tx,err);
						});
						
					
						
				 });
				referencia.verTodasLasReferencias();
				$.mobile.changePage('#listadoReferencia',{transition: 'none'});
				 //$.mobile.changePage("#listadoReferencia");
			 },
		verTodasLasReferencias: function(){
			
				 conexion.transaction(function(tx){ 
						tx.executeSql('Select * from  Referencia rf left join Foto fot on rf.id = fot.fk_referencia_id left join Referencia_Lectura rfLe on rfLe.fk_referencia_id = rf.id left join Referencia_Prestada refPrest on refPrest.fk_referencia_id = rf.id',[] , 
								 
								function(tx, rs){
						        var list = $("#referenciasList");
						        list.html("");
									for(var i = 0; i< rs.rows.length; i++)
										{
										//console.log(rs.rows.item(i));
										list.append(
												$("<li/>").append(
														$("<a/>").data("libro", rs.rows.item(i)).append(
																
																
																((rs.rows.item(i).foto == null) ? $("<div/>").addClass("logoLista").css("background-image","url(img/camera.png)") : $("<div/>").addClass("logoLista").css("background-image","url("+rs.rows.item(i).foto+")")) 				
									
														).append(
																$("<div/>").addClass("textoLista").append(	((rs.rows.item(i).fk_estado_referencia_id == 5) ? $("<span/>").addClass("ui-li-count")
																			.append(($("<div/>").attr("data-role","content").attr("data-theme", "c")
																				.text("Progreso: "+((rs.rows.item(i).pagina_actual*100)/rs.rows.item(i).total_paginas).toFixed(2)+"%"))) : '')							
														).append(
																$("<h3/>").append(rs.rows.item(i).nombre)
														).bind("vclick", function(){
															var lib = $(this).parent().data("libro");
															//console.log(lib);
					        								referencia.cargarLibro(lib);
					        								referencia.modoEdicionLibro.edit = true;
					        								referencia.modoEdicionLibro.val = lib;
														})	)
												).append(
														$("<a/>").data("libro", rs.rows.item(i)).attr("href","#").bind("vclick", function(){
															
															var itThis =  $(this);
														    navigator.notification.confirm(
													                'Esta seguro que desea eliminar a esta referencia?',  // message
													                onConfirm,              // callback to invoke with index of button pressed
													                'Eliminacion de referencia',            // title
													                'No, Si'          // buttonLabels
													            );
															
														    
														    	function onConfirm(buttonIndex) {
														    	
														        if(buttonIndex == 2){
														        	var id = itThis.data("libro").id;
							        								referencia.eliminarLibro(id);
							        								itThis.parent().fadeOut();
														    
														        }
														      }
																
														
														})
												)
												
											
										)

										}
									list.listview("refresh");
						         }, function(tx, err){
						        	 //console.log("Error en la transaccion!!! ",tx,err);
						         });
						
						
					 
				 });
				  TolitoProgressBar('progressbar')
                  .setOuterTheme('b')
                  .setInnerTheme('e')
                  .isMini(true)
                  .setMax(100)
                  .setStartFrom(10)
                  .showCounter(true)
                  .logOptions()
                  .build()
				
			 },
		eliminarAutor: function(id){
			  
				    
		    
			
		    
		    conexion.transaction(function(tx){
				tx.executeSql("DELETE FROM Autor where id = ?", [id], function(tx){
					//console.log("Transaccion completa!!! ",tx);
				},
				
				function(tx, err){
					//console.log("Error en la transaccion!!! ",tx,err);
				})
			});
				
		},
		eliminarLibro: function(id){
			
			
		    	
		    	conexion.transaction(function(tx){
					tx.executeSql("DELETE FROM Referencia where id = ?", [id], function(tx){
						//console.log("Transaccion completa!!! ",tx);
					},
					
					function(tx, err){
						//console.log("Error en la transaccion!!! ",tx,err);
					})
					
				});
				},
		agregarLibro: function(){
				 var referen =[
				                  $("#nombreRef").val(),
				                  $("#tipoRefSelect").val(),
				                  $("#estadoRefSelect").val()
				                  ]
				 
				
				 var refIDBD;
					conexion.transaction(function(tx){
					 tx.executeSql('insert into Referencia (nombre, fk_tipo_referencia_id, fk_estado_referencia_id) values(?,?,?)', referen, 
								 
						function(tx, resRef){
						 refIDBD= resRef.insertId;
						 
						 if($("#listadoRef").children().length == 0)
							 {
							   referencia.verTodasLasReferencias();
							//   $.mobile.changePage("#listadoReferencia");
								$.mobile.changePage('#listadoReferencia',{transition: 'none'});
							 
							 }

	 						////// Agregar Lectura////
						 
						 
			               // Inicio de agregacion de foto
						 
                         if($("#fotoRef").data("imag") != undefined){
                                tx.executeSql('insert into Foto (foto, fk_referencia_id) values(?,?)', [$("#fotoRef").data("imag"), refIDBD], 
                                                         
                                                       function(tx, resAut){
                                          
                                                                       $("#fotoRef").val("");
                                                                       console.log("La imagen se guardo correctamente.");
                                                                 
                                                }, function(tx, err){
                                                        console.log("Error en la transaccion!!! ",tx,err);
                                                });
                                  }
                         
                         //fin de agregacion de foto
						 
							if($("#estadoRefSelect").val() == 5){
			 					
		 						 tx.executeSql('insert into Referencia_Lectura (pagina_actual, fecha_ultima_lectura, total_paginas, fk_referencia_id) values(?,?,?,?)', [$("#paginaActual").val(),$("#ultimaLectura").val(), $("#totalPaginas").val(), refIDBD], 
											
											function(tx, resAut){
		 							
		 					
		 							
		 							 //AGREGANDO AUTORES
		 							 if($("#listadoRef").children().length == 0)
									 {
		 								referencia.verTodasLasReferencias();
				 						//$.mobile.changePage("#listadoReferencia");
				 						$.mobile.changePage('#listadoReferencia',{transition: 'none'});
				 						$("#tipoRefSelect").val("");
				 						$("#estadoRefSelect").val("");
				 						$("#nombreRef").val("");
				 						$("#nombreAutor").val("");
				 						$("#listadoRef").html("");
									 
									 }
		 							
									 for(var i =0; i <$("#listadoRef").children().length; i++){
										 var valAut = $("#listadoRef").children().eq(i).find("a").eq(0).text();
											
											 tx.executeSql('insert into Autor (autor) values(?)', [valAut], 
														
														function(tx, resAut){
												 
												 
												           //console.log(refIDBD +'   '+resAut.insertId);
												 					tx.executeSql('insert into Referencia_Tiene_Autor (referencia_id, autor_id) values(?,?) ',[refIDBD, resAut.insertId] , 
																 
																	function(tx, rs){
												 						 //console.log("Transaccion completa!! ",tx);
													 						referencia.verTodasLasReferencias();
													 						//$.mobile.changePage("#listadoReferencia");
													 						$.mobile.changePage('#listadoReferencia',{transition: 'none'});
													 						$("#tipoRefSelect").val("");
													 						$("#estadoRefSelect").val("");
													 						$("#nombreRef").val("");
													 						$("#nombreAutor").val("");
													 						$("#listadoRef").html("");
															         }, function(tx, err){
															        	 console.log("Error en la transaccion!!! ",tx,err);
															         });
												 					
												         }, function(tx, err){
												        	 console.log("Error en la transaccion!!! ",tx,err);
												         });
											
										}
									 
						//FINALIZACION DE AGRE AUTORES
									         }, function(tx, err){
									        	 console.log("Error en la transaccion!!! ",tx,err);
									         });
							
		 						}
							else if($("#estadoRefSelect").val() == 2){
	 								tx.executeSql('insert into Referencia_Prestada (usuario_prestamo, fecha, fk_referencia_id) values(?,?,?) ',[$("#usuarioPrestamo").val(), $("#fechaPrestamo").val(), refIDBD] , 
											 
											function(tx, rs){
	 									
	 									//AGREGANDO AUTORES
			 							 if($("#listadoRef").children().length == 0)
										 {
			 								referencia.verTodasLasReferencias();
					 					//	$.mobile.changePage("#listadoReferencia");
					 						$.mobile.changePage('#listadoReferencia',{transition: 'none'});
					 						$("#tipoRefSelect").val("");
					 						$("#estadoRefSelect").val("");
					 						$("#nombreRef").val("");
					 						$("#nombreAutor").val("");
					 						$("#listadoRef").html("");
										 
										 }
			 							
										 for(var i =0; i <$("#listadoRef").children().length; i++){
											 var valAut = $("#listadoRef").children().eq(i).find("a").eq(0).text();
												
												 tx.executeSql('insert into Autor (autor) values(?)', [valAut], 
															
															function(tx, resAut){
													 
													 
													           //console.log(refIDBD +'   '+resAut.insertId);
													 					tx.executeSql('insert into Referencia_Tiene_Autor (referencia_id, autor_id) values(?,?) ',[refIDBD, resAut.insertId] , 
																	 
																		function(tx, rs){
													 						 //console.log("Transaccion completa!! ",tx);
														 						referencia.verTodasLasReferencias();
														 						$.mobile.changePage('#listadoReferencia',{transition: 'none'});
														 					
														 						$("#tipoRefSelect").val("");
														 						$("#estadoRefSelect").val("");
														 						$("#nombreRef").val("");
														 						$("#nombreAutor").val("");
														 						$("#listadoRef").html("");
																         }, function(tx, err){
																        	 console.log("Error en la transaccion!!! ",tx,err);
																         });
													 					
													         }, function(tx, err){
													        	 console.log("Error en la transaccion!!! ",tx,err);
													         });
												
											}
										 
							//FINALIZACION DE AGRE AUTORES
						 				
									         }, function(tx, err){
									        	 console.log("Error en la transaccion!!! ",tx,err);
									         });
	 								
	 							}
	 							 /// FIN DE AGREGAR PRESTAMO ///
		 						else{
		 							
		 							 //AGREGANDO AUTORES
		 							 if($("#listadoRef").children().length == 0)
									 {
		 								referencia.verTodasLasReferencias();
				 					//	$.mobile.changePage("#listadoReferencia");
				 						$.mobile.changePage('#listadoReferencia',{transition: 'none'});
				 						$("#tipoRefSelect").val("");
				 						$("#estadoRefSelect").val("");
				 						$("#nombreRef").val("");
				 						$("#nombreAutor").val("");
				 						$("#listadoRef").html("");
									 
									 }
		 							 
		 				             
                      
		 							
									 for(var i =0; i <$("#listadoRef").children().length; i++){
										 var valAut = $("#listadoRef").children().eq(i).find("a").eq(0).text();
											
											 tx.executeSql('insert into Autor (autor) values(?)', [valAut], 
														
														function(tx, resAut){
												           //console.log(refIDBD +'   '+resAut.insertId);
												 					tx.executeSql('insert into Referencia_Tiene_Autor (referencia_id, autor_id) values(?,?) ',[refIDBD, resAut.insertId] , 
																 
																	function(tx, rs){
												 						 //console.log("Transaccion completa!! ",tx);
													 						referencia.verTodasLasReferencias();
													 					
													 						$.mobile.changePage('#listadoReferencia',{transition: 'none'});
													 						$("#tipoRefSelect").val("");
													 						$("#estadoRefSelect").val("");
													 						$("#nombreRef").val("");
													 						$("#nombreAutor").val("");
													 						$("#listadoRef").html("");
															         }, function(tx, err){
															        	 console.log("Error en la transaccion!!! ",tx,err);
															         });
												 					
												         }, function(tx, err){
												        	 console.log("Error en la transaccion!!! ",tx,err);
												         });
											
										}
									 
						//FINALIZACION DE AGRE AUTORES
		 							
		 						}
		 						///Fin de agregacion de lectura
						 
					
						 
				        	 
				         }, function(tx, err){
				        	 console.log("Error en la transaccion!!! ",tx,err);
				         });
						
					});	
			 }
			
			 
	 }
	
	
	

	
	

	



