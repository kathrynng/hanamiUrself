var img, iW = 800 , iH = 800, canv = null;
var speedConstant=1;
var direction=1;
var newAmount, amount=75, amountSelected = "default";
var globalScale=1;

var loadImg = function(event){
    img = URL.createObjectURL(event.target.files[0])
    var upload = new Image()
    
    upload.src = img
    upload.onload = function(){
        iW = this.width
        iH = this.height

        p5run()
    }
    
    $('#uploadBtn').attr('value','Upload a new Image')
}

$(document).on('input', '#speedSlider', function() {
    let newSpeed = $(this).val() * 0.25
    speedConstant =  newSpeed
    if (speedConstant === 1){
        $('#speedLabel').html('Default')
    } else {
        $('#speedLabel').html(speedConstant)
    }
});

$(document).on('input', '#directionOption', function() {
    direction = $('input[name=directionSelect]:checked', '#directionOption').val() === 'left' ? 1 : -1;
});

$(document).on('input', '#amountOption', function() {
    amountSelected = $('input[name=amountSelect]:checked', '#amountOption').val();
    switch(amountSelected){
        case "less": newAmount = 45; break;
        case "default": newAmount = 80; break;
        case "more": newAmount = 120; break;
    }
});

$(document).on('input', '#sizeOption', function() {
    globalScale = $('input[name=sizeSelect]:checked', '#sizeOption').val();
});

function p5run(){
    
    const s = p => {
        var cherries = [], cnvH = 800, cnvW = 800
        
        p.setup = function(){   

            if(iW == iH && iW > 800){
                cnvW = 800
                cnvH = 800
            }else if(iW > 800){
                cnvW = 800
                cnvH = iH * (cnvW/iW)
            }else if(iH > 800){
                cnvH = 800
                cnvW = iW * (cnvH/iH)
            }else{
                cnvW = iW
                cnvH = iH
            }

            
            p.createCanvas(cnvW, cnvH);
            p5img = p.loadImage(img);
            
            if(!!newAmount){
                amount = newAmount
            }

            for(var i = 0; i < amount; i++)
                cherries.push(new cherryB())
                
           p.colorMode(p.RGB, 255, 255, 255, 1)
           p.noStroke();
        
        }
        
        p.draw = function(){
            p.background(55)

            p.imageMode(p.CORNER)
            p.image(p5img,0,0,cnvW,cnvH)

            //run cherry blossoms
            cherries.forEach(cherry => {
                cherry.move()
                cherry.display()
            });

            if(!!newAmount && newAmount !== amount){
                cherries = [];
                for(var i = 0; i < newAmount; i++){
                    cherries.push(new cherryB())
                }
                amount = newAmount
            }
        }

        //cherry blossom obj
        cherryB = function() {

            this.cbimg = './imgs/petal' + p.int(p.random(1,7)) + '.png'
            if (direction === 1){
                this.x = p.int(p.random(-2*cnvW, cnvW))
            } else {
                this.x = p.int(p.random(0, 2*cnvW))
            }
            this.y = -5
            this.speedX = p.random(3, 7) *  speedConstant * direction
            this.speedY =  p.random(3, 7) *  speedConstant
            this.cherryImg = p.loadImage(this.cbimg)
            
            var scale=p.random(0.1,1.25)*globalScale
            
            this.move = function (){
                this.x += this.speedX * speedConstant
                this.y += this.speedY * speedConstant

                if(direction === 1){
                    if((this.x > (cnvW + 10)) || this.y > (cnvH + 5)){
                        this.x = p.int(p.random(-2*cnvW, cnvW))
                        this.y = -5
                        this.speedX = p.random(3, 7) *  speedConstant * direction
                        this.speedY =  p.random(3, 7) *  speedConstant
                        scale=p.random(0.1,1.25)*globalScale
                    }
                } else {
                    if ((this.x < -10) || this.y > (cnvH + 5)){
                        this.x = p.int(p.random(0, 2*cnvW))
                        this.y = -5
                        this.speedX = p.random(3, 7) *  speedConstant * direction
                        this.speedY =  p.random(3, 7) *  speedConstant
                        scale=p.random(0.1,1.25)*globalScale
                    }
                }
            }

            this.display = function(){
                // p.fill(255,192,203,1)
                // p.ellipseMode(p.CENTER)
                // p.ellipse(this.x, this.y, 15)
                
                p.imageMode(p.CENTER)

                p.image(this.cherryImg, this.x, this.y, scale*this.cherryImg.width, scale*this.cherryImg.height)
              
            }
        }
        
    }
    if(canv===null){
        canv = new p5(s, "canvas-div")  
    }else {
        $('canvas').remove();
        canv = new p5(s, "canvas-div")  
    }
}