import React, { Component,createRef } from 'react';
import $ from 'jquery';
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.dom = createRef(); this.width = 0; this.height = 0;
    this.isMobile = 'ontouchstart' in document.documentElement?true:false;
  }
  getStyle(style = {}){return style;}
  getCoordsByUnit(point,unit){return this.props.unit === '%' || unit === '%'?{x:point.x * this.width /100,y:point.y * this.height / 100}:point;}
  draw(items = this.props.items){
    for(var i = 0; i < items.length; i++){
      var item = items[i];
      if(item.show === false){continue;}
      if(item.type === 'group'){this.draw(item.items);}
      else {this['draw'+item.type](item);}
    }
  }
  drawline(line) {
    var ctx = this.ctx,{zoom} = this.props,p;
    var {w = 1,fill,stroke,lineJoin = 'miter',lineCap = 'butt',dash,points,close,rotate,pivot} = line;
    var length = line.points.length;
    if(length < 2){return false;}
    var start = line.points[0];
    ctx.save();
    ctx.beginPath();
    if(rotate !== undefined && pivot){this.rotate(rotate,pivot || this.getSides(points).center);}
    if(dash){ctx.setLineDash(dash);}
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    ctx.lineWidth = w * zoom;
    p = this.getCoordsByUnit(start);
    ctx.moveTo(p.x * zoom, p.y * zoom); 
    for(var i = 1; i < length; i++){
        var p = this.getCoordsByUnit(points[i]);
        ctx.lineTo(p.x * zoom, p.y * zoom);
    }
    if(length > 2 && close){
      ctx.lineTo(start.x * zoom, start.y * zoom);
    }
    this.ink(fill,stroke);
    ctx.closePath();
    ctx.restore();
  }
  drawarc(obj) {
    var {
      lineWidth = 1,slice=[0,360],r = 20,fill,stroke,lineCap,lineJoin = 'butt',
      x = 0,y = 0,clockwise,shadow,rotate,pivot,unit
    } = obj;
    var {direction='clock',offset = 0} = this.props.rotateSetting;
    var {zoom} = this.props;
    var ctx = this.ctx;
    var p = this.getCoordsByUnit({x,y},unit);
    p = this.getCoordsByPivot({p,r,pivot,type:'arc',lineWidth});
    ctx.save();
    ctx.beginPath();
    if(rotate !== undefined){this.rotate(rotate,{x,y});}
    if(direction === 'clock'){
      ctx.arc(p.x * zoom,p.y * zoom,r * zoom,slice[0] * Math.PI / 180,slice[1] * Math.PI / 180);
    }
    else if(direction === 'clockwise'){
      ctx.arc(p.x * zoom, p.y * zoom, r * zoom, -slice[1] * Math.PI / 180, -slice[0] * Math.PI / 180);
    }
    this.shadow(shadow);
    ctx.lineCap = lineCap;
    ctx.lineJoin = lineJoin;
    ctx.lineWidth = lineWidth;
    this.ink(fill,stroke);
    ctx.closePath();
    ctx.restore();
  }
  drawrectangle(obj) { 
    var {width = 20,height = 20,x = 0,y = 0,lineWidth = 1,fill,stroke,rotate,pivot='center',unit} = obj; 
    var {zoom,rotateSetting} = this.props,ctx = this.ctx;
    var p = this.getCoordsByUnit({x,y},unit);
    var limit = this.getCoordsByUnit({x:width,y:height});
    p = this.getCoordsByPivot({p,width:limit.x,height:limit.y,pivot,type:'rectangle',lineWidth});
    ctx.save();
    ctx.beginPath();
    if(rotate !== undefined){this.rotate(rotate,{x,y});}
    ctx.rect(p.x * zoom, p.y * zoom, limit.x * zoom, limit.y * zoom);
    ctx.lineWidth = lineWidth;
    if (fill) {ctx.fillStyle = fill; ctx.fill();}
    if(stroke) {ctx.strokeStyle = stroke; ctx.stroke();}
    ctx.closePath();
    ctx.restore();
  }
  getCoordsByPivot({p,width,height,r,pivot,type,lineWidth}){
    if(!pivot){return p;}
    var f = {
      custom:function(){return {x:p.x - pivot.x,y:p.y - pivot.y}}, 
      rectangle:{
        center:function(){return {x:p.x - width / 2,y:p.y - height / 2};},
        right:function(){return {x:p.x - width - lineWidth / 2,y:p.y - height / 2};},
        left:function(){return {x:p.x + lineWidth / 2,y:p.y - height / 2};},
        up:function(){return {x:p.x - width / 2,y:p.y + lineWidth / 2};},
        down:function(){return {x:p.x - width / 2,y:p.y - height - lineWidth / 2};},
        upright:function(){return {x:p.x - width - lineWidth / 2,y:p.y + lineWidth / 2};},
        upleft:function(){return {x:p.x + lineWidth / 2,y:p.y + lineWidth / 2};},
        downright:function(){return {x:p.x - width - lineWidth / 2,y:p.y - height - lineWidth / 2};},
        downleft:function(){return {x:p.x / 2 + lineWidth / 2,y:p.y - height - lineWidth / 2};},
      },
      arc:{
        center:function(){return p;},
        right:function(){return {x:p.x - r - lineWidth / 2,y:p.y};},
        left:function(){return {x:p.x + r + lineWidth / 2,y:p.y};},
        up:function(){return {x:p.x,y:p.y + r + lineWidth / 2};},
        down:function(){return {x:p.x,y:p.y - r - lineWidth / 2};},
        upright:function(){return {x:p.x - r - lineWidth / 2,y:p.y + r + lineWidth / 2};},
        upleft:function(){return {x:p.x + r + lineWidth / 2,y:p.y + r + lineWidth / 2};},
        downright:function(){return {x:p.x - r - lineWidth / 2,y:p.y - r - lineWidth / 2};},
        downleft:function(){return {x:p.x + r + lineWidth / 2,y:p.y - r - lineWidth / 2};},
      }
    }
    return typeof pivot === 'string'?f[type][pivot]():f.custom();
  }
  drawtext(obj) {//x,y,text,angle,textBaseLine,color,textAlign
    var {zoom} = this.props;
    var ctx = this.ctx;
    var {textBaseLine = 'bottom',textAlign='center',fontSize=12,color='#000',text,rotate,unit,pivot,lineWidth = 1,x,y,angle} = obj;
    var p = this.getCoordsByUnit({x,y},unit);
    p = this.getCoordsByPivot({p,pivot,type:'rectangle',lineWidth});
    ctx.save();
    ctx.beginPath();
    if(rotate !== undefined){this.rotate(rotate,{x,y});}
    if(angle !== undefined){this.rotate(angle,p);}
    ctx.textBaseline = textBaseLine;
    ctx.font = (fontSize * zoom) + "px arial";
    ctx.textAlign = textAlign;
    ctx.fillStyle = color;
    ctx.fillText(text, p.x * zoom, p.y * zoom);
    ctx.closePath();
    ctx.restore();
  }
  ink(fill,stroke){
    if(!fill && !stroke){stroke = '#000';}
    if (fill) {this.ctx.fillStyle = this.getColor(fill); this.ctx.fill();}
    if(stroke){this.ctx.strokeStyle = this.getColor(stroke); this.ctx.stroke();}
  }
  shadow(Shadow){
    var {shadow} = this.props;
    if(Shadow){
      var [shadowOffsetX,shadowOffsetY,shadowBlur,shadowColor] = Shadow;
      this.ctx.shadowOffsetX = Shadow[0];
      this.ctx.shadowOffsetY = Shadow[1];
      this.ctx.shadowBlur = Shadow[2];
      this.ctx.shadowColor = Shadow[3];  
    }
    else if(shadow){
      var [shadowOffsetX,shadowOffsetY,shadowBlur,shadowColor] = shadow;
      this.ctx.shadowOffsetX = shadow[0];
      this.ctx.shadowOffsetY = shadow[1];
      this.ctx.shadowBlur = shadow[2];
      this.ctx.shadowColor = shadow[3];
    }
  }
  getColor(color){
    if(typeof color === 'string'){return color;}
    return this.gradient(color);
  }
  gradient(grd){
    var [sx,sy,ex,ey,stops] = grd;
    var g = this.ctx.createLinearGradient(sx, sy, ex, ey); 
    for(var i = 0; i < stops.length; i++){
      var s = stops[i];
      g.addColorStop(s[0],s[1]);
    }
    return g;
  }
  rotate(angle,center){
    var {direction = 'clock',offset = 0} = this.props.rotateSetting;
    angle+=offset;
    angle = angle * Math.PI / 180 * (direction === 'clockwise'?-1:1);
    var s = Math.sin(angle),c = Math.cos(angle);
    var p = {x:center.x,y:-center.y};
    this.ctx.rotate(angle);
    this.ctx.translate((p.x * c - p.y * s) - p.x,p.y - (p.x * s + p.y * c));
  }
  
  getAxisPosition(type){
    if(type === 'center'){return {x:this.width/2,y:this.height/2};}
    else if(type === 'downleft'){return {x:0,y:this.height};}
    else if(type === 'downright'){return {x:this.width,y:this.height};}
    else if(type === 'upleft'){return {x:0,y:0};}
    else if(type === 'upright'){return {x:this.width,y:0};}
  }
  setScreen(){
    var {zoom,screenPosition,axisPosition} = this.props;
    var canvas = this.dom.current;
    this.axisPosition = this.getAxisPosition(axisPosition);
    this.translate = { 
      x: (this.axisPosition.x) - (screenPosition.x * zoom), 
      y: (this.axisPosition.y) - (screenPosition.y * zoom * -1) 
    }
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.translate(this.translate.x, this.translate.y);
    $(canvas).css({
      backgroundPosition: this.translate.x + "px " + this.translate.y + "px",  
    });
  }
  componentWillReceiveProps(){this.update();}
  getBackground(){
    var {snap,zoom,unit} = this.props; 
    var a = 100 * zoom;
    var b = unit === '%' ? `calc(${snap.x} * ${zoom})` : (snap.x * zoom) + 'px';
    var c = unit === '%' ? `calc(${snap.y} * ${zoom})` : (snap.y * zoom) + 'px';
    return {
      backgroundImage:`linear-gradient(rgba(${snap.color},0.5) 0px,transparent 0px),linear-gradient(90deg, rgba(${snap.color},0.5) 0px, transparent 0px),linear-gradient(rgba(${snap.color},0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(${snap.color},0.3) 1px, transparent 1px)`,
      backgroundSize : `${a}px ${a}px,${a}px ${a}px,${b} ${c},${b} ${c}`
    }
  }
  update(){
    var {getSize,snap} = this.props;
    var dom = this.dom.current;
    this.width = $(dom).width();
    this.height = $(dom).height();
    if(getSize){getSize(this.width,this.height);}
    dom.width = this.width;
    dom.height = this.height;
    if(snap){$(dom).css(this.getBackground());}
    this.clear();
    this.setScreen();
    if(snap){this.drawAxes();}
    this.draw();
  }
  clear() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }
  drawAxes(){
    this.drawline({points:[{ x: 0, y: -4002 },{ x: 0, y: 4000 }],dash:[3,3] });
    this.drawline({points:[{ x: -4002, y: 0 },{ x: 4000, y: 0 }],dash:[3,3] });
  }
  componentDidMount(){
    this.ctx = this.ctx || this.dom.current.getContext("2d");
    this.update();        
  }
  componentDidUpdate(){
    this.update();
  }
  mouseDown(e){
    this.mousePosition = this.getMousePosition(e);
    var {mouseDown,pan,getMousePosition} = this.props;
    if(getMousePosition){getMousePosition(this.mousePosition);}
    if(mouseDown){mouseDown(e);} 
    if(pan){this.panmousedown(e);}
  }
  mouseMove(e){
    this.mousePosition = this.getMousePosition(e);
    if(this.props.getMousePosition){this.props.getMousePosition(this.mousePosition);}
  }
  getClient(e) {
    return { 
      x: e.clientX === undefined?e.changedTouches[0].clientX:e.clientX, 
      y: e.clientY===undefined?e.changedTouches[0].clientY:e.clientY 
    };
  }
  getMousePosition(e) { 
    var {unit,screenPosition:sp,zoom} = this.props;
    var client = this.getClient(e);
    var offset = $(this.dom.current).offset();
    client = {x:client.x - offset.left + window.pageXOffset,y:client.y - offset.top + window.pageYOffset}
    var coords = { 
      x: Math.floor((client.x - (this.axisPosition.x) + (sp.x * zoom)) / zoom), 
      y: Math.floor((client.y - (this.axisPosition.y) + (sp.y * zoom * -1)) / zoom) 
    };
    if(unit === '%'){
      return {
        x:coords.x * 100 / this.width,
        y:coords.y * 100 / this.height,
      }
    }
    else {
      return coords;
    }
  }
  panmousedown(e){
    this.eventHandler("window", "mousemove", $.proxy(this.panmousemove,this));
    this.eventHandler("window", "mouseup", $.proxy(this.panmouseup,this));
    this.panned = false;
    var {screenPosition} = this.props;
    var client = this.getClient(e);
    this.startOffset = { 
        x: client.x, y: client.y, 
        endX: screenPosition.x, endY: screenPosition.y 
    };
  }
  panmouseup() {
    this.eventRemover("window", "mousemove", this.panmousemove);
    this.eventRemover("window", "mouseup", this.panmouseup);
  }
  panmousemove(e) {
      var so = this.startOffset, {zoom,onpan} = this.props, coords = this.getClient(e);
      //if(!this.panned && this.getLength({x:so.x,y:so.y},coords) < 5){return;}
      this.panned = true;
      var x = (so.x - coords.x) / zoom + so.endX, 
          y = (coords.y - so.y) / zoom + so.endY;
      if(onpan){onpan({x,y});}
  }
  getEvent(event){var isMobile = 'ontouchstart' in document.documentElement?true:false;var mobileEvents = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" };return isMobile ? mobileEvents[event] : event;}
  eventHandler(selector, event, action) {
      var element = typeof selector === "string" ? (selector === "window" ? $(window) : $(selector)) : selector;
      event = this.getEvent(event);
      element.unbind(event, action).bind(event, action);
  }
  eventRemover(selector, event, action) {
    var element = typeof selector === "string" ? (selector === "window" ? $(window) : $(selector)) : selector;
    event = this.getEvent(event);
    element.unbind(event, action);
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
  render() {
    var {id,style} = this.props;
    return (
      <canvas 
        ref={this.dom} 
        id={id} 
        style={this.getStyle(style)} 
        onMouseDown={this.mouseDown.bind(this)}
        onMouseMove={this.mouseMove.bind(this)}
      ></canvas>
    );
  }
}
Canvas.defaultProps = {
  zoom:1,unit:'px',axisPosition:'center',pan:false,
  screenPosition:{x:0,y:0},items:[],rotateSetting:{direction:'clock',offset:0}
}

