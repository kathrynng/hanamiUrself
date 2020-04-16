var img, iW, iH, canv = null;

var loadImg = function(event){
    img = URL.createObjectURL(event.target.files[0])
    $('#output').attr('src', img)
    canv = p5run()
    
}
function p5run(){
    if(canv===null){
        const s = p => {
            var nCb = 25, cherries = []

            p.setup = function(){
               
                p.createCanvas(800, 800);
                p5img = p.loadImage(img);
                
                for(var i = 0; i < nCb; i++)
                    cherries.push(new cherryB())
                    
                
                    
               p.colorMode(p.RGB, 255, 255, 255, 1)
               p.noStroke();
            
            }
            p.draw = function(){
                p.background(55)

                p.imageMode(p.CORNER)
                p.image(p5img,0,0,800,800)

                

                //run cherry blossoms
                cherries.forEach(cherry => {
                    cherry.move()
                    cherry.display()
                   
                });
            }

            //cherry blossom obj
            cherryB = function() {
                
                this.cbimg = '../imgs/petal' + p.int(p.random(1,4)) + '.png'
                this.x = p.int(p.random(-400, 400))
                this.y = -5
                this.speedX = p.random(3, 7)
                this.speedY =  p.random(3, 7)
                this.cherryImg = p.loadImage(this.cbimg)

                
                this.move = function (){
                    this.x += this.speedX
                    this.y += this.speedY

                    if(this.x > 810 || this.y > 810){
                        this.x = p.int(p.random(-400, 400))
                        this.y = -5

                    }
                }

                this.display = function(){
                    // p.fill(255,192,203,1)
                    // p.ellipseMode(p.CENTER)
                    // p.ellipse(this.x, this.y, 15)
                    
                    p.imageMode(p.CENTER)

                    p.image(this.cherryImg, this.x, this.y)
                  
                    
                }
            }
        };
            
        new p5(s, "canvas-div")   
    }
}