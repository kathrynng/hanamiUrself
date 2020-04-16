var img, iW, iH, canv = null;

var loadImg = function(event){
    img = URL.createObjectURL(event.target.files[0])
    $('#output').attr('src', img)
    canv = p5run()
    
}
function p5run(){
    if(canv===null){
        const s = p => {
            var nCb, cherries

            p.setup = function(){
                p.createCanvas(800, 800);
                p5img = p.loadImage(img);
                
                nCb = 10
                cherries = []
                for(var i = 0; i < nCb; i++)
                    cherries.push(new cherryB())
                    
                
                console.log(cherries)
            }
            p.draw = function(){
                p.background(23)
                // p.image(p5img,0,0,800,800)

                let time = p.frameCount / 60;

                //run cherry blossoms
                cherries.forEach(cherry => {
                    cherry.move()
                    cherry.display()
                   
                });
            }

            //cherry blossom obj
            cherryB = function() {
                this.cbimg = '../imgs/petal' + p.int(p.random(1,4)) + '.png'
                this.x = p.int(p.random(0, 1))
                this.y = -5
                this.speedX = p.random(2, 10)
                this.speedY =  p.random(2, 10)
                
                this.move = function (){
                    this.x += this.speedX
                    this.y += this.speedY
                }

                this.display = function(){
                    cherryImg = p.loadImage(this.cbimg)
                    p.image(cherryImg, this.x, this.y)
                    if(this.x > p.width){
                        this.x = p.int(p.random(0, 1))
                        this.y = 0
                    }
                }
            }
        };
            
        new p5(s, "canvas-div")   
    }
}