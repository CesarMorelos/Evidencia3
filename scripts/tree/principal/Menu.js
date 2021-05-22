/* global game */

var Technotip = {};
 
Technotip.Menu = function(game){
   let fondo_n1;
    let esquina;
    let empezar;
    let estoySobre;
    let intrucciones;
    let intFx;
    let bocina;
    let instruFx;
};
 
Technotip.Menu.prototype = {
     init:function(datosLink){
      
    },
    preload:function(){  

      
        
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;  
        
        game.load.audio('instru','audio/Juego_ahorcado.mp3')     
        
        game.load.image('esquina','img/imagenes_palabras/pestaña.png');
        game.load.image('bocina','img/imagenes_palabras/Audio.png');      
        
        game.load.image('imgInstru','img/imagenes_palabras/instruccion.png');
        game.load.image('boton','img/imagenes_palabras/boton.png')
    },
    create:function(){      
      this.game.stage.backgroundColor = '#AED581';
      this.instruFx = this.add.audio('instru',1,false)

      
      esquina = game.add.sprite(650,-200, 'imgInstru');
      esquina.scale.setTo(1,1);
      esquina.anchor.setTo(0.5);
      game.add.tween(esquina).to( { y: 200 }, 2000, Phaser.Easing.Bounce.Out, true);
      

      bocina = game.add.sprite(450,-200, 'bocina');
      bocina.scale.setTo(1.0,1.0)      
      bocina.inputEnabled=true;   
      bocina.events.onInputOver.add(over, this);
      bocina.events.onInputOut.add(out, this);        
      bocina.events.onInputDown.add(this.clickIconoBocina, this);
      game.add.tween(bocina).to( { y: 160 }, 2000, Phaser.Easing.Bounce.Out, true); 

      nivel1 = game.add.image(650,450, 'boton')
      nivel1.anchor.setTo(0.5)
      nivel1.inputEnabled=true;
      nivel1.events.onInputOver.add(over, this);
      nivel1.events.onInputOut.add(out, this);
      nivel1.input.useHandCursor = true;
      nivel1.events.onInputDown.add(this.onClickNivel1,this);

    

        function over(imagen){
           imagen.scale.setTo(1.05,1.05);
            
            //console.log(imagen.frameName+' | valor: '+imagen.valor);
            this.estoySobre=imagen;
        }
        function out(imagen){
             //console.log(imagen.frameName);
             imagen.scale.setTo(1,1);
           // this.estoySobre=null;
        }

    },  
    /*Metodo update*/
    update:function(){ 
            
           
         
    

        
    },
     clickIconoBocina:function(){
        

        this.instruFx.play()
        
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
       generaFondo:function(imagen){
       //imagen = game.add.sprite(0,0,'fondo');
       imagen.height = game.height;
       imagen.width = game.width;
       imagen.anchor.x=0.5;
       imagen.anchor.y=0.5;
       imagen.x=game.width*0.5;
       imagen.y = game.height * 0.5;
       
    },
      onClickNivel1:function(){
        this.cancelaUpdate=false;
        game.bloque=0;
        this.state.start('b1l1a2');
    },
    onClickNivel2:function(){
        this.cancelaUpdate=false;
        game.bloque=0;
        this.state.start('nivel2');
    },
    onClickNivel3:function(){
        this.cancelaUpdate=false;
        game.bloque=0;
        this.state.start('nivel3');
    },
};