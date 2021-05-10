let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
//背景圖寬高600，九高格一格200，人物圖片寬高
const gridLength = 200;

$(function(){
    mapArray = [
        [0,1,1],
        [0,0,0],
        [3,1,2]
    ]; //0-可走、1-障礙、2-終點、3-敵人
    
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    //控制主角圖的位置
    currentImgMain = {
        x:0,
        y:0
    };
    imgMain.onload = function(){
        //從原本的圖的(0,0)剪下寬80高130的區域，貼至目前指定位置，並且縮放成指定的寬度與高度
        ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x, currentImgMain.y, gridLength, gridLength);
        //ctx.drawImage(imgMain,0,0);
        //ctx.drawImage(imgMain,0,0,300,300);
    };

    imgMountain = new Image();
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";

    //初始化環境
    imgMountain.onload = function(){
        imgEnemy.onload = function(){
            //尋訪mapArry
            for(var x in mapArray){
                for(var y in mapArray){
                    //1放障礙物，3放敵人
                    if(mapArray[x][y]==1){
                        ctx.drawImage(imgMountain,32,65,32,32,y*gridLength, x*gridLength, gridLength, gridLength);
                    }else if(mapArray[x][y]==3){                      
                        ctx.drawImage(imgEnemy,7,40,104,135,y*gridLength, x*gridLength, gridLength, gridLength);
                    }
                }
            }
        };
    };



});
//使用者按下按鍵
$(document).on("keydown",function(event){

    let targetImg, targetBlock;
    //選擇用哪張主角圖
    let cutImagePositionX;
    //暫存位置，對應到currentImgMain
    targetImg = {
        x:-1,
        y:-1
    };
    //探路用的，對應到mapArray
    targetBlock = {
        x:-1,
        y:-1
    };
    //避免鍵盤預設行為
    event.preventDefault();
    
    //console.log(event);
    //主角的朝向跟上下左右移動，用event事件包裡頭的code屬性
    switch(event.code){
        case "ArrowLeft":
            //移動位置
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            //大圖片裡頭臉朝左的圖片起始位置
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    //如果沒有超出邊界，就把地圖位置傳給targetBlock
    if(targetImg.x<=400 && targetImg.x>=0 && targetImg.y<=400 & targetImg.y>=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    //清空目前主角所在的那一格
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    //判斷目前targetBlock的位置有什麼再行動
    if(targetBlock.x!=-1 && targetBlock.y!=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有山");
                break;
            case 2:
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3:
                $("#talkBox").text("哈搂");
                break;
            
        }
    }else{
        $("#talkBox").text("邊界");
    }

    //繪製主角
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMain.x, currentImgMain.y, gridLength, gridLength);

});