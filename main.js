



//获取画板，定义画板绘图模式
var canvas=document.getElementById("canvas");
var hua=canvas.getContext("2d");

//给画板全屏模式
var pageWidth=document.documentElement.clientWidth;
var pageHeight=document.documentElement.clientHeight;
canvas.width=pageWidth;
canvas.height=pageHeight;

//屏幕尺寸发生变化时
window.onresize=function () {
    var pageWidth=document.documentElement.clientWidth;
    var pageHeight=document.documentElement.clientHeight;
    canvas.width=pageWidth;
    canvas.height=pageHeight;
};

/***************************************************************/
var using=false;//定义变量，作为更改状态是使用
var star={x:undefined,y:undefined};

//更换橡皮擦和画笔事件
var eraserOn=false;
var eraserObj=document.getElementById("eraser");
var brushObj=document.getElementById("brush");
var actObj=document.getElementById("act");
eraserObj.onclick=function(){
    eraserOn = true;
    actObj.className="action x";
    colObj.className="color yc";
};
brushObj.onclick=function(){
    eraserOn = false;
    actObj.className="action";
    colObj.className="color";
    hua.fillStyle="#000";
    hua.strokeStyle="#000";
    colObj.className="color";
};

/************************************************************************/

//给画笔添加粗细功能
var lw=5;
var r=2;
var lineObj=document.getElementById("line");
var thinObj=document.getElementById("thin");
var thickObj=document.getElementById("thick");
thinObj.onclick=function () {
    lineObj.className="thickness";
    lw=5;
    r=2;
};
thickObj.onclick=function () {
    lineObj.className="thickness z";
    lw=9;
    r=4;
};

/************************************************************************/

//点击清屏事件
var delObj=document.getElementById("del");
delObj.onclick=function(){
  hua.clearRect(0,0,canvas.width,canvas.height);
};

/************************************************************************/

//点击保存
var saveObj=document.getElementById("save");
saveObj.onclick=function () {
  var hf=canvas.toDataURL("image/png");
  //使用a标签的下载功能
    var a=document.createElement("a");
    document.body.appendChild(a);
    a.href=hf;
    a.download="我的作画";
    a.target="_blank";
    a.click();
};

/************************************************************************/

//给画笔添加颜色点击事件
var colObj=document.getElementById("color");
var rObj=document.getElementById("red");
var gObj=document.getElementById("green");
var bObj=document.getElementById("blue");
rObj.onclick=function () {
  colObj.className="color r";
    hua.fillStyle="red";
    hua.strokeStyle="red";
};
gObj.onclick=function () {
    colObj.className="color g";
    hua.fillStyle="green";
    hua.strokeStyle="green";
};
bObj.onclick=function () {
    colObj.className="color b";
    hua.fillStyle="blue";
    hua.strokeStyle="blue";
};

/************************************************************************/
//增加手机端触摸事件
//先判断是否为触屏设备
if(document.body.ontouchstart===null){//或者不等于undefined
    //触摸开始事件
    canvas.ontouchstart=function (aaa) {
        var x=aaa.touches[0].clientX;
        var y=aaa.touches[0].clientY;
        using=true;
        if(eraserOn){
            hua.clearRect(x-5,y-5,30,30);//这个是给“hua”加的动作，并且不带px单位
        }else{
            star={x:x,y:y};
            dian(x,y,r);
        }
    };
    //触摸移动事件
    canvas.ontouchmove=function (aaa) {
        if(using){
            var x=aaa.touches[0].clientX;
            var y=aaa.touches[0].clientY;
            var newStar={x:x,y:y};
            if (eraserOn){
                hua.clearRect(x-5,y-5,30,30);
            }else{
                line(star.x,star.y,newStar.x,newStar.y);
                dian(x,y,r);
                star=newStar;//将新点覆盖旧点
            }
        }
    };
    //触摸结束事件
    canvas.ontouchend=function(aaa){
        using=false;
    };
}else{
    //鼠标点击事件
    canvas.onmousedown=function(aaa){
        var x=aaa.clientX;
        var y=aaa.clientY;
        using=true;
        if(eraserOn){
            hua.clearRect(x-5,y-5,30,30);//这个是给“hua”加的动作，并且不带px单位
        }else{
            star={x:x,y:y};
            dian(x,y,r);
        }
    };
    //鼠标移动事件
    canvas.onmousemove=function(aaa){
        if(using){
            var x=aaa.clientX;
            var y=aaa.clientY;
            var newStar={x:x,y:y};
            if (eraserOn){
                hua.clearRect(x-5,y-5,30,30);
            }else{
                line(star.x,star.y,newStar.x,newStar.y);
                dian(x,y,r);
                star=newStar;//将新点覆盖旧点
            }
        }
    };
    //鼠标松开事件
    canvas.onmouseup=function(aaa){
        using=false;
    };

}



/***************************************************************/
//点的函数
function dian(x,y,r){
    hua.beginPath();
    hua.arc(x,y,r,0,Math.PI*2);
    hua.fill();
}
//线的函数
function line(x1,y1,x2,y2){
    hua.beginPath();
    hua.moveTo(x1,y1);
    hua.lineWidth=lw;
    hua.lineTo(x2,y2);
    hua.stroke();//先必须用stroke，不能用fill
    hua.closePath();
}