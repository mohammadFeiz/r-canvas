import React, { Component,createRef } from 'react';
import $ from 'jquery';
import RActions from 'r-actions';
var {eventHandler,getClient,getValueByRange} = new RActions();
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.PI = Math.PI / 180;
    this.dom = createRef(); this.width = 0; this.height = 0;
    this.isMobile = 'ontouchstart' in document.documentElement?true:false;
    $(window).on('resize',this.resize.bind(this));
  }
  resize(){
    this.timer = 0;
    clearInterval(this.interval);
    this.interval = setInterval(()=>{
      this.timer++;
      if(this.timer >= 20){
        this.update();
        clearInterval(this.interval); 
      }
    },10)
  }
  getStyle(style = {}){return style;}
  
  draw(items = this.props.items,parent = {}){
    for(var i = 0; i < items.length; i++){  
      var item = items[i];
      var {show,type} = item;
      if(show === false){continue;}
      var {rotateSetting,zoom} = this.props,ctx = this.ctx;
      var {
        lineJoin = 'miter',lineCap = 'butt',rotate = 0,pivot,angle,opacity = 1
      } = item;  
      var {x:parentx = 0,y:parenty = 0,rotate:parentrotate = 0,opacity:parentOpacity = 1} = parent;
      rotate = getValueByRange(rotate,0,360);
      parentrotate = getValueByRange(parentrotate,0,360);
      rotate += parentrotate;
      opacity *= parentOpacity;
      if(type === 'group'){
        var {x = 0,y = 0} = item;
        x += parentx; y += parenty; 
      }
      if(type === 'line'){
        var {points,close} = item;
        if(points.length < 2){return false;}
        var {x,y} = points[0];  
        x += parentx; y += parenty; 
      }
      else if(type === 'arc'){
        var {x = 0,y = 0,r = 20} = item;  
        x += parentx; y += parenty;
        x = getValueByRange(x,0,this.width);
        y = getValueByRange(y,0,this.height);
        r = getValueByRange(r,this.width,this.height);
        
        var p = this.getCoordsByPivot({x,y,r,pivot,type:'arc'});
        var center = {x:p.x,y:p.y}; //مخصات مرکز
        var param = {x:p.x,y:p.y,r};  
      }
      else if(type === 'rectangle'){
        var {x = 0,y = 0,width = 20,height = 20} = item; 
        x += parentx; y += parenty;
        x = getValueByRange(x,0,this.width);
        y = getValueByRange(y,0,this.height);
        width = getValueByRange(width,0,this.width);
        height = getValueByRange(height,0,this.height);
        var p = this.getCoordsByPivot({x,y,width,height,pivot,type:'rectangle'});
        var center = {x:p.x + width / 2,y:p.y + height / 2};  
        var param = {x:p.x,y:p.y,width,height};
      }
      else if(type === 'text'){
        var {x = 0,y = 0,align=[0,0],fontSize=12,text} = item;
        x += parentx; y += parenty;
        var [X,Y] = this.getTextAlign(align);
        x = getValueByRange(x,0,this.width);
        y = getValueByRange(y,0,this.height);
        var p = this.getCoordsByPivot({x,y,pivot,type:'text'});
        var center = {x:p.x,y:p.y}; //مختصات مرکز
        var param = {x:p.x,y:p.y};
        ctx.textBaseline = Y;
        ctx.font = (fontSize * zoom) + "px arial";
        ctx.textAlign = X;
      }
      ctx.save(); ctx.beginPath();
      rotate && this.rotate(rotate,{x,y});
      angle && this.rotate(angle,center);
      ctx.globalAlpha = opacity;
      
      if(type === 'group'){
        this.draw(item.items,{x,y,rotate,opacity});
      }
      
      this.shadow(item,ctx);
      ctx.lineCap = lineCap;
      ctx.lineJoin = lineJoin;
      this.ink(item,param);
      ctx.closePath(); ctx.restore();
    }
  }
  setStroke(stroke,lineWidth,dash){
    if(!stroke){return false;}
    var ctx = this.ctx,{zoom} = this.props;
    dash && ctx.setLineDash(dash);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth * zoom;
    return true;
  }
  setFill(fill){
    if(!fill){return false;}
    var ctx = this.ctx;
    ctx.fillStyle = fill;
    return true; 
  }
  ink({type,stroke,fill,text = 'Text',r,points,close,slice=[0,360],pivot,lineWidth = 1,dash},obj){
    if(!fill && !stroke){return;}
    var {zoom,rotateSetting} = this.props,ctx = this.ctx;
    if(type === 'text'){
      let {x,y} = obj;
      this.setStroke(stroke,lineWidth,dash) && ctx.strokeText(text, x * zoom, y * zoom);
      this.setFill(fill) && ctx.fillText(text,x * zoom,y * zoom);
    }
    else if(type === 'rectangle'){
      let {x,y,width,height} = obj;
      this.setStroke(stroke,lineWidth,dash) && ctx.strokeRect(x * zoom, y * zoom, width * zoom, height * zoom); 
      this.setFill(fill) && ctx.fillRect(x * zoom, y * zoom, width * zoom, height * zoom);
    }
    else if(type === 'arc'){
      let {x,y} = obj;
      var {direction='clock'} = rotateSetting;
      var slice0 = getValueByRange(slice[0],0,360),slice1 = getValueByRange(slice[1],0,360);
      var sa,ea;
      if(direction === 'clock'){sa = slice0; ea = slice1;}
      else{sa = -slice1; ea = -slice0;}
      ctx.arc(x * zoom, y * zoom, obj.r * zoom, sa * this.PI, ea * this.PI);
      this.setStroke(stroke,lineWidth,dash) && ctx.stroke();
      this.setFill(fill) && ctx.fill();
    }
    else if(type === 'line'){ 
      var start = this.getCoordsByPivot({x:points[0].x,y:points[0].y,pivot,type:'line'});
      ctx.moveTo(getValueByRange(start.x,0,this.width) * zoom, getValueByRange(start.y,0,this.height) * zoom); 
      for(var i = 1; i < points.length; i++){
        let p = this.getCoordsByPivot({x:points[i].x,y:points[i].y,pivot,type:'line'});
        ctx.lineTo(getValueByRange(p.x,0,this.width) * zoom, getValueByRange(p.y,0,this.height) * zoom);
      }
      if(points.length > 2 && close){
        ctx.lineTo(start.x * zoom, start.y * zoom);
      }
      this.setStroke(stroke,lineWidth,dash) && ctx.stroke();
      this.setFill(fill) && ctx.fill();
    }
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
    var {getSize,grid,zoom} = this.props;
    var dom = this.dom.current;
    this.width = $(dom).width();
    this.height = $(dom).height();
    var {x = '50%',y = '50%'} = this.props.axisPosition;
    this.axisPosition = {
      x:getValueByRange(x,0,this.width),
      y:getValueByRange(y,0,this.height)
    }
    if(getSize){getSize(this.width,this.height);}
    dom.width = this.width;
    dom.height = this.height;
    if(grid){$(dom).css(this.getBackground(grid,zoom,this.width,this.height));}
    this.clear();
    this.setScreen();
    if(grid){this.drawAxes();}
    this.draw();
  }
  clear() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }
  drawAxes(){
    var stroke = [undefined,1,[3,3]],type= 'line';
    this.draw([{type,points:[{ x: 0, y: -4002 },{ x: 0, y: 4000 }],stroke},{type,points:[{ x: -4002, y: 0 },{ x: 4000, y: 0 }],stroke}]);
  }
  componentDidMount(){
    this.ctx = this.ctx || this.dom.current.getContext("2d");
    this.update();        
  }
  componentDidUpdate(){
    this.update();
  }
  getColor(color){
    if(typeof color === 'string'){return color;}
    var [sx,sy,ex,ey,stops] = color;
    var g = this.ctx.createLinearGradient(sx, sy, ex, ey); 
    for(var i = 0; i < stops.length; i++){
      var s = stops[i];
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
    var {x,y,color='#000'} = grid;
    var a = 100 * zoom;
    var b = x?(getValueByRange(x,0,this.width) * zoom) + 'px':'100%';
    var c = y?(getValueByRange(y,0,this.height) * zoom) + 'px':'100%';
    var h1 = `linear-gradient(#000 0px,transparent 0px)`;
    var v1 = `linear-gradient(90deg, #000 0px, transparent 0px)`;
    var h2 = `linear-gradient(rgba(${color},0.3) 1px, transparent 1px)`;
    var v2 = `linear-gradient(90deg, rgba(${color},0.3) 1px, transparent 1px)`;
    return {
      backgroundImage:`${h1},${v1},${h2},${v2}`,
      backgroundSize : `${a}px ${a}px,${a}px ${a}px,${b} ${c},${b} ${c}`,
    }
  }
  getCoordsByPivot(obj){
    var {pivot,type,x,y} = obj;
    if(!pivot){return {x,y};}
    var {x:px = 0,y:py = 0} = pivot,w ,h;
    px = getValueByRange(px,this.width,this.height);
    py = getValueByRange(py,this.width,this.height);
    if(type === 'rectangle'){
      let {width,height} = obj;
      w = width; h = height;
    }
    else if(type === 'arc'){
      let {r} = obj;
      w = r * 2; h = r * 2;
    }
    return {x:x - getValueByRange(px,0,w),y:y - getValueByRange(py,0,h)}
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
      x: (this.axisPosition.x) - (screenPosition[0] * zoom), 
      y: (this.axisPosition.y) - (screenPosition[1] * zoom * -1) 
    }
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.translate(this.translate.x, this.translate.y);
    $(canvas).css({
      backgroundPosition: this.translate.x + "px " + this.translate.y + "px",  
    });
  }
  mouseDown(e){
    this.mousePosition = this.getMousePosition(e);
    var {mouseDown,onpan,getMousePosition} = this.props;
    if(getMousePosition){getMousePosition(this.mousePosition);}
    if(mouseDown){mouseDown(e);} 
    if(onpan){this.panmousedown(e);}
  }
  mouseMove(e){
    this.mousePosition = this.getMousePosition(e);
    if(this.props.getMousePosition){this.props.getMousePosition(this.mousePosition);}
  }
  getMousePosition(e) { 
    var {unit,screenPosition:sp,zoom} = this.props;
    var client = getClient(e);
    var offset = $(this.dom.current).offset();
    client = {x:client.x - offset.left + window.pageXOffset,y:client.y - offset.top + window.pageYOffset}
    var x = Math.floor((client.x - (this.axisPosition.x) + (sp[0] * zoom)) / zoom);
    var y = Math.floor((client.y - (this.axisPosition.y) + (sp[1] * zoom * -1)) / zoom); 
    return {x,y,px:x * 100 / this.width,py:y * 100 / this.height};
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
      ></canvas>
    );
  }
}
Canvas.defaultProps = {
  zoom:1,unit:'px',axisPosition:{x:'50%',y:'50%'},
  screenPosition:[0,0],items:[],rotateSetting:{direction:'clock'}
}