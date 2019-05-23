var momentum=0;
var xmomentum=0;
var grounded=[false, 0];
var currentRect=0;
var touchedBottom;
var lastframegrounded, couldwin;
var besttime=9999999;
setInterval(mainLoop, 33);
var timer=0;
var rects = [[0, 400, 300, 20],[300, 70, 200, 20], [500, 200, 250, 20], [90, 300, 300, 20]];       //([0],[1])= bottom left corner, [2] =  width, [3] = height

for(var i=0; i<rects.length; i++){
   $("body").append("<div class = \"rect\" id=\"rect"+i+"\"borp> "); 
}

drawrects();

function drawrects(){
    for(var j=0; j<rects.length; j++){
        $("#rect"+j).css("left",rects[j][0]);
        $("#rect"+j).css("top", convyout(rects[j][1]));
        $("#rect"+j).css("width",rects[j][2]+"px");
        $("#rect"+j).css("height",rects[j][3]+"px");
    }
}

function mainLoop(){
    //console.log(grounded);
    sety(getcoord("#thing") + momentum);
    
    if(grounded[0] &&(getcoordx("#thing")<rects[currentRect][0]-50 || getcoordx("#thing")>rects[currentRect][0]+rects[currentRect][2])){
        grounded=[false,0];
        //console.log(grounded);
    }
    
    if(!grounded[0]||true){
        momentum-=0.3;
    }
    
    // if(detectcol(getcoordx("#thing")+1, getcoord("#thing")+1,rects[0])){
    //     grounded=true;
        
    // }
    
    // else{
    //     grounded=false;    
    // }
    
    setx(getcoordx("#thing")+xmomentum);
    
    currentRect= -1;
    rects.forEach(function(rect){
        currentRect++;
        if(detectcol(getcoordx("#thing"), getcoord("#thing"),rect)){
            // console.log("ah ah ah ah ah ah ah ah ah ah");
            if(currentRect===1){
                touchedBottom=true;
            }
            
            if(currentRect===0 && touchedBottom){
                if(timer<besttime){
                    besttime=timer;
                    $("#goodTime").text(besttime);
                    
                }
            }
            
            else if(currentRect===0){
                timer=0;
            }
            
            if(momentum>0){
                sety(rect[1]);
            }
            
            else if(momentum<0){
                sety(rect[1]+49);
                grounded=[true, currentRect];
            }
            
            momentum=0;
        }
        
        if(grounded[0] && grounded[1]===1){
        couldwin=true;
        console.log("mortt");
    }
    
    else if(!lastframegrounded&&(grounded[0]&&grounded[1]===0)){
        timer=0;
    }
    
    else if(grounded[0]&&grounded[1]===0){
        timer=0;
        lastframegrounded=true;
    }
    
    else if(lastframegrounded){
        timer=1;
        lastframegrounded=false;
    }
    
    else{
        //console.log(grounded);
        timer+=1;
    }
    
    $("#timer").text(timer);
    });
    // console.log("momentum: " + momentum);
    // console.log("getcoord(thing)" + getcoord("#thing"));
}

$("#jump").click(function(){
    momentum=10;
        //console.log(getcoord("#thing"));
});

function getcoord(element){
    var nowInt = parseInt($(element).css("top").replace("px", ""));   
    return 250-(nowInt-250);
}

function getcoordx(element){
    return parseInt($(element).css("left").replace("px", ""));
}

function convyout(ypos){
    return 250-(ypos-250);    
}

function sety(y){
    $("#thing").css("top", convyout(y));
}

function setx(x){
    $("#thing").css("left", x);
}

function detectcol(charx, chary, rect){
    if(chary<0){
        return false;
    }
    
    else if(charx>=rect[0]+rect[2] || rect[0]>=charx+50){
        return false;
        console.log("Henry was a man who hated to eat no eating he said but he ait anyway");
    }
    
    else if(chary <= rect[1]-rect[3] || rect[1] <= chary-50){
        //console.log(chary);
        // console.log("boppp");
        return false;
    }
    
    else{
        // grounded=true;
        return true;
    }
}

$("body").keypress(function(e){
    // console.log("key pressed");
     console.log("keyCode" + e.keyCode);
    if(e.keyCode===119&&grounded[0]){
        grounded=[false,0];
        momentum=10;
    }
    
    else if(e.keyCode===100){
        xmomentum=5;
    }
    
    else if(e.keyCode===97){
        xmomentum= -5;
    }
    
    else if(e.keyCode===115){
        xmomentum=0;
    }
});

function convychar(ypos){
    return 250-(ypos-250)+50;
}