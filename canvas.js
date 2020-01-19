import React, { Component,createRef } from 'react';
import $ from 'jquery';
import RActions from 'r-actions';
import {getLength,getLineBySLA,getArcBy3Points,getPrependicularPointFromLine} from 'r-geometric';
var {eventHandler,getClient,getValueByRange} = new RActions();
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.PI = Math.PI / 180;
    this.dom = createRef(); this.width = 0; this.height = 0;
    this.isMobile = 'ontouchstart' in document.documentElement?true:false; 
    $(window).on('resize',this.resize.bind(this));
    this.oc = 5;
    this.mousePosition = [Infinity,Infinity];
    if(this.props.debugMode){this.debug();}
  }
  debug(){
    const {axisPosition,screenPosition,grid,items} = this.props;
    //check axisPosition
    let type,x,y;
    if(!Array.isArray(axisPosition)){console.error('axisPosition must be an array')}
    x = axisPosition[0];
    y = axisPosition[1];
    if(typeof x !== 'string' && typeof x !== 'number'){console.error('axisPosition[0] must be number or string')}
    if(typeof y !== 'string' && typeof y !== 'number'){console.error('axisPosition[1] must be number or string')}
    if(!Array.isArray(screenPosition)){console.error('screenPosition must be an array')}
    x = screenPosition[0];
    y = screenPosition[1];
    if(typeof x !== 'string' && typeof x !== 'number'){console.error('screenPosition[0] must be number or string')}
    if(typeof y !== 'string' && typeof y !== 'number'){console.error('screenPosition[1] must be number or string')}
    if(!Array.isArray(grid)){console.error('grid must be an array')}
    x = grid[0];
    y = grid[1];
    if(typeof x !== 'string' && typeof x !== 'number'){console.error('grid[0] must be number or string')}
    if(typeof y !== 'string' && typeof y !== 'number'){console.error('grid[1] must be number or string')}
    if(!Array.isArray(items)){console.error('items must be an array')}
    this.analizItems(items)

  }
  analizItems(items,index = ''){
    for(var i = 0; i < items.length; i++){
      var {points,pivot} = items[i];
      var addr = index + '.items['+i+']';
      if(pivot && !Array.isArray(pivot)){console.error(`${addr}:pivot must be an array`)}
      if(points){
        if(!Array.isArray(points)){console.error(`${addr}:points must be an array`)}
        for(var j = 0; j < points.length; j++){
          var point = points[j];
          if(typeof point !== 'object'){
            console.error(`${addr}:points[${j}] must be object or array`)
          }
          if(!Array.isArray(point)){
            if(point.length === undefined){
              console.error(`${addr}:points[${j}].length is not defined`)
            }
            if(point.angle === undefined){
              console.error(`${addr}:points[${j}].angle is not defined`)
            }
          }
        }
      }
      else if(item.items){
        this.analizItems(item.items,addr)
      }
      
    }
  }
  resize(){
    this.timer = 0;
    clearInterval(this.interval);
    this.interval = setInterval(()=>{
      this.timer++; 
      if(this.timer >= 20){this.update(); clearInterval(this.interval); }
    },10)
  }
  getRandomColor(color,range = 60) {
    function getRGB(){
      return [
        range + Math.round(Math.random() * (255 - range)),
        range + Math.round(Math.random() * (255 - range)),
        range + Math.round(Math.random() * (255 - range))
      ]
    }
    var color = getRGB();
    color[Math.round(Math.random() * 3)] = 0;
    return {color:`rgb(${color[0]},${color[1]},${color[2]})`,r:color[0],g:color[1],b:color[2]};
  }
  getStyle(style = {}){return style;}   
  getCoordsByPivot({pivot,x,y}){
    if(!pivot){return {x,y};}
    var [px = 0,py = 0] = pivot;
    return {x:x - getValueByRange(px,0,this.width),y:y - getValueByRange(py,0,this.height)}
  }
  getItem(item){  
    if(item.array && item.count){
      let {x = 0,y = 0,count,array,pivot} = item;
      count = typeof count === 'function'?count(item):count;
      var arr = []; 
      for(var i = 0; i < count; i++){arr.push(array(i,item))}
      return {items:arr,x,y,pivot};
    }
    if(item.arcPoints){ 
      let {arcPoints,pivot = []} = item;
      var arc = getArcBy3Points(...arcPoints);
      item.r = arc.r; item.slice = arc.slice;
      item.pivot = [-arc.x + (pivot[0] || 0),-arc.y + (pivot[1] || 0)]
    }
    if(item.trianglePoints){ 
      let {trianglePoints,triangleWidth,corner = []} = item;
      var [p1,p2] = trianglePoints;
      var width = triangleWidth;
      var t1 = getPrependicularPointFromLine(p1,p2,'start',width/2)
      var t2 = getPrependicularPointFromLine(p1,p2,'start',-width/2)
      
      item.points = [
        [p1[0],p1[1],corner[0]],
        [t1.x,t1.y,corner[1]],
        [p2[0],p2[1],corner[2]],
        [t2.x,t2.y],
        p1
      ]

    }
    return item; 
  }
  getExtension(item){
    let {ext,parameter} = item;
    if(!ext){return item;}
    let {extensions} = this.props;
    return $.extend({},extensions[ext](parameter),item); 
  }
  draw(items = this.props.items,parent = {}){  
    //مشخصات پرنت رو بگیر
    var {x:parentx = 0,y:parenty = 0,rotate:parentrotate = 0,opacity:parentOpacity = 1} = parent;
    var {rotateSetting,zoom,extensions} = this.props,ctx = this.ctx;
    for(var i = 0; i < items.length; i++){
      let item = this.getItem(items[i]); 
      item = this.getExtension(item);
      if(item.show === false){continue;}  

      //پارامتر های مشترک رو از آیتم بگیر
      let {showPivot,lineJoin = 'miter',lineCap = 'butt',rotate = 0,pivot,angle = 0,opacity = 1,x = 0,y = 0,fill,stroke,dash,lineWidth = 1} = item;  
      x = getValueByRange(x,0,this.width) + parentx;
      y = getValueByRange(y,0,this.height) + parenty;   
      rotate = getValueByRange(rotate,0,360);
      opacity *= parentOpacity;
      let coords = this.getCoordsByPivot({x,y,pivot});
      if(!fill && !stroke){stroke = '#000'; item.stroke = '#000';}
      ctx.save(); ctx.beginPath(); 
      rotate && this.rotate(rotate,{x,y});
      angle && this.rotate(angle,coords);
      ctx.globalAlpha = opacity;
      ctx.lineCap = lineCap;
      ctx.lineJoin = lineJoin;
      this.shadow(item,ctx);
      dash && ctx.setLineDash(dash);
      ctx.lineWidth = lineWidth * zoom;
      ctx.strokeStyle = stroke === 'random'?this.getRandomColor().color:this.getColor(stroke);
      ctx.fillStyle = fill === 'random'?this.getRandomColor().color:this.getColor(fill);
    
      if(item.items){this.draw(item.items,{x:coords.x,y:coords.y,rotate,opacity});}
      else if(item.width || item.height){
        var {width = 20,height = 20,corner = []} = item; 
        width = getValueByRange(width,0,this.width);
        height = getValueByRange(height,0,this.height);
        let {x,y} = coords,[c0 = 0,c1 = 0,c2 = 0,c3 = 0] = corner;
        var points = [[x + width / 2,y],[x + width,y,c1],[x + width,y + height,c2],[x,y + height,c3],[x,y,c0],[x + width / 2,y,c1]]
        this.drawLine(parentx,parenty,points,{x:0,y:0},close,stroke,fill)
      }
      else if(item.points){
        let {points,close} = item;
        if(points.length < 1){continue;} 
        this.drawLine(parentx,parenty,points,coords,close,stroke,fill,item)
      }
      else if(item.r){
        var {r,slice = [0,360]} = item;   
        r = getValueByRange(r,this.width,this.height);
        r = r < 0?0:r;
        item.r = r;
        var {direction='clock'} = rotateSetting;
        var startAngle = getValueByRange(slice[0],0,360),endAngle = getValueByRange(slice[1],0,360);
        if(direction === 'clockwise'){
          let a = startAngle,b = endAngle;
          startAngle = -b; endAngle = -a;
        }
        item.startAngle = startAngle; item.endAngle = endAngle;
        ctx.arc(coords.x * zoom, coords.y * zoom, r * zoom, startAngle * this.PI, endAngle * this.PI);
        stroke && ctx.stroke();
        fill && ctx.fill(); 
      }
      
      else if(item.text || item.text === 0){ 
        var {align=[0,0],fontSize=12,text = 'Text'} = item;
        var [textAlign,textBaseline] = this.getTextAlign(align);
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline; 
        ctx.font = (fontSize * zoom) + "px arial";
        stroke && ctx.strokeText(text, coords.x * zoom, coords.y * zoom);
        fill && ctx.fillText(text,coords.x * zoom,coords.y * zoom);   
      }
      if(showPivot){this.showPivot(x,y)}
      if(this.eventMode && item.event && item.event[this.eventMode]){ 
        let X = this.mousePosition[0] + this.axisPosition[0];
        let Y = this.mousePosition[1] + this.axisPosition[1];
        if(item.fill && ctx.isPointInPath(X,Y)){this.item = item;}
        else if(item.stroke && ctx.isPointInStroke(X,Y)){this.item = item;} 
      }
      ctx.closePath(); ctx.restore();
    }
  }
  drawLine(parentx,parenty,points,coords,close,stroke,fill,item){
    var {zoom} = this.props;
    var start = [getValueByRange(points[0][0],0,this.width) + coords.x,getValueByRange(points[0][1],0,this.height) + coords.y];
    this.ctx.moveTo(start[0] * zoom,start[1] * zoom ); 
    var beforePoint = points[0];
    for(var i = 1; i < points.length; i++){
      let [x,y,r] = this.getPoint(points[i],beforePoint); 
      beforePoint = [x,y];
      let point = [getValueByRange(x,0,this.width) + coords.x,getValueByRange(y,0,this.height) + coords.y];
      if(r){
        let [x,y] = points[i + 1]?this.getPoint(points[i + 1],points[i]):points[0];
        let nextPoint = [getValueByRange(x,0,this.width) + coords.x,getValueByRange(y,0,this.height) + coords.y];
        this.ctx.arcTo(point[0] * zoom,point[1] * zoom,nextPoint[0] * zoom,nextPoint[1] * zoom,r * zoom)
      } 
      else{this.ctx.lineTo(point[0] * zoom,point[1]  * zoom);}
    }
    if(points.length > 2 && close){this.ctx.lineTo(start[0] * zoom, start[1] * zoom);}
    stroke && this.ctx.stroke();
    fill && this.ctx.fill();
    
    
  }
  showPivot(x,y){
    var ctx = this.ctx;
    ctx.beginPath(); ctx.arc(x,y,10,0,360*Math.PI / 180); ctx.moveTo(x - 15,y); ctx.lineTo(x + 15,y); ctx.moveTo(x,y-15); ctx.lineTo(x,y + 15); ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255,100,0,.3)'; ctx.stroke();  ctx.closePath();
  }
  getPoint(point,beforePoint){
    if(Array.isArray(point)){return point;}
    return getLineBySLA(beforePoint,point.length,point.angle).p2; 
  }
  rotate(angle = 0,center){
    var {zoom,rotateSetting} = this.props;
    var {direction = 'clock'} = rotateSetting;
    if(angle === 0){return;}
    angle = angle * this.PI * (direction === 'clockwise'?-1:1);
    var s = Math.sin(angle),c = Math.cos(angle);
    var p = {x:center.x,y:-center.y};
    this.ctx.rotate(angle);
    var x = (p.x * c - p.y * s) - p.x;
    var y = p.y - (p.x * s + p.y * c);
    this.ctx.translate(x * zoom,y * zoom);
  }
  update(){
    this.items = [];
    var {getSize,grid,zoom} = this.props;
    var dom = $(this.dom.current);
    this.width = dom.width();
    this.height = dom.height();
    dom[0].width = this.width;
    dom[0].height = this.height; 
    var [x = '50%',y = '50%'] = this.props.axisPosition;
    this.axisPosition = [
      getValueByRange(x,0,this.width),
      getValueByRange(y,0,this.height)
    ]
    if(getSize){getSize(this.width,this.height);}
    if(grid){dom.css(this.getBackground(grid,zoom,this.width,this.height));}
    this.clear();
    this.setScreen();
    //if(grid){this.drawAxes();}
    this.draw();
  }
  clear() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }
  drawAxes(){
    var dash = [3,3],stroke = '#000';
    this.draw([
      {points:[[0,-4002],[0,4000]],stroke,dash,AxIs:true},
      {points:[[-4002,0],[4000,0]],stroke,dash,AxIs:true}
    ]);
  }
  componentDidMount(){
    this.ctx = this.ctx || this.dom.current.getContext("2d");
    this.update();        
  }
  componentDidUpdate(){
    this.update();
  }
  getColor(color){
    if(!color){return;}
    if(typeof color === 'string'){return color;}
    var length = color.length;
    if(length === 5){
      var g = this.ctx.createLinearGradient(...color); 
    }
    else if(length === 7){
      var g = this.ctx.createRadialGradient(...color); 
    }
    var stops = color[color.length - 1];
    for(var i = 0; i < stops.length; i++){
      var s = stops[i].split(' ');
      g.addColorStop(s[0],s[1]);
    }
    return g;
  }
  shadow({shadow}){
    if(!shadow){return;}
    var ctx = this.ctx;
    ctx.shadowOffsetX = shadow[0];
    ctx.shadowOffsetY = shadow[1];
    ctx.shadowBlur = shadow[2];
    ctx.shadowColor = shadow[3];  
  }
  getSides(list){
    var first = list[0],minx = first.x,miny = first.y,maxx = first.x,maxy = first.y;
    for(var i = 1; i < list.length; i++){
      var {x,y} = list[i];
      if(x < minx){minx = x;}else if(x > maxx){maxx = x;}
      if(y < miny){miny = y;}else if(y > maxy){maxy = y;}
    }
    return {left:minx,right:maxx,up:miny,down:maxy,center:{x:(minx + maxx)/2,y:(miny + maxy)/2}};
  }
  getTextAlign([x = 0,y = 0]){
    return [['right','center','left'][x + 1],['top','middle','bottom'][y + 1]];
  }
  getBackground(){
    var {grid,zoom} = this.props;
    var [x,y,color = 'rgba(70,70,70,0.3)'] = grid;
    var a = 100 * zoom;
    var b = x?(getValueByRange(x,0,this.width) * zoom) + 'px':'100%';
    var c = y?(getValueByRange(y,0,this.height) * zoom) + 'px':'100%';
    var h1 = `linear-gradient(${color} 0px,transparent 0px)`;
    var v1 = `linear-gradient(90deg,${color} 0px, transparent 0px)`;
    var h2 = `linear-gradient(${color} 1px, transparent 1px)`;
    var v2 = `linear-gradient(90deg,${color} 1px, transparent 1px)`;
    return {
      backgroundImage:`${h1},${v1},${h2},${v2}`,
      backgroundSize : `${a}px ${a}px,${a}px ${a}px,${b} ${c},${b} ${c}`,
    }
  }
  panmousedown(e){
    eventHandler("window", "mousemove", $.proxy(this.panmousemove,this));
    eventHandler("window", "mouseup", $.proxy(this.panmouseup,this));
    this.panned = false;
    var {screenPosition} = this.props;
    var client = getClient(e);
    this.startOffset = { 
        x: client.x, y: client.y, 
        endX: screenPosition[0], endY: screenPosition[1] 
    };
  }
  panmouseup() {
    eventHandler("window", "mousemove", this.panmousemove,'unbind');
    eventHandler("window", "mouseup", this.panmouseup,'unbind');
  }
  panmousemove(e) {
    var so = this.startOffset, {zoom,onpan} = this.props, coords = getClient(e);
    //if(!this.panned && this.getLength({x:so.x,y:so.y},coords) < 5){return;}
    this.panned = true;
    var x = (so.x - coords.x) / zoom + so.endX,y = (coords.y - so.y) / zoom + so.endY;
    onpan([x,y]);
  }
  setScreen(){
    var {zoom,screenPosition} = this.props;
    var canvas = this.dom.current;
    this.translate = { 
      x: (this.axisPosition[0]) - (screenPosition[0] * zoom), 
      y: (this.axisPosition[1]) - (screenPosition[1] * zoom * -1) 
    }
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.translate(this.translate.x, this.translate.y);
    $(canvas).css({
      backgroundPosition: this.translate.x + "px " + this.translate.y + "px",  
    });
  }
  mouseDown(e){
    const {mouseDown,onpan} = this.props;
    this.mousePosition = this.getMousePosition(e); 
    this.eventMode = 'mousedown';
    this.update();
    if(this.item){this.item.event.mousedown()} 
    this.item = false;
    this.eventMode = false;
    if(mouseDown){mouseDown(e,this.mousePosition);} 
    if(onpan && this.items.length === 0){this.panmousedown(e);} 
  } 
  mouseUp(e){
    const {mouseUp} = this.props;
    this.mousePosition = this.getMousePosition(e);
    this.eventMode = 'mouseup';
    this.update();
    if(this.item){this.item.event.mouseup();}
    this.item = false;
    this.eventMode = false;  
    if(mouseUp){mouseUp(e,this.mousePosition)}
  }
  arcTest([x,y]){
    this.ctx.beginPath();
    this.ctx.arc(x,y,3,0,360*Math.PI / 180);
    this.ctx.fill();
    this.ctx.closePath();  
  }
  searchItem(){
    for(var i = this.items.length - 1; i >= 0; i--){
      var item = this.items[i];
      if(!item.callback){continue;}
      if(item.fill && item.inPath){
        item.callback(item);
        return;
      }
      if(item.stroke && item.inStroke){
        item.callback(item);
        return;
      }
    }
  }
  mouseMove(e){
    this.mousePosition = this.getMousePosition(e);
    if(this.props.mouseMove){this.props.mouseMove(e,this.mousePosition);}
  }
  getMousePosition(e) { 
    var {unit,screenPosition:sp,zoom} = this.props;
    var client = getClient(e);
    var offset = $(this.dom.current).offset();
    client = {x:client.x - offset.left + window.pageXOffset,y:client.y - offset.top + window.pageYOffset}
    var x = Math.floor((client.x - (this.axisPosition[0]) + (sp[0] * zoom)) / zoom);
    var y = Math.floor((client.y - (this.axisPosition[1]) + (sp[1] * zoom * -1)) / zoom); 
    return [x,y,x * 100 / this.width,y * 100 / this.height];
  }
  render() {
    var {id,style,className} = this.props;
    return (
      <canvas 
        ref={this.dom} 
        className={className}
        id={id} 
        style={this.getStyle(style)} 
        onMouseDown={this.mouseDown.bind(this)}
        onMouseMove={this.mouseMove.bind(this)}
        onMouseUp={this.mouseUp.bind(this)}
        
      ></canvas>
    );
  }
}
Canvas.defaultProps = {
  zoom:1,axisPosition:['50%','50%'],selectable:false,
  screenPosition:[0,0],items:[],rotateSetting:{direction:'clock'}
}