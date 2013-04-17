       
           var conexion = $.mobile.MyBooks ={
				conn : null,
				openDatabase : function(){
					conexion.conn = window.openDatabase("MyBooks", "1.0","Biblioteca Personal", 200000);
					
				},
				crearDB : function(){
					conexion.transaction(function(tx){
						//tx.executeSql('DROP TABLE IF EXISTS Notas'); 
						 tx.executeSql('CREATE TABLE IF NOT EXISTS Tipo_Referencia (id INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT  UNIQUE, tipo INTEGER NOT NULL)');
				         tx.executeSql('CREATE TABLE IF NOT EXISTS Autor (id INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT  UNIQUE, autor TEXT NOT NULL)');
				         tx.executeSql('CREATE TABLE IF NOT EXISTS Estado_Referencia (id INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT  UNIQUE, estado TEXT NOT NULL)');
				      	 tx.executeSql('CREATE TABLE IF NOT EXISTS Referencia (id INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT  UNIQUE, nombre TEXT NOT NULL, fk_tipo_referencia_id INTEGER NOT NULL REFERENCES Tipo_Referencia (id)  ON DELETE CASCADE ON UPDATE CASCADE, fk_estado_referencia_id INTEGER NOT NULL REFERENCES Estado_Referencia (id)  ON DELETE CASCADE ON UPDATE CASCADE)');		            
				         tx.executeSql('CREATE TABLE IF NOT EXISTS Foto (id INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT  UNIQUE, foto TEXT NOT NULL, fk_referencia_id INTEGER NOT NULL REFERENCES Referencia (id)  ON DELETE CASCADE ON UPDATE CASCADE)');
				         tx.executeSql('CREATE TABLE IF NOT EXISTS Referencia_Lectura (id INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT  UNIQUE, pagina_actual INTEGER NOT NULL, fecha_ultima_lectura TEXT NOT NULL, total_paginas INTEGER NOT NULL, fk_referencia_id INTEGER NOT NULL REFERENCES Referencia (id)  ON DELETE CASCADE ON UPDATE CASCADE)');
				         tx.executeSql('CREATE TABLE IF NOT EXISTS Referencia_Prestada (id INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT  UNIQUE, usuario_prestamo TEXT NOT NULL, fecha TEXT NOT NULL, fk_referencia_id INTEGER NOT NULL REFERENCES Referencia (id)  ON DELETE CASCADE ON UPDATE CASCADE)');  
				         tx.executeSql('CREATE TABLE IF NOT EXISTS Plan_Lectura (id INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT  UNIQUE, fecha_leer TEXT NOT NULL, hora_aviso TEXT NOT NULL, fk_referencia_id INTEGER NOT NULL REFERENCES Referencia (id)  ON DELETE CASCADE ON UPDATE CASCADE)');
				         tx.executeSql('CREATE TABLE IF NOT EXISTS Referencia_Tiene_Autor(referencia_id INTEGER NOT NULL  REFERENCES Autor (id)  ON DELETE CASCADE ON UPDATE CASCADE, autor_id INTEGER NOT NULL  REFERENCES Referencia (id)  ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY (referencia_id,autor_id))');
				         
						});	
				},
				ejecutarBackUp: function(){
					conexion.transaction(function(tx){
						
				       tx.executeSql('insert into Tipo_Referencia (id, tipo) values(1,"Libro")');
				       tx.executeSql('insert into Tipo_Referencia (id, tipo) values(2, "Revista")');
				       tx.executeSql('insert into Estado_Referencia (id, estado) values(1, "Vendido")');
				       tx.executeSql('insert into Estado_Referencia (id, estado) values(2, "Prestado")');
				       tx.executeSql('insert into Estado_Referencia (id, estado) values(3, "Guardado")');
				       tx.executeSql('insert into Estado_Referencia (id, estado) values(4, "Para Comprar")');
				       tx.executeSql('insert into Estado_Referencia (id, estado) values(5, "En Lectura")');
				       tx.executeSql('insert into Estado_Referencia (id, estado) values(6, "Leido")');
				       
				    });	
				},
				eliminarTablas: function(){
					conexion.transaction(function(tx){
						tx.executeSql('DROP TABLE IF EXISTS Tipo_Referencia'); 
						tx.executeSql('DROP TABLE IF EXISTS Autor'); 
						tx.executeSql('DROP TABLE IF EXISTS Estado_Referencia'); 
						tx.executeSql('DROP TABLE IF EXISTS Referencia'); 
						tx.executeSql('DROP TABLE IF EXISTS Foto'); 
						tx.executeSql('DROP TABLE IF EXISTS Referencia_Lectura'); 
						tx.executeSql('DROP TABLE IF EXISTS Referencia_Prestada'); 
						tx.executeSql('DROP TABLE IF EXISTS Plan_Lectura'); 
						tx.executeSql('DROP TABLE IF EXISTS Referencia_Tiene_Autor'); 
						
					});	
				},
				transaction : function(fn, err, suc){
					if(conexion.conn == null){
						conexion.openDatabase();
					}
					conexion.conn.transaction(fn, err, suc);
				}
				
				
			}
           
           ///////////Zona de Prueba////////////
           
           //conexion.eliminarTablas();
           //conexion.crearDB();
           //conexion.ejecutarBackUp();
           
           ///////////Zona de prueba////////////
           

