Technotip.DibujoOculto = function(game){
  // aquí van las variables globales de la clase
    var idActividad;
    var tipoActividad;
    var idActividad;
    //-------variables template------
    var navegacion_grupo;
    var datosSeccionAnterior; 
    //-----template audios-----
    var correctFx;
    var wrongFx;
    var tadaFx;
    var wahwahFx;
    //------- variable slide---
    var arrayGrupos;// aqui van los grupos que se desplazan
    var navIzq;
    var navDer;
    var idHojaActual;
    var posCentral;
    var posDerecha;
    var posIzquierda;
    //---------------------
    //---hangaman
    var diccionario;
    var panel;
    var campoPalabra;
    var palabraSecreta;
    var mascaraPalabra;
    var chances;
    var personaje;
    var frames;
    //------------------------------
    
  
   let contadorErrores;
   let textoErrores;
   let robot;

   let correctoFx;
   let correcto2Fx;
   let errorFx;
   let error2Fx;

    var cancelaUpdate;
  let teclas;

  let arregloLetrasEnMascara;

};

Technotip.DibujoOculto.prototype= {
    // aquí se agregan los metodos
    init:function(datosLink=null){ 
        this.datosSeccionAnterior=datosLink; 
        contadorErrores = 8;
        this.teclas = [];
        this.arregloLetrasEnMascara=[]
    },
    
    preload:function(){  
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;  

        
        game.load.audio('correcto2', 'audio/imagenes_palabras/lo_lograste.mp3');        
        game.load.audio('error2', 'audio/imagenes_palabras/no_te_desanimes.mp3');

        //game.load.audio('wrong', 'assets/audios/wrong.mp3');
        //game.load.audio('tada', 'assets/audios/tada.mp3');
        //game.load.audio('wahwah', 'assets/audios/allFail.mp3');
       
    
    //  Here we load the Starling Texture Atlas and XML file
    //game.load.atlasJSONHash('images',rutaAssets+this.idActividad+'.png',rutaAssets+this.idActividad+'.json');
        game.load.image('fondo','img/imagenes_palabras/claseDigital_13-4.png');        
        
        

        //game.load.image('medalla','img/imagenes_palabras/medalla.png');
        //game.load.image('muybien','img/imagenes_palabras/Captura.png');
        //game.load.image('notedesanimes','img/imagenes_palabras/notedesanimes.png');
        //game.load.image('pajaro','img/imagenes_palabras/SMARTIC2-OA-0201-499.png');
        //game.load.image('repetir','img/imagenes_palabras/juegadenuevo.png');

        game.load.image('felicidades','img/imagenes_palabras/felicidades.png');
        game.load.image('intentalo','img/imagenes_palabras/intentalo.png');


        game.load.image('imgCorrecta','img/imagenes_palabras/respuestacorrecta.png')
        game.load.image('imgIncorrecta','img/imagenes_palabras/respuestaincorrecta.png')
        //-----botones navegacion----------
         //this.load.image('regresar','assets/images/principal/regresar.png');
         //this.load.image('inicio','assets/images/principal/inicio.png');
         //this.load.image('reiniciar','assets/images/principal/reiniciar.png'); 
         //imagenes de la retroalimentacion
        game.load.bitmapFont('rifficW','img/imagenes_palabras/riffic.png','img/imagenes_palabras/riffic.fnt');
        //game.load.atlasJSONHash('retro','assets/images/retro/retro.png','assets/images/retro/retro.json');
       
        game.load.atlasXML('personaje','img/imagenes_palabras/Ahorcado.png','img/imagenes_palabras/Ahorcado.xml');
   
    },
   create:function(){

        //  fondo = game.add.sprite(0,0,'fondo'); 
        //this.generaFondo(fondo);
        /*------Colocar  Audios para juego de las imagenes y las palabras----------------*/
        
        this.correcto2Fx = this.add.audio('correcto2',1,false);
        
        this.error2Fx = this.add.audio('error2',1,false);

        //this.wrongFx = this.add.audio('wrong',1,false);
        //this.tadaFx = this.add.audio('tada',1,false);
        //this.wahwahFx= this.add.audio('wahwah',1,false);
        //----------cierra Template audios-------------
        fondo = game.add.sprite(0,0,'fondo');       
        this.generaFondo(fondo);
        
        this.instrucciones= game.add.text(230,15,'Prueba con diferentes letras para formar y, !Observa el muñequito¡. \nRepasa  las palabras de tu libro y te será más fácil formarlas',
        {font:'17pt Arial Black',fill: '#ff0000'});
        
        this.diccionario=['presentación','audiencia','diapositiva','audio','texto','transición','animación','multimedia','secuencia','imágenes'];
        
        this.textoPalabra =game.add.text(180,500, 'Te quedan', {font:'35pt',fill: '#000000'})

        this.panel=game.add.sprite(0,280,'panel'); 
        this.panel.anchor.setTo(0.5,0.5);
        this.panel.x=900;
        this.panel.alpha=0;
        
        this.textoErrores =game.add.text(420,490, ''+ contadorErrores, {font:'45pt',fill: '#ff0000'})
        this.textoPalabraSiguiente =game.add.text(480,500, 'oportunidades', {font:'35pt',fill: '#000000'})

        //robot = game.add.image(900,300, 'robCompleto')
        this.personaje=game.add.sprite(1000,100,'personaje');
        this.personaje.scale.setTo(1);
        console.log(this.personaje)

        this.lanzaPanelPalabra(this.seleccionPalabra());



     
    },  
    /*Metodo update*/
    update:function(){ 
            
           
         
    

        
    },

   
     render:function(){
          //console.log("cancela update: "+this.cancelaUpdate);
        //if(!this.cancelaUpdate){
           
           //if(this.a1.imagenColocada){
               //this.cancelaUpdate=true;
               //console.log("hola")
               //this.lanzaEstrella();
                 
            //}
        //}
        
    },
  

   //-------------METODOS TEMPLATE------------------
    //-------------Funcion para el juego de ponerle nombre a la imagen----------------------
    seleccionPalabra:function(){
        this.diccionario=this.shuffle(this.diccionario);
        return this.diccionario[0];
    },
    
    lanzaPanelPalabra:function(palabra){
        
        this.chances=8;
        this.frames=0;
        delay=100;
        var miTween =game.add.tween(this.panel).to({y:300},1000,Phaser.Easing.Bounce.Out,true,delay);
        miTween.onComplete.add(this.seteaPalabra, this);
        this.palabraSecreta=palabra;
    },
    
    seteaPalabra:function(){
        this.mascaraPalabra='';



        if(this.palabraSecreta.length > 5){
            for(i=0; i<4 ; i++){
              let numRandom = this.numeroAleatorio(0, this.palabraSecreta.length)              
              let valor = this.arregloLetrasEnMascara.indexOf(numRandom)
              if(valor == -1){
                this.arregloLetrasEnMascara.push(numRandom)  
              }
              else{
                let numRandom = this.numeroAleatorio(0, this.palabraSecreta.length)
                let valor = this.arregloLetrasEnMascara.indexOf(numRandom)
                if(valor == -1){
                  this.arregloLetrasEnMascara.push(numRandom)  
                }
                else{
                  let numRandom = this.numeroAleatorio(0, this.palabraSecreta.length)
                  let valor = this.arregloLetrasEnMascara.indexOf(numRandom)
                  if(valor == -1){
                   this.arregloLetrasEnMascara.push(numRandom)  
                  }
                  else{
                    let numRandom = this.numeroAleatorio(0, this.palabraSecreta.length)
                    let valor = this.arregloLetrasEnMascara.indexOf(numRandom)
                    if(valor == -1){
                      this.arregloLetrasEnMascara.push(numRandom)  
                    }
                    else{
                      let numRandom = this.numeroAleatorio(0, this.palabraSecreta.length)
                      
                      this.arregloLetrasEnMascara.push(numRandom)
                    }
                  }
                }
              }                            
            }
        }
        else{
           for(i=0; i<2 ; i++){
              let numRandom = this.numeroAleatorio(0, this.palabraSecreta.length)              
              let valor = this.arregloLetrasEnMascara.indexOf(numRandom)
              if(valor == -1){
                this.arregloLetrasEnMascara.push(numRandom)  
              }
              else{
                let numRandom = this.numeroAleatorio(0, this.palabraSecreta.length)
                let valor = this.arregloLetrasEnMascara.indexOf(numRandom)
                if(valor == -1){
                  this.arregloLetrasEnMascara.push(numRandom)  
                }
                else{
                  let numRandom = this.numeroAleatorio(0, this.palabraSecreta.length)
                  let valor = this.arregloLetrasEnMascara.indexOf(numRandom)
                  if(valor == -1){
                   this.arregloLetrasEnMascara.push(numRandom)  
                  }
                  else{
                    let numRandom = this.numeroAleatorio(0, this.palabraSecreta.length)
                    let valor = this.arregloLetrasEnMascara.indexOf(numRandom)
                    if(valor == -1){
                      this.arregloLetrasEnMascara.push(numRandom)  
                    }
                    else{
                      let numRandom = this.numeroAleatorio(0, this.palabraSecreta.length)
                      
                      this.arregloLetrasEnMascara.push(numRandom)
                    }
                  }
                }
              }                            
            }
        }
        //console.log(this.palabraSecreta)
        for(var a=0; a<this.palabraSecreta.length; a++){
            //console.log(a)
            //console.log(this.palabraSecreta.charAt(a))
            let valor = this.arregloLetrasEnMascara.indexOf(a)
            if(valor == -1){
              this.mascaraPalabra+='-';  
            }
            else{
             this.mascaraPalabra+= this.palabraSecreta.charAt(a);   
            }
            //console.log(this.mascaraPalabra)
        }
        
         this.campoPalabra= game.add.text(850,250,this.mascaraPalabra,{font:'80pt Arial Black',fill: '#000000'});
         this.campoPalabra.anchor.setTo(0.5)
        this.campoPalabra.x-=this.campoPalabra.width*0.5;
        this.activaListenersTeclas();
    },
    
    activaListenersTeclas:function(){
        game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
    },
    desactivaListenersTeclas:function(){
         game.input.keyboard.removeCallbacks(this, null, null, this.keyPress);
    },
    
    keyPress:function(char){
        
        let valor = this.teclas.indexOf(char)
        console.log(valor)
        

        if(valor == -1){
          this.teclas.push(char)
          console.log(this.teclas)
          var foundCharacter=false;
          for(var a=0; a<this.palabraSecreta.length; a++){
              var letra =this.palabraSecreta.charAt(a);
              if(letra===char.toLocaleLowerCase()){
                 this.mascaraPalabra=this.setCharAt(this.mascaraPalabra,a,char.toLocaleLowerCase());
                 this.campoPalabra.text = this.mascaraPalabra;

                  foundCharacter=true;
                 }
          }
          
          if(foundCharacter){
              if(this.mascaraPalabra.indexOf(char)==-1){
                // this.correctFx.play();// si ya encontraste la letra anterioremtente ya no debe sonar la tecla
                 }
                 //this.correctoFx.play();   
                  /*let icono;
                  
                  icono = game.add.sprite(0,0,'imgCorrecta');
                  icono.x= 500;
                  icono.y =400;
                  var tween = game.add.tween(icono).to( {alpha:0, y:120 },1000, "Linear", true);
                  tween.onComplete.add(borraIcono, this);
                  function borraIcono(){
                      icono.destroy();

                  } */

             }
          else{
                            
                //this.errorFx.play()
                
                /*let icono;
                  
                  icono = game.add.sprite(0,0,'imgIncorrecta');
                  icono.x= 500;
                  icono.y =400;
                  var tween = game.add.tween(icono).to( {alpha:0, y:120 },1000, "Linear", true);
                  tween.onComplete.add(borraIcono, this);
                  function borraIcono(){
                      icono.destroy();

                  }        */
                 //this.wrongFx.play();
                 contadorErrores = contadorErrores - 1
                 //robot.kill()
                 //robot = game.add.image(900,300, contadorErrores)
                 this.textoErrores.text = contadorErrores

                this.chances--;
                this.frames++;
                console.log(this.chances);
              // console.log('Victima instancia 1000'+this.frames);
                this.personaje.frameName ='Victima instancia 1000'+this.frames;

                 
             }
            if(contadorErrores ==0){
              this.notedesanimes();
                this.desactivaListenersTeclas();
            }
              if(this.campoPalabra.text==this.palabraSecreta){
                this.lanzaEstrella();
                this.desactivaListenersTeclas();
             }
         
        }



    },
    
    
    setCharAt:function (str,index,chr) {
        //---este medodo remplaza un caracter en un indice dado dentro de un string y devuelve  un string con el caracter nuevo en el lugar correcto
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
    },
    
    quitaPalabra:function(){
        this.desactivaListenersTeclas();
     this.notedesanimes()
    },
    
    //-----------------cierra metodos ahorcado---------
    
    //---------- metodos  mmi slide--------
    seteaVariablesSlide:function(){
       this.posCentral=0;
        var anchoPantalla=game.width;
        this.posDerecha=anchoPantalla+200;
        this.posIzquierda=-(anchoPantalla+200);
        this.idHojaActual=0;
        this.arrastresTotales=0;
        this.puntos=0;  
    },
    generaflechasDesplazamiento:function(){
        this.navIzq;//=game.add.sprite(0,0,'images','atras'); // importa las imagens de las flechas
        this.navDer;//=game.add.sprite(0,0,'images','adelante');
        this.navIzq.scale.setTo(0.6,0.6);
        this.navDer.scale.setTo(0.6,0.6);
        this.navIzq.y=(game.height-this.navIzq.height )* 0.5;
        this.navDer.y=(game.height-this.navDer.height )* 0.5;
        this.navDer.x=(game.width-this.navDer.width)-20;
        this.navIzq.x=20; 
        
        this.navIzq.inputEnabled = true;
        this.navIzq.input.useHandCursor = true;
        this.navIzq.events.onInputDown.add(this.navegaPaginas, this);
        this.navDer.inputEnabled = true;
        this.navDer.input.useHandCursor = true;
        this.navDer.events.onInputDown.add(this.navegaPaginas, this);
    },
    
     seteaPaginas:function(arrayPaginas){
       
        for(var a=0; a<arrayPaginas.lenght; a++){
            //console.log(arrayPaginas[a]);//arrayPaginas[a].x=this.posDerecha;
          // arrayPaginas[a].x=8000;
            var hojaActual=arrayPaginas[a];
            hojaActual.x=this.posDerecha;
            //console.log(hojaActual);
            //game.add.tween(hojaActual).to( {x:this.posDerecha}, 1000, Phaser.Easing.Quadratic.InOut, true);
        }
        
        //arrayPaginas[0].x=0;
    },
    
    muestraPantalla:function(hojaActual,hojaProxima,cual){
        
        //hoja.alpha=1;
        //add.tween(ball).to({angle: 180}, 3000, Phaser.Easing.Quadratic.InOut, true);
        var direccion;
        switch(cual){
            case "previa":
                direccion=this.posDerecha;
                break;
            case "siguiente":
                direccion=this.posIzquierda;
                break;
               }
        //console.log(hojaActual);
        game.add.tween(hojaActual).to( {x:direccion}, 1000, Phaser.Easing.Quadratic.InOut, true);
        game.add.tween(hojaProxima).to( {x: this.posCentral}, 1000, Phaser.Easing.Quadratic.InOut, true);
        
    
    },
    navegaPaginas:function(sprite){
      // console.log(this.arrayHojas.length);
      // console.log(this.idHojaActual);
       var paginaInmedita;    
        switch(sprite.frameName){
            case "atras":
                //console.log(sprite.frameName);
                paginaInmedita=this.idHojaActual-1;
                if(paginaInmedita>=0){
                     //console.log(sprite.frameName);
                   this.muestraPantalla(this.arrayHojas[this.idHojaActual],this.arrayHojas[this.idHojaActual-1],'previa');
                    this.idHojaActual--;
                     this.navDer.alpha=1;
                   }else{
                       sprite.alpha=0.3;
                   }
                break;
            case "adelante":
                paginaInmedita=this.idHojaActual+1;
                if(paginaInmedita<this.arrayHojas.length){
                     //console.log(sprite.frameName);
                    this.muestraPantalla(this.arrayHojas[this.idHojaActual],this.arrayHojas[this.idHojaActual+1],'siguiente');
                    this.idHojaActual++;
                    this.navIzq.alpha=1;
                   }else{
                        sprite.alpha=0.3;
                   }
                break;
               }
               
    },
    
    //----------fin metodos mi slide
    
    organizaObjetosArrastrables:function(elementos){
        var contadorX=0;
        var contadorY=0;
        var arrayPos=[];
        for(var a=0; a<elementos; a++){
            posx=((120 +20) *contadorX)-100;
            posy=((70 ) *contadorY)-(game.height * 0.28);
           //array[a].x=posx;
           //array[a].y=posy;
          arrayPos.push([posx,posy]);
            if(contadorY+1<2){
               contadorY++;
               }else{
                 contadorX++;
                 contadorY=0; 
               }
           
        }
        return arrayPos;
    },
    shuffle:function(array){
  
        var clone=[];
        for(var a=0; a<array.length; a++){
           clone[a]=array[a];
            
        }
      
        // fisher yates algoritmo------
        //se clona el array porue este metodo modifica al array original
        var m = clone.length, t, i;

          // While there remain elements to shuffle…
          while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = clone[m];
            clone[m] = clone[i];
            clone[i] = t;
          }

          return clone;
        
     
    },
     notedesanimes:function(){
    
    
    
    
            var delay = 900;
            this.muybien = game.add.sprite(game.width * 0.5, game.height*0.5,'intentalo');
            this.ajustaImagen(this.muybien)
            this.muybien.scale.setTo(0, 0);
            this.muybien.x=game.width *0.5;
            this.muybien.y=game.height*0.5;
            
            game.add.tween(this.muybien,Phaser.Easing.Bounce.Out,true, delay)
            
            /*repetir = game.add.sprite(1100,400, 'repetir');
            this.ajustaImagen3(repetir);
            repetir.inputEnabled = true;
            repetir.input.useHandCursor = true;
            repetir.events.onInputOver.add(over, this);
            repetir.events.onInputOut.add(out, this);
            repetir.events.onInputDown.add(this.onClickRepetir,this);
            
            function over(imagen){
           imagen.scale.setTo(1.20,1.20);
            
            //console.log(imagen.frameName+' | valor: '+imagen.valor);
            this.estoySobre=imagen;
            }
            function out(imagen){
             //console.log(imagen.frameName);
               imagen.scale.setTo(1,1);
           // this.estoySobre=null;
            }*/
            
           
           var miTween=game.add.tween(this.muybien.scale).to({x:1.3,y:1.3},500,Phaser.Easing.Bounce.Out,true,delay);
          //miTween.onStart.add(this.onStart2, this);
          setTimeout(this.onClickRepetir, 5000)
          
     },
    
     lanzaEstrella:function(){
          
    
            var delay = 1000;
            this.muybien = game.add.sprite(game.width * 0.5, game.height*0.5,'felicidades');
            this.ajustaImagen(this.muybien)
            this.muybien.scale.setTo(0, 0);
            this.muybien.x=game.width *0.5;
            this.muybien.y=game.height*0.5;
            
            game.add.tween(this.muybien,Phaser.Easing.Bounce.Out,true, delay)
            
            /*repetir = game.add.sprite(1100,400, 'repetir');
            this.ajustaImagen3(repetir);
            repetir.inputEnabled = true;
            repetir.input.useHandCursor = true;
            repetir.events.onInputOver.add(over, this);
            repetir.events.onInputOut.add(out, this);
            repetir.events.onInputDown.add(this.onClickRepetir,this);

             function over(imagen){
           imagen.scale.setTo(1.20,1.20);
            
            //console.log(imagen.frameName+' | valor: '+imagen.valor);
            this.estoySobre=imagen;
            }
            function out(imagen){
             //console.log(imagen.frameName);
               imagen.scale.setTo(1,1);
           // this.estoySobre=null;
            }
            
            this.pajaro = game.add.sprite(game.width *0.2,game.height*0.4, 'pajaro')
            this.ajustaImagen(this.pajaro)
            this.pajaro.scale.setTo(0.2, 0.2);
            this.pajaro.x=game.width *0.28;
            this.pajaro.y=game.height*0.2;
            

            
            this.estrella = game.add.sprite(game.width *0.5,game.height*0.5,'medalla');
            this.ajustaImagen2(this.estrella);
            this.estrella.scale.setTo(0, 0);
            this.estrella.x=game.width *0.70;
            this.estrella.y=game.height*0.2;
           var miTween4 = game.add.tween(this.pajaro.scale).to({x:1,y:1},1000,Phaser.Easing.Bounce.Out,true,500);
           var miTween3=game.add.tween(this.estrella.scale).to({x:2,y:2},1000,Phaser.Easing.Bounce.Out,true,delay);
          miTween3.onStart.add(this.onStart, this);*/
          var miTween3=game.add.tween(this.muybien.scale).to({x:1.5,y:1.5},1000,Phaser.Easing.Bounce.Out,true,delay)
          setTimeout(this.onClickRepetir, 5000)
          
     },
    onStart:function(){
       this.correcto2Fx.play(); 
    },
    onStart2:function(){
         
       this.error2Fx.play(); 
    },
 
    numeroAleatorio:function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
    },
     numeroAleatorio3:function(de){
        return Math.floor((Math.random() * de) );
    },

    onClickInicio:function(){
     
        this.state.start('Menu');
    },
     generaFondo:function(imagen){
       //imagen = game.add.sprite(0,0,'fondo');
       imagen.height = game.height;
       imagen.width = game.width;
       imagen.anchor.x=0.5;
       imagen.anchor.y=0.5;
       imagen.x=game.width*0.5;
       imagen.y = game.height * 0.5;
    },
     ajustaImagen: function(imagen){
       imagen.width = imagen.width *3;
       imagen.heiht = imagen.height * 3;
       imagen.scale.setTo(1,1);
       imagen.anchor.setTo(0.5, 0.5);// anchor x y;
    },
     ajustaImagen2: function(imagen){
       imagen.width = imagen.width *3;
       imagen.heiht = imagen.height * 3;
       imagen.scale.setTo(1,1);
       imagen.anchor.setTo(0.5, 0.5);// anchor x y;
    },
     ajustaImagen3: function(imagen){
       imagen.width = imagen.width ;
       imagen.heiht = imagen.height;
       imagen.scale.setTo(1,1);
       imagen.anchor.setTo(0.5, 0.5);// anchor x y;
    },
       onClickRepetir:function(){
        this.cancelaUpdate=false;
        game.bloque=0;
        window.location = 'index.html';
    },
    agregaParallax:function(imagen,profundidad){
           
           var bgWidth = imagen.width ;
           var bgHeight = imagen.height;
          
           var rangeX= gameWidth-bgWidth;
           var rangeY=gameHeight-bgHeight;
           var mouse_percentx=game.input.x/gameWidth;
           var mouse_percenty=game.input.y/gameHeight;
           var amount_to_movex=rangeX*mouse_percentx;
           var amount_to_movey=rangeY*mouse_percenty;
            imagen.x= (amount_to_movex*profundidad)+(bgWidth * 0.5);
            imagen.y= (amount_to_movey*profundidad)+( bgHeight * 0.5);
    }
    //-------------METODOS TEMPLATE------------------   
    
};